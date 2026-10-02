import "server-only";

export class BodyTooLargeError extends Error {
  constructor() {
    super("Request body exceeds the byte limit.");
    this.name = "BodyTooLargeError";
  }
}

export async function readLimitedBody(request: Request, maximumBytes: number): Promise<Buffer> {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  const reader = request.body?.getReader();
  if (!reader) {
    if (declaredLength > maximumBytes) throw new BodyTooLargeError();
    return Buffer.alloc(0);
  }

  const chunks: Buffer[] = [];
  let byteLength = 0;
  try {
    if (declaredLength > maximumBytes) throw new BodyTooLargeError();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > maximumBytes) throw new BodyTooLargeError();
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks, byteLength);
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  } finally {
    reader.releaseLock();
  }
}
