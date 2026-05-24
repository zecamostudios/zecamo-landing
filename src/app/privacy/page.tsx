import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y tratamiento de datos personales de Zecamo Studios, conforme Ley 25.326 y GDPR.",
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  const content = readFileSync(join(process.cwd(), "legal/privacy-policy.md"), "utf-8");
  return (
    <LegalPage
      eyebrow="Privacidad"
      content={content}
      backLinks={[
        { href: "/terms", label: "Términos" },
        { href: "/cookies", label: "Cookies" },
      ]}
    />
  );
}
