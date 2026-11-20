import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "참여 통계",
  description: "Tina' MBTI에서 지금까지 가장 많이 나온 성격 유형 순위를 확인해 보세요.",
  openGraph: {
    title: "참여 통계 | Tina' MBTI",
    description: "Tina' MBTI에서 지금까지 가장 많이 나온 성격 유형 순위를 확인해 보세요.",
  },
};

export default function StatsLayout({ children }: { children: ReactNode }) {
  return children;
}
