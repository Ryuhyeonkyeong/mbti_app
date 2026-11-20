"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { MBTI_TYPES, type MbtiTypeCode } from "@/data/types";
import CharacterViewer from "@/components/CharacterViewer";
import { useViewMode } from "@/components/AppShell";

// DB 함수 get_type_stats()가 돌려주는 한 줄의 타입입니다
interface StatRow {
  mbti_type: string;
  count: number;
}

// 화면에 그릴 16개 유형별 통계 항목 타입입니다
interface TypeStatItem {
  code: MbtiTypeCode;
  nickname: string;
  color: string;
  count: number;
  percent: number;
}

const ALL_CODES = Object.keys(MBTI_TYPES) as MbtiTypeCode[];

// 모든 회원의 저장 결과를 모아 유형별 통계를 보여주는 페이지입니다 (로그인 없이 볼 수 있습니다)
export default function StatsPage() {
  const { viewMode } = useViewMode();
  const isPc = viewMode === "pc";

  const [items, setItems] = useState<TypeStatItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      setLoading(true);
      setErrorMessage("");

      // 보안 함수 get_type_stats()를 호출해 유형 코드와 개수만 가져옵니다
      const { data, error } = await supabase.rpc("get_type_stats");

      if (!active) return;

      if (error) {
        setErrorMessage("통계를 불러오는 중 문제가 발생했어요.");
        setLoading(false);
        return;
      }

      const rows = (data as StatRow[] | null) ?? [];
      const countMap = new Map<string, number>();
      let total = 0;

      for (const row of rows) {
        const c = Number(row.count) || 0;
        countMap.set(row.mbti_type.toUpperCase(), c);
        total += c;
      }

      // 16개 유형 전체를 개수 많은 순서대로 정렬합니다
      const sorted: TypeStatItem[] = ALL_CODES.map((code) => {
        const info = MBTI_TYPES[code];
        const count = countMap.get(code) ?? 0;
        const percent = total > 0 ? Math.round((count / total) * 100) : 0;
        return {
          code,
          nickname: info.nickname,
          color: info.color,
          count,
          percent,
        };
      }).sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));

      setTotalCount(total);
      setItems(sorted);
      setLoading(false);
    };

    void loadStats();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm font-medium text-[#665f75]">
        통계를 불러오는 중...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8">
        <p className="rounded-2xl bg-rose-50 border border-rose-200 px-5 py-4 text-sm font-medium text-rose-700">
          {errorMessage}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  // 저장된 결과가 하나도 없을 때 안내 화면을 보여줍니다
  if (totalCount === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8">
        <div className="rounded-3xl bg-purple-50/80 border border-purple-100 px-8 py-8 shadow-[0_8px_24px_rgba(140,120,180,0.1)] space-y-2">
          <p className="text-3xl">📊</p>
          <h1 className="text-xl font-bold text-[#2e293a]">
            아직 모인 결과가 없어요
          </h1>
          <p className="text-sm text-[#665f75]">
            첫 번째로 검사를 완료하고 결과를 저장해 보세요!
          </p>
        </div>

        <Link
          href="/test"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-7 py-4 text-base font-bold text-white shadow-[0_10px_24px_rgba(168,85,247,0.25)] hover:opacity-95 transition-all"
        >
          검사 시작하기
        </Link>
      </div>
    );
  }

  const topItem = items[0];
  const topInfo = MBTI_TYPES[topItem.code];
  const maxCount = Math.max(...items.map((item) => item.count), 1);

  return (
    <div
      className={
        isPc
          ? "flex-1 grid grid-cols-12 gap-6 items-start"
          : "flex-1 flex flex-col gap-5"
      }
    >
      {/* 왼쪽(또는 모바일 상단): 전체 결과 수 + 가장 많은 유형의 3D 캐릭터와 별명 */}
      <div className={`flex flex-col gap-4 ${isPc ? "col-span-5" : ""}`}>
        <section className="rounded-3xl bg-purple-50/80 border border-purple-100 p-5 text-center shadow-[0_8px_22px_rgba(140,120,180,0.08)]">
          <p className="text-xs font-bold text-purple-700 mb-1">
            Tina&apos; MBTI 통계
          </p>
          <h1 className="text-xl font-bold text-[#2e293a] break-keep">
            지금까지{" "}
            <span className="text-purple-700">
              {totalCount.toLocaleString()}개
            </span>
            의 결과가 모였어요
          </h1>
        </section>

        {/* 가장 많은 유형 1위 카드 */}
        <section
          aria-label="가장 많은 유형"
          className="rounded-3xl border border-white p-4 shadow-[0_10px_26px_rgba(140,120,180,0.12)] flex flex-col items-center text-center gap-2"
          style={{
            background: `linear-gradient(180deg, ${topInfo.color}88 0%, #ffffffcc 100%)`,
          }}
        >
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">
            👑 가장 많은 유형 1위 ({topItem.percent}%)
          </span>

          <CharacterViewer
            typeCode={topInfo.code}
            heightClass={isPc ? "h-60" : "h-64"}
          />

          <div className="space-y-1 pb-1">
            <p className="text-2xl font-bold tracking-wider text-[#2e293a]">
              {topInfo.code}
            </p>
            <p className="text-sm font-bold text-[#3f3850]">
              {topInfo.nickname}
            </p>
          </div>
        </section>
      </div>

      {/* 오른쪽(또는 모바일 하단): 16개 유형 전체 가로 막대 그래프 */}
      <section
        aria-label="유형별 분포 그래프"
        className={`rounded-3xl bg-white/90 border border-white p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-3.5 ${
          isPc ? "col-span-7" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#2e293a]">
            📊 16가지 유형 순위
          </h2>
          <span className="text-xs text-[#665f75]">많은 순</span>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => {
            // 가장 많은 유형의 막대를 기준으로 비례 너비를 계산합니다
            const barWidth =
              item.count > 0
                ? Math.max(Math.round((item.count / maxCount) * 100), 6)
                : 0;

            return (
              <Link
                key={item.code}
                href={`/result/${item.code}`}
                className="block rounded-2xl p-2 hover:bg-purple-50/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#2e293a] mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-11">{item.code}</span>
                    <span className="font-medium text-[#665f75] truncate max-w-[140px] sm:max-w-none">
                      {item.nickname}
                    </span>
                  </span>
                  <span className="shrink-0 text-[#575068]">
                    {item.count}개 ({item.percent}%)
                  </span>
                </div>

                {/* 그래프 라이브러리 없이 만든 가로 막대 */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
