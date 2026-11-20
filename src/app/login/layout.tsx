import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "로그인",
  description: "Tina' MBTI에 로그인하고 저장한 성격 유형 검사 결과를 확인하세요.",
  openGraph: {
    title: "로그인 | Tina' MBTI",
    description: "Tina' MBTI에 로그인하고 저장한 성격 유형 검사 결과를 확인하세요.",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
