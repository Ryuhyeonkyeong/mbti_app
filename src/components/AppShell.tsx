"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Link from "next/link";

// 화면 보기 모드 타입 (모바일용 세로 배치 / PC용 가로 배치)
export type ViewMode = "mobile" | "pc";

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue>({
  viewMode: "mobile",
  setViewMode: () => {},
});

// 하위 페이지에서 현재 선택된 보기 모드(PC용 / 모바일용)를 읽을 수 있는 훅입니다
export function useViewMode() {
  return useContext(ViewModeContext);
}

// 모든 페이지의 공통 틀(헤더, PC/모바일 전환 버튼, 본문 폭 제어)을 담당합니다
export default function AppShell({ children }: { children: ReactNode }) {
  // 기본값은 휴대폰 기준(모바일용)으로 시작하며, 상단 버튼으로 PC용과 전환할 수 있습니다
  const [viewMode, setViewMode] = useState<ViewMode>("mobile");
  const isPc = viewMode === "pc";

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      <div
        className={`w-full min-h-screen flex flex-col bg-white/75 backdrop-blur-sm shadow-[0_12px_40px_rgba(140,120,180,0.12)] sm:my-4 sm:min-h-[calc(100vh-2rem)] sm:rounded-[32px] border border-white/80 overflow-hidden transition-all duration-300 ${
          isPc ? "max-w-[1080px]" : "max-w-[480px]"
        }`}
      >
        {/* 모든 페이지 상단에 공통으로 보이는 헤더입니다 */}
        <header className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-white/85 border-b border-purple-100/80">
          {/* 왼쪽: 서비스 이름 (누르면 첫 화면으로 이동) */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-purple-700 hover:text-purple-500 transition-colors"
          >
            Tina&apos; MBTI
          </Link>

          {/* 오른쪽: PC용 / 모바일용 선택 토글 + 유형 도감 메뉴 */}
          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="화면 보기 모드 선택"
              className="inline-flex items-center rounded-full bg-purple-50 p-0.5 border border-purple-100"
            >
              <button
                type="button"
                onClick={() => setViewMode("pc")}
                aria-pressed={isPc}
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  isPc
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-purple-700 hover:bg-purple-100/70"
                }`}
              >
                PC용
              </button>
              <button
                type="button"
                onClick={() => setViewMode("mobile")}
                aria-pressed={!isPc}
                className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  !isPc
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-purple-700 hover:bg-purple-100/70"
                }`}
              >
                모바일용
              </button>
            </div>

            <nav aria-label="주요 메뉴">
              <Link
                href="/types"
                className="inline-flex items-center rounded-full bg-purple-50 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
              >
                유형 도감
              </Link>
            </nav>
          </div>
        </header>

        {/* 각 페이지의 본문이 들어가는 영역입니다 */}
        <main className="flex-1 flex flex-col px-5 py-7">{children}</main>
      </div>
    </ViewModeContext.Provider>
  );
}
