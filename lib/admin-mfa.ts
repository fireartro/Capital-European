import "server-only";

const TWILIO_VERIFY_ENDPOINT = "https://verify.twilio.com/v2/Services";

function value(name: string) {
  return process.env[name]?.trim() || "";
}

function normalizePhone(phone: string) {
  const normalized = phone.replace(/[\s()-]/g, "");
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : "";
}

function configuration() {
  return {
    accountSid: value("TWILIO_ACCOUNT_SID"),
    authToken: value("TWILIO_AUTH_TOKEN"),
    serviceSid: value("TWILIO_VERIFY_SERVICE_SID"),
    phone: normalizePhone(value("ADMIN_MFA_PHONE"))
  };
}

function twilioAuthorization(accountSid: string, authToken: string) {
  return `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`;
}

export function isAdminMfaRequired() {
  return value("ADMIN_MFA_REQUIRED").toLowerCase() === "true";
}

export function isAdminMfaConfigured() {
  const config = configuration();
  return Boolean(config.accountSid && config.authToken && config.serviceSid && config.phone);
}

export function maskedAdminMfaPhone() {
  const phone = configuration().phone;
  if (!phone) return "numărul configurat";
  return `${phone.slice(0, 3)} ••• ••• ${phone.slice(-3)}`;
}

export async function sendAdminMfaCode() {
  const config = configuration();
  if (!isAdminMfaConfigured()) throw new Error("Verificarea SMS nu este configurată complet.");

  const response = await fetch(`${TWILIO_VERIFY_ENDPOINT}/${encodeURIComponent(config.serviceSid)}/Verifications`, {
    method: "POST",
    headers: {
      Authorization: twilioAuthorization(config.accountSid, config.authToken),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ To: config.phone, Channel: "sms" }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000)
  });

  if (!response.ok) {
    console.error("Admin MFA delivery failed", response.status);
    throw new Error("Codul SMS nu a putut fi trimis momentan.");
  }
}

export async function verifyAdminMfaCode(code: string) {
  const config = configuration();
  if (!isAdminMfaConfigured() || !/^\d{4,10}$/.test(code)) return false;

  const response = await fetch(`${TWILIO_VERIFY_ENDPOINT}/${encodeURIComponent(config.serviceSid)}/VerificationCheck`, {
    method: "POST",
    headers: {
      Authorization: twilioAuthorization(config.accountSid, config.authToken),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ To: config.phone, Code: code }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000)
  });
  if (!response.ok) return false;

  const result = await response.json().catch(() => ({})) as { status?: unknown };
  return result.status === "approved";
}
