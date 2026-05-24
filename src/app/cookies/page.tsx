import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies del sitio web de Zecamo Studios.",
  robots: { index: true, follow: false },
};

export default function CookiesPage() {
  const content = readFileSync(join(process.cwd(), "legal/cookies-policy.md"), "utf-8");
  return (
    <LegalPage
      eyebrow="Cookies"
      content={content}
      backLinks={[
        { href: "/privacy", label: "Privacidad" },
        { href: "/terms", label: "Términos" },
      ]}
    />
  );
}
