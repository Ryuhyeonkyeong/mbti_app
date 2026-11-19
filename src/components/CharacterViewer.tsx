"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type * as THREE from "three";
import type { MbtiTypeCode } from "@/data/types";
import { exportAnimatedCharacterGlb } from "@/lib/exportCharacter";

// 3D 캔버스는 브라우저에서만 그려지도록 서버 렌더링(SSR)에서 제외합니다
const CharacterScene = dynamic(() => import("./CharacterScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-[#665f75]">
      캐릭터 불러오는 중...
    </div>
  ),
});

// 선택한 유형의 3D 캐릭터를 감싸서 보여주는 뷰어 컴포넌트입니다
export default function CharacterViewer({
  typeCode,
  heightClass = "h-72",
  showDownload = false,
}: {
  typeCode: MbtiTypeCode;
  heightClass?: string;
  showDownload?: boolean;
}) {
  const exportRef = useRef<THREE.Group | null>(null);
  const [downloading, setDownloading] = useState(false);

  // 애니메이션이 포함된 3D GLB 파일을 내려받는 함수입니다
  const handleDownload = async () => {
    if (!exportRef.current || downloading) return;
    setDownloading(true);
    try {
      await exportAnimatedCharacterGlb(exportRef.current, typeCode);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className={`${heightClass} w-full touch-none`}>
        <CharacterScene typeCode={typeCode} exportRef={exportRef} />
      </div>

      {showDownload && (
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-purple-100 px-4 py-1.5 text-xs font-bold text-purple-700 shadow-sm hover:bg-purple-50 active:scale-[0.98] disabled:opacity-60 transition-all cursor-pointer"
        >
          <span>{downloading ? "만드는 중..." : "🎬 3D 캐릭터 다운로드 (.glb)"}</span>
        </button>
      )}
    </div>
  );
}
