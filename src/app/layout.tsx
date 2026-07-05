import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toaster";
import Script from "next/script";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComidaConecta — Donación de excedente alimentario | Plataforma gratuita",
  description:
    "¿Tienes excedente de comida en tu comercio? Dónalo gratis a ONGs y comedores sociales. Plataforma gratuita que conecta donantes con entidades sociales. Sin burocracia.",
  keywords: [
    "donar comida excedente",
    "donación alimentos restaurantes",
    "reducir desperdicio comida",
    "plataforma donación alimentos gratis",
    "food donation",
    "surplus food",
    "economía circular",
    "food waste reduction",
  ],
  openGraph: {
    title: "ComidaConecta — Donación de excedente alimentario",
    description:
      "Plataforma gratuita que conecta comercios con excedente alimentario y entidades sociales. Sin comisiones.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" dir="ltr" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>{/* Schema JSON-LD is in page.tsx as client component to be language-aware */}</head>
      <body className="min-h-svh flex flex-col bg-zinc-950 text-zinc-100 antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
