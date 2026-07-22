import { z } from "zod";

const fundingServices = new Set(["consultanta", "fonduri-europene"]);
const administrativeServices = new Set([
  "servicii-administrative",
  "documente",
  "secretariat",
  "administrativ",
  "infiintare-firma",
  "infiintare-pfa",
  "infiintare-srl"
]);

export type ContactCategory = "fonduri-europene" | "servicii-administrative" | "general";

export function contactCategoryForService(service: string): ContactCategory {
  if (fundingServices.has(service)) return "fonduri-europene";
  if (administrativeServices.has(service)) return "servicii-administrative";
  return "general";
}

const cleanText = (maximum: number) =>
  z
    .string()
    .trim()
    .min(2, "Câmpul este obligatoriu.")
    .max(maximum, `Folosește maximum ${maximum} de caractere.`)
    .transform((value) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ""));

export const contactSchema = z.object({
  name: cleanText(100),
  email: z.string().trim().email("Introdu o adresă de email validă.").max(160),
  phone: z
    .string()
    .trim()
    .max(24, "Folosește maximum 24 de caractere.")
    .refine((value) => value === "" || /^[+0-9()\s.-]{7,24}$/.test(value), "Introdu un număr de telefon valid."),
  organization: z.string().trim().max(160, "Folosește maximum 160 de caractere.").optional().default(""),
  taxId: z
    .string()
    .trim()
    .max(32, "Folosește maximum 32 de caractere.")
    .refine((value) => value === "" || /^(RO)?[0-9]{2,10}$/i.test(value.replace(/\s/g, "")), "Introdu un CUI valid sau lasă câmpul liber.")
    .optional()
    .default(""),
  category: z.enum(["fonduri-europene", "servicii-administrative", "general"]).optional(),
  service: z.enum([
    "nesigur",
    "servicii-administrative",
    "documente",
    "secretariat",
    "administrativ",
    "consultanta",
    "infiintare-firma",
    "infiintare-pfa",
    "infiintare-srl",
    "fonduri-europene"
  ]),
  fundingProgram: z.string().trim().max(180).optional().default(""),
  message: cleanText(2000).refine((value) => value.length >= 20, "Mesajul trebuie să aibă minimum 20 de caractere."),
  consent: z.boolean().refine((value) => value, "Confirmarea este obligatorie."),
  // Honeypot values must reach the API so bots receive a neutral success response.
  website: z.string().trim().max(200).optional().default("")
}).superRefine((data, context) => {
  if (data.category && contactCategoryForService(data.service) !== data.category) {
    context.addIssue({
      code: "custom",
      path: ["service"],
      message: "Alege un serviciu din categoria selectată."
    });
  }
}).transform((data) => ({
  ...data,
  category: data.category ?? contactCategoryForService(data.service)
}));

export type ContactInput = z.input<typeof contactSchema>;
export type ContactSubmission = z.output<typeof contactSchema>;
