import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://doan-xi-eta.vercel.app";
const OG_TITLE = "도안자이 센텀리체 | 대전 유성구 프리미엄 아파트 분양";
const OG_DESCRIPTION = "대전 도안신도시 최중심, GS건설 자이 브랜드. 지하2층~지상 최고 42층, 총 2,293세대. 2029년 12월 입주 예정.";
const OG_IMAGE = "https://doan-xi-eta.vercel.app/images/xi_logo_dark.png";

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  keywords: "도안자이, 센텀리체, 대전분양, 유성구아파트, GS건설, 자이, 도안",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: "도안자이 센텀리체",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "도안자이 센텀리체",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body>{children}</body>
    </html>
  );
}
