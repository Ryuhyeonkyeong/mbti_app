import type { Metadata } from "next";
import TypesCatalog from "@/components/TypesCatalog";

export const metadata: Metadata = {
  title: "유형 도감",
  description: "16가지 MBTI 성격 유형과 3D 동물 캐릭터를 한눈에 둘러보세요.",
  openGraph: {
    title: "유형 도감 | Tina' MBTI",
    description: "16가지 MBTI 성격 유형과 3D 동물 캐릭터를 한눈에 둘러보세요.",
  },
};

// 16가지 성격 유형과 3D 동물 캐릭터를 모아 보는 유형 도감 페이지입니다
export default function TypesPage() {
  return <TypesCatalog />;
}
