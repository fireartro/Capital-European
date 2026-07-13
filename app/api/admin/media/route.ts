import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { hasValidAdminOrigin, isAdminAuthenticated } from "@/lib/admin-auth";
import { getContentStorage } from "@/lib/content-store";

export const runtime = "nodejs";
const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function response(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return response({ message: "Autentificare necesară." }, { status: 401 });
  }
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }
  if (!getContentStorage().mediaWritable) {
    return response({ message: "Încărcarea imaginilor necesită un Vercel Blob store conectat." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_IMAGE_SIZE + 100_000) {
    return response({ message: "Imaginea trebuie să aibă maximum 3 MB." }, { status: 413 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size <= 0 || file.size > MAX_IMAGE_SIZE) {
    return response({ message: "Alege o imagine JPG, PNG, WebP sau AVIF de maximum 3 MB." }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "webp";
  const baseName = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "imagine";
  const blob = await put(`cms/media/${baseName}.${extension}`, file, {
    access: "public",
    addRandomSuffix: true,
    cacheControlMaxAge: 31_536_000,
    contentType: file.type
  });

  return response({ url: blob.url });
}
