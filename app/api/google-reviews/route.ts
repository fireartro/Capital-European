import { NextResponse } from "next/server";
import { getGoogleBusinessReviews } from "@/lib/google-business-reviews";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET() {
  const data = await getGoogleBusinessReviews({ cache: "no-store" });

  return NextResponse.json(
    { data },
    {
      status: data ? 200 : 503,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400"
      }
    }
  );
}
