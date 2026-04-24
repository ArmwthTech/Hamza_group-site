import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
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
  icons: {
    icon: "/icon.png"
  },
  openGraph: {
    title: "HAMZA GROUP — авто из Китая и Кореи под ключ",
    description: "Подбор, выкуп, доставка и растаможка автомобилей из Китая и Кореи под ключ.",
    images: ["/images/hamza-brand-board.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
