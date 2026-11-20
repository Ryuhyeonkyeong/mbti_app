import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import AppShell from "@/components/AppShell";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

// Google Fonts에서 Noto Sans KR 글꼴을 불러옵니다
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// 브라우저 탭과 링크 공유 미리보기(Open Graph)에 표시될 기본 서비스 정보입니다
export const metadata: Metadata = {
  title: {
    default: "Tina' MBTI",
    template: "%s | Tina' MBTI",
  },
  description:
    "80개 질문으로 알아보는 나의 성격 유형과 귀여운 3D 동물 캐릭터 검사 서비스입니다.",
  openGraph: {
    title: "Tina' MBTI - 나의 성격 유형과 3D 동물 캐릭터 찾기",
    description:
      "80개 질문에 답하고 16가지 성격 유형과 나만의 3D 동물 캐릭터를 만나보세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "Tina' MBTI",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full font-sans flex justify-center">
        {/* 앱 전체에서 로그인 상태를 공유할 수 있도록 AuthProvider로 감쌉니다 */}
        <AuthProvider>
          {/* 상단에서 PC용(가로) / 모바일용(세로) 화면 모드를 전환할 수 있는 공통 틀입니다 */}
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
