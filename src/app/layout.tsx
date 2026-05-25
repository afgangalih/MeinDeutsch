import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MeinDeutsch — Platform Belajar Bahasa Jerman",
  description:
    "Platform belajar bahasa Jerman terstruktur berbasis CEFR. Latih empat keterampilan: Hören, Lesen, Schreiben, Sprechen. Mulai dari A1 sekarang.",
  keywords: ["belajar bahasa Jerman", "German learning", "CEFR", "A1", "Deutsch"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
