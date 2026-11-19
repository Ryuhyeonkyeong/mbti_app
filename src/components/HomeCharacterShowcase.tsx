"use client";

import { useEffect, useState } from "react";
import { MBTI_TYPES, type MbtiTypeCode } from "@/data/types";
import CharacterViewer from "./CharacterViewer";

// 첫 화면에서 순서대로 보여줄 16가지 유형 코드 목록입니다
const TYPE_CODES = Object.keys(MBTI_TYPES) as MbtiTypeCode[];

// 첫 화면에서 3초마다 다른 유형의 3D 캐릭터를 보여주는 컴포넌트입니다
export default function HomeCharacterShowcase() {
  const [index, setIndex] = useState(0);

  // 3초마다 다음 유형 캐릭터로 바뀝니다
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TYPE_CODES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentCode = TYPE_CODES[index];
  const currentInfo = MBTI_TYPES[currentCode];

  return (
    <div className="w-full rounded-3xl bg-white/65 border border-white/90 p-3 shadow-[0_8px_24px_rgba(120,160,150,0.12)] flex flex-col items-center">
      <CharacterViewer typeCode={currentCode} heightClass="h-56" />
      <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold text-[#2e293a] shadow-sm">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: currentInfo.color }}
        />
        {currentInfo.code} · {currentInfo.character.name}
      </span>
    </div>
  );
}
