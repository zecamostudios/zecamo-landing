import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso de los servicios de Zecamo Studios.",
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  const content = readFileSync(join(process.cwd(), "legal/terms-of-service.md"), "utf-8");
  return (
    <LegalPage
      eyebrow="Términos"
      content={content}
      backLinks={[
        { href: "/privacy", label: "Privacidad" },
        { href: "/cookies", label: "Cookies" },
      ]}
    />
  );
}
