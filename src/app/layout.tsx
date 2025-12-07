import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ewaluator lekcji",
  description: "Aplikacja do ewaluacji lekcji dla nauczycieli i uczniów.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="flex flex-col justify-center items-center h-screen">
        {children}
      </body>
    </html>
  );
}
