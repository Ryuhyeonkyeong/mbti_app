import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "Tina' MBTI 회원이 되어 나만의 성격 유형 검사 결과를 저장해 보세요.",
  openGraph: {
    title: "회원가입 | Tina' MBTI",
    description: "Tina' MBTI 회원이 되어 나만의 성격 유형 검사 결과를 저장해 보세요.",
  },
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}
