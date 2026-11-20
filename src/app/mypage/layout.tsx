import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "내가 저장한 MBTI 검사 기록과 3D 동물 캐릭터를 다시 확인해 보세요.",
  openGraph: {
    title: "마이페이지 | Tina' MBTI",
    description: "내가 저장한 MBTI 검사 기록과 3D 동물 캐릭터를 다시 확인해 보세요.",
  },
};

export default function MypageLayout({ children }: { children: ReactNode }) {
  return children;
}
