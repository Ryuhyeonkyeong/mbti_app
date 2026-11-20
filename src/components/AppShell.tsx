"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

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

// 모든 페이지의 공통 틀(헤더, PC/모바일 전환 버튼, 로그인/로그아웃, 본문 폭 제어)을 담당합니다
export default function AppShell({ children }: { children: ReactNode }) {
  // 기본값은 휴대폰 기준(모바일용)으로 시작하며, 상단 버튼으로 PC용과 전환할 수 있습니다
  const [viewMode, setViewMode] = useState<ViewMode>("mobile");
  const isPc = viewMode === "pc";

  // 현재 로그인 상태와 로그아웃 함수를 가져옵니다
  const { user, loading, signOut } = useAuth();

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      <div
        className={`w-full min-h-screen flex flex-col bg-white/75 backdrop-blur-sm shadow-[0_12px_40px_rgba(140,120,180,0.12)] sm:my-4 sm:min-h-[calc(100vh-2rem)] sm:rounded-[32px] border border-white/80 overflow-hidden transition-all duration-300 ${
          isPc ? "max-w-[1080px]" : "max-w-[480px]"
        }`}
      >
        {/* 모든 페이지 상단에 공통으로 보이는 헤더입니다 (375px 휴대폰에서도 넘치지 않게 배치) */}
        <header className="flex flex-wrap items-center justify-between gap-1.5 px-3 sm:px-4 py-3 bg-white/85 border-b border-purple-100/80">
          {/* 왼쪽: 서비스 이름 (누르면 첫 화면으로 이동) */}
          <Link
            href="/"
            className="text-sm sm:text-lg font-bold tracking-tight text-purple-700 hover:text-purple-500 transition-colors whitespace-nowrap shrink-0"
          >
            Tina&apos; MBTI
          </Link>

          {/* 오른쪽: PC용/모바일용 선택 + 유형 도감 + 통계 + 로그인/로그아웃 */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <div
              role="group"
              aria-label="화면 보기 모드 선택"
              className="inline-flex items-center rounded-full bg-purple-50 p-0.5 border border-purple-100"
            >
              <button
                type="button"
                onClick={() => setViewMode("pc")}
                aria-pressed={isPc}
                className={`rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isPc
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-purple-700 hover:bg-purple-100/70"
                }`}
              >
                PC
              </button>
              <button
                type="button"
                onClick={() => setViewMode("mobile")}
                aria-pressed={!isPc}
                className={`rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  !isPc
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-purple-700 hover:bg-purple-100/70"
                }`}
              >
                모바일
              </button>
            </div>

            <nav aria-label="주요 메뉴" className="flex items-center gap-1 sm:gap-1.5">
              <Link
                href="/types"
                className="inline-flex items-center rounded-full bg-purple-50 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors whitespace-nowrap"
              >
                유형 도감
              </Link>

              <Link
                href="/stats"
                className="inline-flex items-center rounded-full bg-purple-50 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors whitespace-nowrap"
              >
                통계
              </Link>

              {/* 로그인 상태를 확인하는 동안은 자리를 비워 두어 메뉴 깜빡임을 막습니다 */}
              {loading ? (
                <span className="inline-block w-[44px] sm:w-[52px]" aria-hidden="true" />
              ) : user ? (
                <>
                  <Link
                    href="/mypage"
                    className="inline-flex items-center rounded-full bg-purple-50 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors whitespace-nowrap"
                  >
                    마이페이지
                  </Link>
                  <button
                    type="button"
                    onClick={() => void signOut()}
                    className="inline-flex items-center rounded-full bg-pink-50 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-pink-700 hover:bg-pink-100 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center rounded-full bg-purple-600 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-bold text-white hover:bg-purple-500 transition-colors whitespace-nowrap"
                >
                  로그인
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* 각 페이지의 본문이 들어가는 영역입니다 */}
        <main className="flex-1 flex flex-col px-5 py-7">{children}</main>
      </div>
    </ViewModeContext.Provider>
  );
}
