import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Space_Mono } from "next/font/google";
import ThemeManager from "@/components/themeManager";
import StoreProvider from "./storeProvider";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-spacemono",
});

export const metadata: Metadata = {
  title: "keyblitz",
  description: "type like a rabbit",
};

export default function RootLayout({
  children,
  typing,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <ThemeManager>
          <div
            className={
              `${spaceMono.variable} font-sans` +
              " max-w-screen-xl mx-auto h-svh "
            }
          >
            <Header />
            {typing}
            {/* {children} */}
          </div>
        </ThemeManager>
      </StoreProvider>
    </html>
  );
}
