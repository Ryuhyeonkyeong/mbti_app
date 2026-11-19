import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
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
  description: "간단한 질문에 답하고 나만의 성격 유형과 3D 동물 캐릭터를 만나보세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full font-sans flex justify-center">
        {/* PC에서 열어도 휴대폰 화면(최대 너비 480px)처럼 보이도록 가운데에 배치합니다 */}
        <div className="w-full max-w-[480px] min-h-screen flex flex-col bg-white/75 backdrop-blur-sm shadow-[0_12px_40px_rgba(140,120,180,0.12)] sm:my-4 sm:min-h-[calc(100vh-2rem)] sm:rounded-[32px] border border-white/80 overflow-hidden">
          {/* 모든 페이지 상단에 공통으로 보이는 헤더입니다 */}
          <header className="flex items-center justify-between px-5 py-4 bg-white/80 border-b border-purple-100/80">
            {/* 왼쪽: 서비스 이름 (누르면 첫 화면으로 이동) */}
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-purple-700 hover:text-purple-500 transition-colors"
            >
              Tina&apos; MBTI
            </Link>

            {/* 오른쪽: 메뉴 (현재는 유형 도감 하나만 배치) */}
            <nav aria-label="주요 메뉴">
              <Link
                href="/types"
                className="inline-flex items-center rounded-full bg-purple-50 px-3.5 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
              >
                유형 도감
              </Link>
            </nav>
          </header>

          {/* 각 페이지의 본문이 들어가는 영역입니다 */}
          <main className="flex-1 flex flex-col px-5 py-7">{children}</main>
        </div>
      </body>
    </html>
  );
}
