import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarFinder — Find Your Perfect Car",
  description:
    "Answer 8 quick questions about your lifestyle and get personalized car recommendations with local dealer listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
        <Script
          src="//tags.tiqcdn.com/utag/analytics-pros-training/rob.konanz/prod/utag.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
