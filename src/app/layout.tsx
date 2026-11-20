import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import AppShell from "@/components/AppShell";
import "./globals.css";

// Google Fonts에서 Noto Sans KR 글꼴을 불러옵니다
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// 브라우저 탭과 검색 결과에 표시될 서비스 정보입니다
export const metadata: Metadata = {
  title: "Tina' MBTI",
  description:
    "간단한 질문에 답하고 나만의 성격 유형과 3D 동물 캐릭터를 만나보세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full font-sans flex justify-center">
        {/* 상단에서 PC용(가로) / 모바일용(세로) 화면 모드를 전환할 수 있는 공통 틀입니다 */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
