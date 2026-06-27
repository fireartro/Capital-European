import { z } from "zod";

const fundingServices = new Set(["consultanta", "fonduri-europene"]);

export type ContactCategory = "fonduri-europene" | "servicii-administrative";

export function contactCategoryForService(service: string): ContactCategory {
  return fundingServices.has(service) ? "fonduri-europene" : "servicii-administrative";
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
    .regex(/^[+0-9()\s.-]{7,24}$/, "Introdu un număr de telefon valid."),
  category: z.enum(["fonduri-europene", "servicii-administrative"]).optional(),
  service: z.enum([
    "servicii-administrative",
    "documente",
    "secretariat",
    "administrativ",
    "consultanta",
    "infiintare-firma",
    "fonduri-europene"
  ]),
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
export type ContactData = z.output<typeof contactSchema>;
