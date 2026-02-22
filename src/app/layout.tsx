import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enter.fun — 스트리밍하면 보상받는다",
  description:
    "게임 스트리머 성과 기반 자동 보상 플랫폼. 얼리 액세스 신청하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
