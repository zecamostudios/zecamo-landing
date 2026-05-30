import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import CursorBlob from "@/components/ui/CursorBlob";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zecamo Studios — Automatizá lo que te frena. Escalá lo que te impulsa.",
    template: "%s | Zecamo Studios",
  },
  description:
    "Construimos la capa de IA de tu empresa. Desde el diagnóstico hasta los agentes que trabajan mientras dormís. Automatización, vibe coding, agentes IA y consultoría B2B. Tucumán, Argentina.",
  metadataBase: new URL("https://zecamostudios.com"),
  keywords: [
    "agencia IA argentina",
    "automatización con IA",
    "vibe coding",
    "agentes IA",
    "desarrollo web Tucumán",
    "Next.js",
    "Supabase",
    "web que vende",
    "backoffice",
    "Zecamo Studios",
  ],
  authors: [{ name: "Zecamo Studios", url: "https://zecamostudios.com" }],
  creator: "Zecamo Studios",
  publisher: "Zecamo Studios",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://zecamostudios.com" },
  openGraph: {
    title: "Zecamo Studios — Automatizá lo que te frena. Escalá lo que te impulsa.",
    description: "Construimos la capa de IA de tu empresa. Automatización, agentes IA, vibe coding. Tucumán, Argentina.",
    url: "https://zecamostudios.com",
    siteName: "Zecamo Studios",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zecamo Studios" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zecamo Studios — Automatizá lo que te frena. Escalá lo que te impulsa.",
    description: "Construimos la capa de IA de tu empresa. Automatización, agentes IA, vibe coding.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/brand/logo-z.png", type: "image/png", sizes: "any" }],
    apple: { url: "/brand/logo-z.png", sizes: "180x180", type: "image/png" },
    shortcut: "/brand/logo-z.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-bg text-ink font-body antialiased">
        <CursorBlob />
        {children}
      </body>
    </html>
  );
}
