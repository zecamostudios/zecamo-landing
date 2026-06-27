import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CursorBlob from "@/components/ui/CursorBlob";

// Fuente de títulos: Space Grotesk (reemplaza a Syne, cuya 'g' se leía cortada).
// Se mantiene la variable --font-syne para no tocar globals.css.
const syne = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Zecamo Studios — Automatizá lo que te frena. Escalá lo que te impulsa.",
    template: "%s | Zecamo Studios",
  },
  description:
    "Webs, sistemas y automatizaciones que le sacan trabajo a tu equipo y te traen más clientes. Le sacamos el trabajo repetitivo a tu negocio para que crezcas. Tucumán, Argentina.",
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
    description: "Webs, sistemas y automatizaciones que le sacan trabajo a tu equipo y te traen más clientes. Tucumán, Argentina.",
    url: "https://zecamostudios.com",
    siteName: "Zecamo Studios",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zecamo Studios" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zecamo Studios — Automatizá lo que te frena. Escalá lo que te impulsa.",
    description: "Webs, sistemas y automatizaciones que le sacan trabajo a tu equipo y te traen más clientes.",
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
