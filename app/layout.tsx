import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://speech-ai-pi.vercel.app"),
  title: "Vannelo Speech Creator",
  description:
    "Create your own speech with the help of AI. Just type in your speech and let the AI do the rest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-DXEZYQXJD4" />
    </html>
  );
}
