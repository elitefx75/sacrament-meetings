import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Cedar Ridge Ward Meetings",
    template: "%s | Cedar Ridge Ward",
  },
  description: "A clear weekly record of Cedar Ridge Ward sacrament meetings.",
  openGraph: {
    type: "website",
    siteName: "Cedar Ridge Ward",
    title: "Cedar Ridge Ward Meetings",
    description: "A clear weekly record of Cedar Ridge Ward sacrament meetings.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cedar Ridge Ward Meetings",
    description: "A clear weekly record of Cedar Ridge Ward sacrament meetings.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
