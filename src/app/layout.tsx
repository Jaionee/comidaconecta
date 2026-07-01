import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toaster";
import Script from "next/script";

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
    "comedores sociales",
    "ONG alimentos donación",
    "economía circular",
    "donar pan sobrante",
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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://comidaconecta.vercel.app/#organization",
                  "name": "ComidaConecta",
                  "url": "https://comidaconecta.vercel.app",
                  "description": "Plataforma gratuita que conecta comercios con excedente alimentario y entidades sociales para reducir el desperdicio de alimentos.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://comidaconecta.vercel.app/#website",
                  "url": "https://comidaconecta.vercel.app",
                  "name": "ComidaConecta",
                  "description": "Plataforma gratuita que conecta comercios con excedente alimentario y entidades sociales.",
                  "publisher": { "@id": "https://comidaconecta.vercel.app/#organization" },
                  "inLanguage": "es",
                  "isAccessibleForFree": true,
                  "potentialAction": [
                    {
                      "@type": "RegisterAction",
                      "target": "https://comidaconecta.vercel.app/register",
                    },
                  ],
                },
                {
                  "@type": "WebPage",
                  "@id": "https://comidaconecta.vercel.app/#webpage",
                  "url": "https://comidaconecta.vercel.app",
                  "name": "ComidaConecta — Donación de excedente alimentario",
                  "description": "Reduce el desperdicio alimentario. Plataforma gratuita que conecta comercios donantes con entidades sociales receptoras.",
                  "isPartOf": { "@id": "https://comidaconecta.vercel.app/#website" },
                  "about": {
                    "@type": "Thing",
                    "name": "Reducción del desperdicio alimentario",
                  },
                  "mentions": [
                    { "@type": "Thing", "name": "Donación de alimentos" },
                    { "@type": "Thing", "name": "Excedente alimentario" },
                    { "@type": "Thing", "name": "Economía circular" },
                    { "@type": "Thing", "name": "Trazabilidad de donaciones" },
                    { "@type": "Thing", "name": "Impacto social" },
                  ],
                  "dateModified": "2026-06-21",
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://comidaconecta.vercel.app/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "¿Es realmente gratis?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Para entidades sociales es 100% gratuito. Para comercios funciona con contribución voluntaria de 5-10€/mes, sin contrato ni permanencia.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "¿Qué tipos de alimentos se pueden donar?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Productos frescos, envasados, no perecederos, panadería, fruta y verdura, lácteos en perfecto estado.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "¿Cómo me registro como comercio?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Entra en comidaconecta.vercel.app/register, selecciona 'Soy comercio', completa tus datos y empieza a publicar tu excedente.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "¿Cómo me registro como entidad social?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Entra en comidaconecta.vercel.app/register, selecciona 'Soy entidad social' y ya puedes ver donaciones disponibles en tiempo real.",
                      },
                    },
                  ],
                },
                {
                  "@type": "HowTo",
                  "@id": "https://comidaconecta.vercel.app/#howto",
                  "name": "Cómo donar excedente alimentario en ComidaConecta",
                  "description": "Tres pasos simples: publica, conecta y recoge.",
                  "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": "0" },
                  "step": [
                    {
                      "@type": "HowToStep",
                      "position": 1,
                      "name": "Publica",
                      "text": "El comercio publica el excedente disponible: tipo, cantidad, horario.",
                      "url": "https://comidaconecta.vercel.app/register?role=commerce",
                    },
                    {
                      "@type": "HowToStep",
                      "position": 2,
                      "name": "Conecta",
                      "text": "Las entidades ven donaciones en tiempo real y reservan recogida.",
                      "url": "https://comidaconecta.vercel.app",
                    },
                    {
                      "@type": "HowToStep",
                      "position": 3,
                      "name": "Recoge",
                      "text": "La entidad recoge, el comercio confirma, todo queda registrado.",
                      "url": "https://comidaconecta.vercel.app",
                    },
                  ],
                  "inLanguage": "es",
                  "isAccessibleForFree": true,
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-svh flex flex-col bg-zinc-950 text-zinc-100 antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
