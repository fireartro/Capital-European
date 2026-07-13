import { HomePage } from "@/components/home-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/",
  title: "Consultanță fonduri europene și servicii administrative",
  description: "Capital European oferă două direcții distincte: consultanță pentru fonduri europene și servicii administrative, inclusiv sprijin pentru înființare PFA sau SRL."
});

export default function Page() {
  return <HomePage />;
}
