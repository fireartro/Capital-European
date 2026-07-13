import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { hasValidAdminOrigin, isAdminAuthenticated } from "@/lib/admin-auth";
import { getManagedContentSnapshot, saveManagedContent } from "@/lib/content-store";

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
  return response(await getManagedContentSnapshot());
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return response({ message: "Autentificare necesară." }, { status: 401 });
  }
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_LENGTH) {
    return response({ message: "Conținutul trimis este prea mare." }, { status: 413 });
  }

  try {
    const body = await request.text();
    if (body.length > MAX_BODY_LENGTH) {
      return response({ message: "Conținutul trimis este prea mare." }, { status: 413 });
    }
    const content = await saveManagedContent(JSON.parse(body));
    ["/", "/fonduri-europene", "/contact", "/anunturi", "/sitemap.xml"].forEach((path) => revalidatePath(path));
    revalidatePath("/anunturi/[slug]", "page");
    return response({ content, message: "Modificările au fost publicate." });
  } catch (error) {
    if (error instanceof ZodError) {
      return response({ message: "Verifică valorile marcate.", issues: error.flatten() }, { status: 400 });
    }
    if (error instanceof SyntaxError) {
      return response({ message: "Format invalid." }, { status: 400 });
    }
    return response({ message: error instanceof Error ? error.message : "Modificările nu au putut fi salvate." }, { status: 500 });
  }
}
