import { z } from "zod";
import type { FundingProgram } from "@/lib/funding-programs";

export const announcementStatuses = ["Publicat", "Ciornă", "Arhivat"] as const;
export type AnnouncementStatus = (typeof announcementStatuses)[number];

export type Announcement = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  status: AnnouncementStatus;
  publishedAt: string;
  updatedAt: string;
  sourceUrl: string;
  ctaLabel: string;
  ctaUrl: string;
  pinned: boolean;
};

export type ManagedContent = {
  version: 1;
  updatedAt: string;
  fundingPrograms: FundingProgram[];
  announcements: Announcement[];
};

const requiredText = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) => z.string().trim().max(max);
const slugSchema = z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Folosește doar litere mici, cifre și cratimă.");
const linkSchema = z.string().trim().max(600).refine(
  (value) => value === "" || value.startsWith("/") || /^https:\/\//i.test(value),
  "Folosește o cale internă sau un URL HTTPS."
);
const imageSchema = z.string().trim().min(1).max(700).refine(
  (value) => value.startsWith("/") || /^https:\/\//i.test(value),
  "Folosește o imagine locală sau un URL HTTPS."
);

export const fundingProgramSchema = z.object({
  id: slugSchema,
  code: requiredText(160),
  title: requiredText(180),
  program: requiredText(120),
  status: z.enum(["Deschis", "În pregătire", "Închis"]),
  audience: requiredText(350),
  summary: requiredText(600),
  value: requiredText(180),
  cofinancing: requiredText(180),
  region: requiredText(180),
  image: imageSchema,
  imageAlt: requiredText(220),
  sourceUrl: z.string().trim().url().max(600).refine((value) => value.startsWith("https://"), "Sursa trebuie să folosească HTTPS."),
  lastVerified: requiredText(120)
});

export const announcementSchema = z.object({
  id: slugSchema,
  slug: slugSchema,
  title: requiredText(180),
  excerpt: requiredText(420),
  body: requiredText(10_000),
  category: requiredText(80),
  status: z.enum(announcementStatuses),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  sourceUrl: linkSchema,
  ctaLabel: optionalText(80),
  ctaUrl: linkSchema,
  pinned: z.boolean()
}).superRefine((announcement, context) => {
  if (announcement.ctaLabel && !announcement.ctaUrl) {
    context.addIssue({ code: "custom", path: ["ctaUrl"], message: "Completează destinația butonului." });
  }
});

export const managedContentSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string().datetime(),
  fundingPrograms: z.array(fundingProgramSchema).max(100),
  announcements: z.array(announcementSchema).max(250)
}).superRefine((content, context) => {
  const ensureUnique = (values: string[], path: "fundingPrograms" | "announcements", field: string) => {
    const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
    if (duplicates.length) {
      context.addIssue({ code: "custom", path: [path], message: `${field} trebuie să fie unic.` });
    }
  };

  ensureUnique(content.fundingPrograms.map((program) => program.id), "fundingPrograms", "ID-ul programului");
  ensureUnique(content.announcements.map((announcement) => announcement.id), "announcements", "ID-ul anunțului");
  ensureUnique(content.announcements.map((announcement) => announcement.slug), "announcements", "Adresa anunțului");
});

export function createDefaultManagedContent(fundingPrograms: readonly FundingProgram[] = []): ManagedContent {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    fundingPrograms: fundingPrograms.map((program) => ({ ...program })),
    announcements: []
  };
}

export function publishedAnnouncements(content: ManagedContent, now = new Date()) {
  const nowTime = now.getTime();
  return content.announcements
    .filter((announcement) => announcement.status === "Publicat" && new Date(announcement.publishedAt).getTime() <= nowTime)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function slugifyContent(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100) || "element-nou";
}
