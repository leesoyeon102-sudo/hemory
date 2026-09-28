import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/app-context";
import { Navbar } from "@/components/Navbar";
import { HamsterMascot } from "@/components/HamsterMascot";
import { AmplitudeInit } from "@/components/AmplitudeInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hemmory",
  description: "아이디와 비밀번호를 까먹지 않게 도와주는 햄스터 계정 메모 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AmplitudeInit />
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <HamsterMascot />
        </AppProvider>
      </body>
    </html>
  );
}
