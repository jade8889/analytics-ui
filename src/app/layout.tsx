import "./globals.css";
import "../statics/css/animate.css";
import "../statics/css/css.css";
import "../statics/css/slick.css";
import localFont from "next/font/local";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Metadata } from "next";

import ToastProvider from "../contexts/ToastContext";
import Navigation from "../components/Navigation/navigation";
import { Analytics } from "@vercel/analytics/react";
import LanguageProvider from "../contexts/LanguageContext";
import { SoundContextProvider } from "../contexts/SoundContext";
import { SubgraphProvider } from "../contexts/SubgraphContext";

// import { SubgraphProvider } from "../contexts/SubgraphContext";

const halvar = localFont({
  src: [
    {
      path: "../statics/fonts/HalvarBreit-Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../statics/fonts/HalvarBreit-Bd.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "JadeRoll",
    description: "",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body className={`${halvar.className}`}>
          <Providers>
            <SubgraphProvider>
              <SoundContextProvider>
                <ToastProvider>
                  <main className="">
                    <Navigation />
                    {children}
                  </main>
                </ToastProvider>
              </SoundContextProvider>
            </SubgraphProvider>
          </Providers>
          <Analytics />
        </body>
      </LanguageProvider>
    </html>
  );
}