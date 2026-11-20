import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getMbtiTypeInfo } from "@/data/types";
import ResultView, { type PercentageRow } from "@/components/ResultView";

// 유형 코드에 따라 브라우저 탭 제목과 링크 미리보기(Open Graph)를 동적으로 생성합니다
export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const info = getMbtiTypeInfo(type);

  if (!info) {
    return {
      title: "없는 유형",
      description: "요청하신 성격 유형 정보를 찾을 수 없습니다.",
    };
  }

  const fullTitle = `${info.code} ${info.nickname} | Tina' MBTI`;

  return {
    title: {
      absolute: fullTitle,
    },
    description: info.summary,
    openGraph: {
      title: fullTitle,
      description: info.summary,
    },
  };
}

// 유형별 일러스트 아래에 보여줄 한 줄 캡션입니다
const ILLUSTRATION_CAPTIONS: Record<string, string> = {
  INTJ: "장기 계획 세우기",
  INTP: "원리 파고들기",
  ENTJ: "목표와 역할 정하기",
  ENTP: "새로운 가능성 토론하기",
  INFJ: "마음의 의미 살피기",
  INFP: "가치와 상상 표현하기",
  ENFJ: "함께 성장하도록 격려하기",
  ENFP: "아이디어를 함께 펼치기",
  ISTJ: "순서와 기준 지키기",
  ISFJ: "필요한 것 챙겨 주기",
  ESTJ: "일정과 역할 조율하기",
  ESFJ: "모두가 어울리도록 돕기",
  ISTP: "직접 고치며 해결하기",
  ISFP: "감각으로 표현하기",
  ESTP: "상황에 맞춰 바로 움직이기",
  ESFP: "즐거움을 함께 나누기",
};

// 쿼리 파라미터에서 0~100 사이의 성향 비율(%)을 안전하게 읽어옵니다
function parsePercent(value: string | string[] | undefined): number | null {
  if (typeof value !== "string") return null;
  const num = Number(value);
  if (Number.isNaN(num) || num < 0 || num > 100) return null;
  return Math.round(num);
}

// params와 searchParams를 읽어 결과 화면을 그려 주는 서버 컴포넌트입니다
async function ResultContent({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ type }, query] = await Promise.all([params, searchParams]);
  // 소문자(예: enfp)로 들어와도 대문자로 변환해 데이터를 찾습니다
  const info = getMbtiTypeInfo(type);

  // 16가지 유형에 없는 코드일 때 안내 화면을 보여줍니다
  if (!info) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8">
        <div className="rounded-3xl bg-purple-50/80 border border-purple-100 px-8 py-8 shadow-[0_8px_24px_rgba(140,120,180,0.1)] space-y-2">
          <p className="text-3xl">🤔</p>
          <h1 className="text-xl font-bold text-[#2e293a]">없는 유형이에요</h1>
          <p className="text-sm text-[#665f75]">
            입력하신 성격 유형 정보를 찾을 수 없습니다.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-7 py-4 text-base font-bold text-white shadow-[0_10px_24px_rgba(168,85,247,0.25)] hover:opacity-95 transition-all"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  // 검사 완료 후 넘어온 성향별 % 값이 있는지 확인합니다
  const ePct = parsePercent(query.e);
  const sPct = parsePercent(query.s);
  const tPct = parsePercent(query.t);
  const jPct = parsePercent(query.j);
  const hasPercentages =
    ePct !== null && sPct !== null && tPct !== null && jPct !== null;

  const percentageRows: PercentageRow[] = hasPercentages
    ? [
        {
          leftLabel: "E (외향)",
          rightLabel: "I (내향)",
          leftPercent: ePct,
          rightPercent: 100 - ePct,
          barColor: "bg-pink-400",
        },
        {
          leftLabel: "S (감각)",
          rightLabel: "N (직관)",
          leftPercent: sPct,
          rightPercent: 100 - sPct,
          barColor: "bg-amber-400",
        },
        {
          leftLabel: "T (사고)",
          rightLabel: "F (감정)",
          leftPercent: tPct,
          rightPercent: 100 - tPct,
          barColor: "bg-sky-400",
        },
        {
          leftLabel: "J (판단)",
          rightLabel: "P (인식)",
          leftPercent: jPct,
          rightPercent: 100 - jPct,
          barColor: "bg-purple-400",
        },
      ]
    : [];

  return (
    <ResultView
      info={info}
      percentageRows={percentageRows}
      illustrationCaption={ILLUSTRATION_CAPTIONS[info.code] ?? ""}
    />
  );
}

// MBTI 검사 결과 페이지
export default function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-sm text-[#665f75]">
          결과를 불러오는 중...
        </div>
      }
    >
      <ResultContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
