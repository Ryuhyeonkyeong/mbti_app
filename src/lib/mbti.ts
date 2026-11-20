import type { MbtiTrait } from "@/data/questions";

// 8가지 성향별 백분율(%)을 담는 타입입니다
export type MbtiPercentages = Record<MbtiTrait, number>;

// 검사 결과 유형 코드와 각 성향의 비율(%)을 함께 계산해 반환합니다
export function calculateMbtiWithPercentages(selectedTraits: MbtiTrait[]): {
  type: string;
  percentages: MbtiPercentages;
} {
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

  // 두 성향의 합이 항상 100%가 되도록 비율을 계산합니다
  const calcPair = (first: MbtiTrait, second: MbtiTrait): [number, number] => {
    const total = counts[first] + counts[second];
    if (total === 0) return [50, 50];
    const firstPercent = Math.round((counts[first] / total) * 100);
    return [firstPercent, 100 - firstPercent];
  };

  const [ePct, iPct] = calcPair("E", "I");
  const [sPct, nPct] = calcPair("S", "N");
  const [tPct, fPct] = calcPair("T", "F");
  const [jPct, pPct] = calcPair("J", "P");

  // 4가지 지표마다 더 많이 고른 쪽 글자를 선택해 이어 붙입니다
  const ei = counts.E >= counts.I ? "E" : "I";
  const sn = counts.S >= counts.N ? "S" : "N";
  const tf = counts.T >= counts.F ? "T" : "F";
  const jp = counts.J >= counts.P ? "J" : "P";

  return {
    type: `${ei}${sn}${tf}${jp}`,
    percentages: {
      E: ePct,
      I: iPct,
      S: sPct,
      N: nPct,
      T: tPct,
      F: fPct,
      J: jPct,
      P: pPct,
    },
  };
}

// 기존 호환용: 유형 코드만 필요할 때 사용합니다
export function calculateMbti(selectedTraits: MbtiTrait[]): string {
  return calculateMbtiWithPercentages(selectedTraits).type;
}
