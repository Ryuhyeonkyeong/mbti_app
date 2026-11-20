"use client";

import { useState } from "react";
import Link from "next/link";
import { MBTI_TYPES, type MbtiTypeCode } from "@/data/types";
import CharacterViewer from "./CharacterViewer";
import { useViewMode } from "./AppShell";

// 4줄 4칸으로 나열할 16가지 유형 코드 순서입니다
const TYPE_CODES = Object.keys(MBTI_TYPES) as MbtiTypeCode[];

// 유형 도감 화면의 전체 동작(유형 선택, 3D 캐릭터 표시, 자세히 보기 이동)을 담당합니다
export default function TypesCatalog() {
  const { viewMode } = useViewMode();
  const isPc = viewMode === "pc";

  // 현재 선택된 유형 코드 (기본값은 ENFP)
  const [selectedType, setSelectedType] = useState<MbtiTypeCode>("ENFP");
  const info = MBTI_TYPES[selectedType];

  return (
    <div
      className={
        isPc
          ? "flex-1 grid grid-cols-12 gap-6 items-start"
          : "flex-1 flex flex-col gap-5"
      }
    >
      {/* 1. 위쪽(또는 PC 왼쪽): 선택한 유형의 3D 캐릭터 (캔버스 1개만 사용) */}
      <section
        aria-label="선택한 유형 3D 캐릭터"
        className={`rounded-3xl border border-white p-3 shadow-[0_10px_28px_rgba(140,120,180,0.12)] transition-colors duration-300 ${
          isPc ? "col-span-5" : ""
        }`}
        style={{
          background: `linear-gradient(180deg, ${info.color}88 0%, #ffffffcc 100%)`,
        }}
      >
        <CharacterViewer typeCode={selectedType} showDownload />
        <p className="text-center text-xs text-[#665f75] pt-2 pb-1">
          돌려 보거나 캐릭터를 눌러 보세요!
        </p>
      </section>

      {/* 오른쪽(또는 모바일 아래쪽): 유형 정보 + 16개 유형 선택 버튼 */}
      <div className={`flex flex-col gap-5 ${isPc ? "col-span-7" : ""}`}>
        {/* 2. 캐릭터 이름, 유형 코드, 별명, 한 줄 소개, 자세히 보기 버튼 */}
        <section className="rounded-3xl bg-white/90 border border-white p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-[#2e293a]"
              style={{ backgroundColor: info.color }}
            >
              {info.code}
            </span>
            <h1 className="text-lg font-bold text-[#2e293a]">
              {info.character.name}
            </h1>
          </div>

          <p className="text-sm font-bold text-purple-700">{info.nickname}</p>

          <p className="text-xs sm:text-sm text-[#575068] leading-relaxed break-keep">
            {info.summary}
          </p>

          <div className="pt-1">
            <Link
              href={`/result/${selectedType}`}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(168,85,247,0.24)] hover:opacity-95 active:scale-[0.99] transition-all"
            >
              자세히 보기
            </Link>
          </div>
        </section>

        {/* 3. 16개 유형 버튼 (4줄 4칸) */}
        <section aria-label="16가지 유형 선택" className="pb-1">
          <div className="grid grid-cols-4 gap-2">
            {TYPE_CODES.map((code) => {
              const isSelected = code === selectedType;
              const itemColor = MBTI_TYPES[code].color;

              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setSelectedType(code)}
                  className={`rounded-2xl py-3 text-xs font-bold transition-all cursor-pointer active:scale-[0.97] ${
                    isSelected
                      ? "text-[#2e293a] ring-2 ring-purple-500 shadow-md"
                      : "bg-white/90 text-[#575068] border border-purple-100/80 hover:bg-purple-50/80"
                  }`}
                  style={isSelected ? { backgroundColor: itemColor } : undefined}
                >
                  {code}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
