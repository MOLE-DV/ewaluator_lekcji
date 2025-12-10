import type { Metadata } from "next";
import "./globals.css";
import InfoCircleIcon from "./components/InfoCircle";
import CustomLink from "./components/CustomLink";
import { AppContainer } from "./components/AppContainer";
import { LoadingScreenProvider } from "./contexts/LoadingScreenContext";

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
        <LoadingScreenProvider>
          <AppContainer>{children}</AppContainer>
        </LoadingScreenProvider>
        <CustomLink
          icon={<InfoCircleIcon />}
          href="/about"
          className="absolute right-3 bottom-3"
        />
      </body>
    </html>
  );
}
