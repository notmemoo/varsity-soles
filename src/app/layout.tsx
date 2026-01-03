import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Varsity Soles | Buy, Sell, Trade Sneakers",
    template: "%s | Varsity Soles",
  },
  description:
    "Your premier destination for buying, selling, and restoring sneakers. Quality kicks, professional restoration services, and authentic sneaker culture.",
  keywords: [
    "sneakers",
    "buy sneakers",
    "sell sneakers",
    "sneaker restoration",
    "shoe cleaning",
    "sneaker marketplace",
    "Varsity Soles",
  ],
  authors: [{ name: "Varsity Soles" }],
  creator: "Varsity Soles",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Varsity Soles",
    title: "Varsity Soles | Buy, Sell, Trade Sneakers",
    description:
      "Your premier destination for buying, selling, and restoring sneakers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varsity Soles | Buy, Sell, Trade Sneakers",
    description:
      "Your premier destination for buying, selling, and restoring sneakers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
