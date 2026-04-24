import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import { MetaPixel, MetaPixelNoscript } from "@/components/meta-pixel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aktienpost.ch"),
  title: "aktienpost.ch — Börsensignale für Schweizer Privatanleger",
  description:
    "Börsensignale aus der Schweiz. Wissenschaftlich getestete Anlagestrategien für Privatanleger: 4 Strategien, 5 Min. Aufwand pro Signal, 30 Tage Geld-zurück-Garantie. Ab CHF 49 im Monat.",
  keywords: [
    "Börsensignale",
    "Schweiz",
    "SPI",
    "Anlagestrategie",
    "Privatanleger",
    "Swiss Trading",
    "Bollinger",
    "Aktien",
  ],
  authors: [{ name: "aktienpost.ch" }],
  openGraph: {
    title: "aktienpost.ch — Börsensignale für Schweizer Privatanleger",
    description:
      "4 wissenschaftlich getestete Börsenstrategien. Nur 5 Minuten Aufwand pro Signal. 30 Tage Geld-zurück-Garantie. Ab CHF 49 im Monat.",
    url: "https://aktienpost.ch",
    siteName: "aktienpost.ch",
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "aktienpost.ch — Börsensignale für Schweizer Privatanleger",
    description:
      "4 wissenschaftlich getestete Strategien. Ab CHF 49 im Monat. 30 Tage Geld-zurück-Garantie.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className={`${inter.variable} ${serif.variable}`}>
      <head>
        <MetaPixel />
      </head>
      <body>
        <MetaPixelNoscript />
        {children}
      </body>
    </html>
  );
}
