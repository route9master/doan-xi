import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "도안자이 센텀리체 | 대전 유성구 프리미엄 아파트 분양",
  description: "대전광역시 유성구 용계동, 지상 최고 42층 총 2,293세대. GS건설의 품격 있는 주거 공간, 도안자이 센텀리체를 소개합니다.",
  keywords: "도안자이, 센텀리체, 대전분양, 유성구아파트, GS건설, 자이, 도안",
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
