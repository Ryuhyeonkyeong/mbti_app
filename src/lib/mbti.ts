import type { MbtiTrait } from "@/data/questions";

// 사용자가 고른 성향 글자 배열을 받아 4글자 MBTI 유형 코드를 계산합니다
export function calculateMbti(selectedTraits: MbtiTrait[]): string {
  // 8가지 성향별 선택 횟수를 0으로 초기화합니다
  const counts: Record<MbtiTrait, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  // 사용자가 고른 답을 하나씩 확인하며 점수를 더합니다
  for (const trait of selectedTraits) {
    counts[trait] += 1;
  }

  // 4가지 지표마다 더 많이 고른 쪽 글자를 선택해 이어 붙입니다
  const ei = counts.E >= counts.I ? "E" : "I";
  const sn = counts.S >= counts.N ? "S" : "N";
  const tf = counts.T >= counts.F ? "T" : "F";
  const jp = counts.J >= counts.P ? "J" : "P";

  return `${ei}${sn}${tf}${jp}`;
}
