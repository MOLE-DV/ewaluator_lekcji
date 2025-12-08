import type { Metadata } from "next";
import "./globals.css";
import Button from "./components/Button";
import InfoCircleIcon from "./components/InfoCircle";
import CustomLink from "./components/CustomLink";

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
    <html lang="pl" className="overflow-x-hidden w-dvw">
      <body className="flex flex-col justify-center items-center h-screen p-3 overflow-x-hidden w-dvw drop-shadow-md">
        {children}
        <CustomLink
          icon={<InfoCircleIcon />}
          href="/about"
          className="absolute right-3 bottom-3"
        />
      </body>
    </html>
  );
}
