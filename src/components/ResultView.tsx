"use client";

import Link from "next/link";
import Image from "next/image";
import { getMbtiTypeInfo, type MbtiTypeInfo } from "@/data/types";
import ShareResultButton from "./ShareResultButton";
import CharacterViewer from "./CharacterViewer";
import { useViewMode } from "./AppShell";

export interface PercentageRow {
  leftLabel: string;
  rightLabel: string;
  leftPercent: number;
  rightPercent: number;
  barColor: string;
}

// 결과 페이지 UI를 PC용(가로 한눈에 보기)과 모바일용(세로 보기)으로 맞춰 그려주는 컴포넌트입니다
export default function ResultView({
  info,
  percentageRows,
  illustrationCaption,
}: {
  info: MbtiTypeInfo;
  percentageRows: PercentageRow[];
  illustrationCaption: string;
}) {
  const { viewMode } = useViewMode();
  const isPc = viewMode === "pc";
  const hasPercentages = percentageRows.length > 0;

  return (
    /* 유형의 대표 색상이 페이지 전체에 은은하게 퍼지도록 배경 그라데이션을 적용합니다 */
    <div
      className="flex-1 flex flex-col gap-5 -mx-5 -my-7 px-5 py-7"
      style={{
        background: `linear-gradient(180deg, ${info.color}66 0%, #ffffff 42%, ${info.color}40 100%)`,
      }}
    >
      {/* PC용에서는 왼쪽(유형·캐릭터·비율·버튼)과 오른쪽(설명·회사·연애·강점·궁합·일러스트)을 가로로 배치합니다 */}
      <div
        className={
          isPc
            ? "grid grid-cols-12 gap-5 items-start"
            : "flex flex-col gap-5"
        }
      >
        {/* ==================== 왼쪽(또는 모바일 상단) 영역 ==================== */}
        <div className={`flex flex-col gap-4 ${isPc ? "col-span-5" : ""}`}>
          {/* 1) "당신의 유형은" 문구, 유형 코드(크게), 별명 */}
          <section className="text-center space-y-2 pt-1">
            <p className="text-sm font-medium text-[#665f75]">당신의 유형은</p>
            <h1 className="text-5xl font-bold tracking-widest text-[#2e293a]">
              {info.code}
            </h1>
            <p className="inline-block rounded-full bg-white/85 px-4 py-1.5 text-sm font-bold text-[#3f3850] shadow-sm">
              {info.nickname}
            </p>
          </section>

          {/* 2) 캐릭터 자리: 해당 유형의 3D 동물 캐릭터를 보여줍니다 */}
          <section aria-label="유형 캐릭터">
            <div
              className="flex flex-col items-center justify-center rounded-3xl border border-white/80 p-3 shadow-[0_10px_26px_rgba(140,120,180,0.12)]"
              style={{ backgroundColor: `${info.color}cc` }}
            >
              <CharacterViewer
                typeCode={info.code}
                heightClass={isPc ? "h-60" : "h-72"}
                showDownload
              />
              <span className="mt-2 rounded-full bg-white/85 px-4 py-1 text-xs font-bold text-[#2e293a] shadow-sm">
                {info.character.name} ({info.character.animal})
              </span>
            </div>
          </section>

          {/* 3) 나의 성향 비율(%) 그래프 (검사를 마치고 들어온 경우 표시됩니다) */}
          {hasPercentages && (
            <section
              aria-label="성향 비율"
              className="rounded-3xl bg-white/90 border border-white p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-3"
            >
              <h2 className="text-base font-bold text-[#2e293a]">
                📊 나의 성향 비율 (%)
              </h2>
              <div className="space-y-2.5">
                {percentageRows.map((row) => (
                  <div key={row.leftLabel} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#575068]">
                      <span>
                        {row.leftLabel} {row.leftPercent}%
                      </span>
                      <span>
                        {row.rightPercent}% {row.rightLabel}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-purple-100/70 flex">
                      <div
                        className={`h-full ${row.barColor} transition-all`}
                        style={{ width: `${row.leftPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PC용에서는 왼쪽 아래에 액션 버튼을 바로 배치합니다 */}
          {isPc && (
            <section className="flex items-start gap-3">
              <Link
                href="/test"
                className="flex-1 inline-flex items-center justify-center rounded-2xl bg-white border border-purple-100 px-4 py-3.5 text-sm font-bold text-[#2e293a] shadow-[0_6px_18px_rgba(140,120,180,0.08)] hover:bg-purple-50/70 active:scale-[0.99] transition-all"
              >
                다시 검사하기
              </Link>
              <ShareResultButton />
            </section>
          )}
        </div>

        {/* ==================== 오른쪽(또는 모바일 하단) 영역 ==================== */}
        <div className={`flex flex-col gap-4 ${isPc ? "col-span-7" : ""}`}>
          {/* 4) 한 줄 소개와 성격 설명 */}
          <section className="rounded-3xl bg-white/90 border border-white p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2.5">
            <p className="text-base font-bold text-[#2e293a] leading-snug break-keep">
              {info.summary}
            </p>
            <p className="text-sm text-[#575068] leading-relaxed break-keep">
              {info.description}
            </p>
          </section>

          {/* 5) 회사에서의 성향 & 연애할 때의 성향 분석 (PC용에서는 가로 2칸) */}
          <section className={`grid gap-3 ${isPc ? "grid-cols-2" : "grid-cols-1"}`}>
            <div className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-1.5">
              <h2 className="text-sm sm:text-base font-bold text-[#2e293a]">
                💼 회사에서의 성향
              </h2>
              <p className="text-xs sm:text-sm text-[#575068] leading-relaxed break-keep">
                {info.workStyle}
              </p>
            </div>

            <div className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-1.5">
              <h2 className="text-sm sm:text-base font-bold text-[#2e293a]">
                💘 연애할 때의 성향
              </h2>
              <p className="text-xs sm:text-sm text-[#575068] leading-relaxed break-keep">
                {info.loveStyle}
              </p>
            </div>
          </section>

          {/* 6) 강점 목록, 조심할 점 목록 (PC용에서는 가로 2칸) */}
          <section className={`grid gap-3 ${isPc ? "grid-cols-2" : "grid-cols-1"}`}>
            <div className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2">
              <h2 className="text-sm sm:text-base font-bold text-[#2e293a]">
                ✨ 나의 강점
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#575068]">
                {info.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-purple-500 font-bold">•</span>
                    <span className="break-keep">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2">
              <h2 className="text-sm sm:text-base font-bold text-[#2e293a]">
                🌿 조심할 점
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#575068]">
                {info.cautions.map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-pink-400 font-bold">•</span>
                    <span className="break-keep">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7) 궁합 3종 (PC용에서는 가로 3칸으로 한눈에 보기) */}
          <section className={`grid gap-3 ${isPc ? "grid-cols-3" : "grid-cols-1"}`}>
            {/* 연애 궁합 */}
            <div className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2.5">
              <h2 className="text-sm font-bold text-[#2e293a]">
                💑 연애에 잘 맞는 MBTI
              </h2>
              <p className="text-xs text-[#575068] leading-relaxed break-keep">
                {info.loveMatchReason}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {info.loveMatchTypes.map((matchCode) => {
                  const matchInfo = getMbtiTypeInfo(matchCode);
                  return (
                    <Link
                      key={matchCode}
                      href={`/result/${matchCode}`}
                      className="flex flex-col items-center justify-center rounded-2xl bg-pink-50/70 border border-pink-100 p-2.5 text-center hover:scale-[1.02] transition-all"
                    >
                      <span
                        className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold text-[#2e293a]"
                        style={{ backgroundColor: matchInfo?.color ?? "#fce7f3" }}
                      >
                        {matchCode}
                      </span>
                      <span className="text-[11px] font-medium text-[#575068] break-keep">
                        {matchInfo?.character.name ?? ""}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 친구 궁합 */}
            <div className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2.5">
              <h2 className="text-sm font-bold text-[#2e293a]">
                🤝 친구로 잘 맞는 유형
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {info.compatibleTypes.map((compatCode) => {
                  const compatInfo = getMbtiTypeInfo(compatCode);
                  return (
                    <Link
                      key={compatCode}
                      href={`/result/${compatCode}`}
                      className="flex flex-col items-center justify-center rounded-2xl bg-purple-50/60 border border-purple-100/80 p-2.5 text-center hover:scale-[1.02] transition-all"
                    >
                      <span
                        className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold text-[#2e293a]"
                        style={{ backgroundColor: compatInfo?.color ?? "#ede9fe" }}
                      >
                        {compatCode}
                      </span>
                      <span className="text-[11px] font-medium text-[#575068] break-keep">
                        {compatInfo?.character.name ?? ""}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 맞지 않는 궁합 */}
            <div className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2.5">
              <h2 className="text-sm font-bold text-[#2e293a]">
                ⚡ 맞지 않는 궁합
              </h2>
              <p className="text-xs text-[#575068] leading-relaxed break-keep">
                {info.mismatchReason}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {info.mismatchTypes.map((mismatchCode) => {
                  const mismatchInfo = getMbtiTypeInfo(mismatchCode);
                  return (
                    <Link
                      key={mismatchCode}
                      href={`/result/${mismatchCode}`}
                      className="flex flex-col items-center justify-center rounded-2xl bg-slate-50/90 border border-slate-100 p-2.5 text-center hover:scale-[1.02] transition-all"
                    >
                      <span
                        className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold text-[#2e293a]"
                        style={{
                          backgroundColor: mismatchInfo?.color ?? "#e2e8f0",
                        }}
                      >
                        {mismatchCode}
                      </span>
                      <span className="text-[11px] font-medium text-[#575068] break-keep">
                        {mismatchInfo?.character.name ?? ""}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 모바일용에서는 여기에 액션 버튼을 배치합니다 */}
          {!isPc && (
            <section className="flex items-start gap-3 pt-1">
              <Link
                href="/test"
                className="flex-1 inline-flex items-center justify-center rounded-2xl bg-white border border-purple-100 px-5 py-4 text-base font-bold text-[#2e293a] shadow-[0_6px_18px_rgba(140,120,180,0.08)] hover:bg-purple-50/70 active:scale-[0.99] transition-all"
              >
                다시 검사하기
              </Link>
              <ShareResultButton />
            </section>
          )}

          {/* 8) 마지막 영역: 해당 유형에 맞는 성향 일러스트 */}
          <section className="rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2">
            <h2 className="text-sm sm:text-base font-bold text-[#2e293a] px-1">
              🎨 {info.code} 성향 한눈에 보기
            </h2>
            <div
              className={`overflow-hidden rounded-2xl border border-purple-100/70 bg-white ${
                isPc ? "max-w-[360px] mx-auto" : ""
              }`}
            >
              <Image
                src={`/images/types/${info.code}.jpg`}
                alt={`${info.code} 성향 일러스트`}
                width={720}
                height={540}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-center text-sm font-bold text-[#3f3850] pt-0.5">
              {illustrationCaption}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
