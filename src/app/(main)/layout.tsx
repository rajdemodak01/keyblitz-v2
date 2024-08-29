import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Space_Mono } from "next/font/google";
import ThemeManager from "@/components/themeManager";
import StoreProvider from "./storeProvider";
import Button from "@/components/ui/Button";
import ChaseTheCursor from "@/components/ChaseTheCursor";

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
  typing?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <ThemeManager>
          <div
            className={
              `${spaceMono.variable} font-sans` +
              " px-4 xs:w-[450px] sm:w-[600px] md:w-[740px] lg:w-[980px] xl:w-[1200px]   mx-auto h-svh "
            }
          >
            <Header />
            {/* <div>
              <Button size="small" className=" block ml-auto">
                Chase the cursor
              </Button>
            </div> */}
            <div className=" mt-8">{typing}</div>

            <ChaseTheCursor />
            {/* {children} */}
          </div>
        </ThemeManager>
      </StoreProvider>
    </html>
  );
}
