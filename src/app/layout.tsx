import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ScrollReveal } from "@/components/scroll-reveal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamzagroup-auto-import.ru"),
  title: "HAMZA GROUP — авто из Китая и Кореи под ключ",
  description: "Подбор, выкуп, доставка и растаможка автомобилей из Китая и Кореи под ключ.",
  keywords: [
    "авто из Китая",
    "авто из Кореи",
    "подбор авто под ключ",
    "растаможка авто",
    "доставка авто в Россию",
    "HAMZA GROUP"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "HAMZA GROUP — авто из Китая и Кореи под ключ",
    description: "Подбор, выкуп, доставка и растаможка автомобилей из Китая и Кореи под ключ.",
    url: "/",
    siteName: "HAMZA GROUP Auto Import",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/hamza-brand-board.png",
        width: 1536,
        height: 1024,
        alt: "HAMZA GROUP Auto Import"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HAMZA GROUP — авто из Китая и Кореи под ключ",
    description: "Подбор, выкуп, доставка и растаможка автомобилей из Китая и Кореи под ключ.",
    images: ["/images/hamza-brand-board.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
