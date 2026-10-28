import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitUser";



export const metadata: Metadata = {
  title: "ShopNest | 8 minutes delivery",
  description: "8 minutes delivery",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full min-h-screen bg-linear-to-b from-blue-200 to-white">
        <Provider>
          <StoreProvider>
            <InitUser/>
          {children}
          </StoreProvider>
        </Provider>

      </body>
    </html>
  );
}
