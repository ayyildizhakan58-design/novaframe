import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumenfield AI Studio",
  description:
    "A premium AI production workspace for image, video, audio, marketing, plugins, credits and multilingual creative teams.",
  keywords: ["Lumenfield AI Studio", "Lumenfield", "AI studio", "image generation", "video generation", "AI marketing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}

