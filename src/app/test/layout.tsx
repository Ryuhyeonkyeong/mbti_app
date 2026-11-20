import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "성격 유형 검사",
  description:
    "일상·회사·연애 상황을 담은 80개 질문에 답하고 나의 MBTI 유형을 알아보세요.",
  openGraph: {
    title: "성격 유형 검사 | Tina' MBTI",
    description:
      "일상·회사·연애 상황을 담은 80개 질문에 답하고 나의 MBTI 유형을 알아보세요.",
  },
};

export default function TestLayout({ children }: { children: ReactNode }) {
  return children;
}
