import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { hasValidAdminOrigin, isAdminAuthenticated } from "@/lib/admin-auth";
import { getContentStorage } from "@/lib/content-store";
import { BodyTooLargeError, readLimitedBody } from "@/lib/request-body";

export const runtime = "nodejs";
const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 20_000_000;
const MAX_IMAGE_DIMENSION = 8192;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const imageFormats = new Map([
  ["jpeg", { extension: "jpg", contentType: "image/jpeg" }],
  ["png", { extension: "png", contentType: "image/png" }],
  ["webp", { extension: "webp", contentType: "image/webp" }],
  ["heif", { extension: "avif", contentType: "image/avif" }]
]);

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

  let formData: FormData;
  try {
    const body = await readLimitedBody(request, MAX_IMAGE_SIZE + 100_000);
    formData = await new Response(new Uint8Array(body), {
      headers: { "Content-Type": request.headers.get("content-type") || "" }
    }).formData();
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return response({ message: "Imaginea trebuie să aibă maximum 3 MB." }, { status: 413 });
    }
    return response({ message: "Fișierul trimis este invalid." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size <= 0 || file.size > MAX_IMAGE_SIZE) {
    return response({ message: "Alege o imagine JPG, PNG, WebP sau AVIF de maximum 3 MB." }, { status: 400 });
  }

  let imageBytes: Buffer;
  let verifiedFormat: { extension: string; contentType: string };
  try {
    const input = Buffer.from(await file.arrayBuffer());
    const image = sharp(input, { limitInputPixels: MAX_IMAGE_PIXELS, failOn: "warning" });
    const metadata = await image.metadata();
    const format = imageFormats.get(metadata.format || "");
    if (!format || format.contentType !== file.type || (metadata.format === "heif" && metadata.compression !== "av1")) {
      return response({ message: "Formatul real al imaginii nu corespunde fișierului declarat." }, { status: 400 });
    }
    if (!metadata.width || !metadata.height || metadata.width > MAX_IMAGE_DIMENSION || metadata.height > MAX_IMAGE_DIMENSION
      || metadata.width * metadata.height > MAX_IMAGE_PIXELS || (metadata.pages || 1) !== 1) {
      return response({ message: "Alege o imagine statică de maximum 20 megapixeli și 8192 pixeli pe latură." }, { status: 400 });
    }
    // Re-encoding verifies the pixels and removes metadata and non-image payloads.
    imageBytes = await image.rotate().toBuffer();
    verifiedFormat = format;
  } catch {
    return response({ message: "Imaginea este invalidă sau depășește limita de pixeli." }, { status: 400 });
  }
  if (imageBytes.byteLength > MAX_IMAGE_SIZE) {
    return response({ message: "Imaginea procesată trebuie să aibă maximum 3 MB." }, { status: 413 });
  }

  const baseName = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "imagine";
  try {
    const blob = await put(`cms/media/${baseName}.${verifiedFormat.extension}`, imageBytes, {
      access: "public",
      addRandomSuffix: true,
      cacheControlMaxAge: 31_536_000,
      contentType: verifiedFormat.contentType
    });
    return response({ url: blob.url });
  } catch {
    return response({ message: "Imaginea nu a putut fi încărcată momentan." }, { status: 502 });
  }
}
