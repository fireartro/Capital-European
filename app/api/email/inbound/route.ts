import { NextResponse, type NextRequest } from "next/server";
import { Resend, type Attachment } from "resend";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_WEBHOOK_BODY_BYTES = 128_000;
const MAX_FORWARDED_TEXT_BYTES = 256_000;
const MAX_ATTACHMENT_COUNT = 8;
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;

function byteLength(value: string | null | undefined) {
  return Buffer.byteLength(value || "", "utf8");
}

function isAttachmentSizeAllowed(value: number) {
  return Number.isFinite(value) && value >= 0 && value <= MAX_ATTACHMENT_BYTES;
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

function normalizeAddress(value: string) {
  const match = value.toLowerCase().match(/<([^>]+)>/);
  return (match?.[1] || value).trim();
}

function configuredAddresses(value: string | undefined, fallback: string) {
  return new Set(
    (value || fallback)
      .split(",")
      .map(normalizeAddress)
      .filter(Boolean)
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  const forwardTo = (process.env.INBOUND_FORWARD_TO || process.env.CONTACT_TO_EMAIL || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const forwardFrom = process.env.INBOUND_FORWARD_FROM?.trim() || `Mesaj primit <${siteConfig.email}>`;
  const allowedRecipients = configuredAddresses(process.env.INBOUND_ALLOWED_RECIPIENTS, siteConfig.email);

  if (!apiKey || !webhookSecret || forwardTo.length === 0) {
    return jsonResponse({ message: "Serviciul de primire nu este configurat." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_WEBHOOK_BODY_BYTES) {
    return jsonResponse({ message: "Payload prea mare." }, { status: 413 });
  }

  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signature = request.headers.get("svix-signature");
  if (!id || !timestamp || !signature) {
    return jsonResponse({ message: "Semnătură absentă." }, { status: 400 });
  }

  const payload = await request.text();
  if (new TextEncoder().encode(payload).byteLength > MAX_WEBHOOK_BODY_BYTES) {
    return jsonResponse({ message: "Payload prea mare." }, { status: 413 });
  }

  const resend = new Resend(apiKey);

  try {
    const event = resend.webhooks.verify({
      payload,
      headers: { id, timestamp, signature },
      webhookSecret
    });

    if (event.type !== "email.received") {
      return jsonResponse({ received: true });
    }

    const isAllowedRecipient = event.data.to
      .map(normalizeAddress)
      .some((address) => allowedRecipients.has(address));
    if (!isAllowedRecipient) {
      return jsonResponse({ received: true, forwarded: false }, { status: 202 });
    }

    const { data: email, error: emailError } = await resend.emails.receiving.get(
      event.data.email_id,
      { html_format: "cid" }
    );
    if (emailError || !email) {
      return jsonResponse({ message: "Mesajul primit nu a putut fi preluat." }, { status: 502 });
    }

    if (
      byteLength(email.html) > MAX_FORWARDED_TEXT_BYTES
      || byteLength(email.text) > MAX_FORWARDED_TEXT_BYTES
      || email.attachments.length > MAX_ATTACHMENT_COUNT
    ) {
      return jsonResponse({ message: "Mesajul depășește limita de redirecționare." }, { status: 413 });
    }

    const attachments: Attachment[] = [];
    let totalAttachmentBytes = 0;
    for (const attachment of email.attachments) {
      if (!isAttachmentSizeAllowed(attachment.size)) {
        return jsonResponse({ message: "Un atașament depășește limita permisă." }, { status: 413 });
      }

      totalAttachmentBytes += attachment.size;
      if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return jsonResponse({ message: "Atașamentele depășesc limita totală permisă." }, { status: 413 });
      }

      const { data, error } = await resend.emails.receiving.attachments.get({
        emailId: email.id,
        id: attachment.id
      });
      if (error || !data) {
        return jsonResponse({ message: "Un atașament nu a putut fi preluat." }, { status: 502 });
      }
      if (!isAttachmentSizeAllowed(data.size) || data.size > attachment.size) {
        return jsonResponse({ message: "Un atașament depășește limita permisă." }, { status: 413 });
      }
      attachments.push({
        filename: data.filename || attachment.filename || "atasament",
        path: data.download_url,
        contentType: data.content_type,
        contentId: data.content_id || undefined
      });
    }

    const replyTo = email.reply_to?.length ? email.reply_to : email.from;
    const recipientLabel = email.to.join(", ");
    const originalFrom = escapeHtml(email.from);
    const originalTo = escapeHtml(recipientLabel);
    const subject = email.subject || "Mesaj fără subiect";
    const htmlIntro = [
      '<div style="border:1px solid #dbe5f4;border-radius:8px;padding:14px 16px;margin:0 0 18px;color:#10213a;font:14px/1.55 Arial,sans-serif;background:#f6f8fc">',
      '<strong style="display:block;margin-bottom:6px">Mesaj primit prin contact@capitaleuropean.ro</strong>',
      `<span style="display:block"><strong>De la:</strong> ${originalFrom}</span>`,
      `<span style="display:block"><strong>Către:</strong> ${originalTo}</span>`,
      '<span style="display:block;margin-top:6px;color:#52677c">Folosește Răspunde pentru a trimite direct expeditorului.</span>',
      "</div>"
    ].join("");
    const textIntro = `Mesaj primit prin contact@capitaleuropean.ro\nDe la: ${email.from}\nCătre: ${recipientLabel}\nRăspunde direct acestui mesaj pentru a contacta expeditorul.\n\n`;
    const originalHtml =
      email.html ||
      (email.text
        ? `<div style="white-space:pre-wrap;color:#10213a;font:14px/1.6 Arial,sans-serif">${escapeHtml(email.text)}</div>`
        : "");

    const { data: forwarded, error: forwardError } = await resend.emails.send(
      {
        from: forwardFrom,
        to: forwardTo,
        replyTo,
        subject,
        html: `${htmlIntro}${originalHtml}`,
        text: `${textIntro}${email.text || ""}`,
        attachments,
        headers: {
          "X-Capital-European-Inbound-Id": email.id
        }
      },
      { idempotencyKey: `inbound-forward/${email.id}` }
    );

    if (forwardError || !forwarded) {
      return jsonResponse({ message: "Mesajul nu a putut fi redirecționat." }, { status: 502 });
    }

    return jsonResponse({ received: true, forwarded: true, id: forwarded.id });
  } catch {
    return jsonResponse({ message: "Webhook invalid." }, { status: 400 });
  }
}
