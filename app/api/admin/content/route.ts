import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { hasValidAdminOrigin, isAdminAuthenticated } from "@/lib/admin-auth";
import { ContentConflictError, getManagedContentSnapshot, saveManagedContent } from "@/lib/content-store";
import { BodyTooLargeError, readLimitedBody } from "@/lib/request-body";

export const runtime = "nodejs";
const MAX_BODY_LENGTH = 750_000;

function response(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return response({ message: "Autentificare necesară." }, { status: 401 });
  }
  try {
    return response(await getManagedContentSnapshot());
  } catch {
    return response({ message: "Conținutul CMS nu poate fi încărcat în siguranță. Datele existente au fost păstrate." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return response({ message: "Autentificare necesară." }, { status: 401 });
  }
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }

  try {
    const body = await readLimitedBody(request, MAX_BODY_LENGTH);
    const content = await saveManagedContent(JSON.parse(body.toString("utf8")));
    ["/", "/fonduri-europene", "/contact", "/anunturi", "/sitemap.xml"].forEach((path) => revalidatePath(path));
    revalidatePath("/anunturi/[slug]", "page");
    return response({ content, message: "Modificările au fost publicate." });
  } catch (error) {
    if (error instanceof ContentConflictError) {
      return response({ message: error.message }, { status: 409 });
    }
    if (error instanceof BodyTooLargeError) {
      return response({ message: "Conținutul trimis este prea mare." }, { status: 413 });
    }
    if (error instanceof ZodError) {
      return response({ message: "Verifică valorile marcate.", issues: error.flatten() }, { status: 400 });
    }
    if (error instanceof SyntaxError) {
      return response({ message: "Format invalid." }, { status: 400 });
    }
    return response({ message: "Modificările nu au putut fi salvate. Verifică disponibilitatea și integritatea stocării CMS." }, { status: 503 });
  }
}
