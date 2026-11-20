"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { getMbtiTypeInfo, type MbtiTypeCode } from "@/data/types";
import CharacterViewer from "@/components/CharacterViewer";
import { useViewMode } from "@/components/AppShell";

// test_results 테이블에서 읽어온 내 검사 기록 1건의 타입입니다
interface TestResultRecord {
  id: number;
  mbti_type: string;
  created_at: string;
}

// 날짜 문자열을 "2026.11.17" 형식으로 바꿔줍니다
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

// 로그인한 회원이 자신의 저장된 검사 결과를 확인·삭제하는 마이페이지입니다
export default function MyPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { viewMode } = useViewMode();
  const isPc = viewMode === "pc";

  const [records, setRecords] = useState<TestResultRecord[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 로그아웃 상태면 로그인 페이지(?next=/mypage)로 보냅니다
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?next=/mypage");
    }
  }, [authLoading, user, router]);

  // 로그인된 회원의 검사 기록을 최신순으로 불러옵니다
  useEffect(() => {
    if (!user) return;
    let active = true;

    const loadRecords = async () => {
      setFetching(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("test_results")
        .select("id, mbti_type, created_at")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setErrorMessage("기록을 불러오는 중 문제가 발생했어요.");
      } else {
        setRecords((data as TestResultRecord[] | null) ?? []);
      }
      setFetching(false);
    };

    void loadRecords();

    return () => {
      active = false;
    };
  }, [user]);

  // 삭제 버튼을 눌렀을 때 확인 후 DB와 화면 목록에서 제거합니다
  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 이 기록을 삭제할까요?")) return;

    setDeletingId(id);
    const { error } = await supabase.from("test_results").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      setErrorMessage("기록을 삭제하지 못했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    setRecords((prev) => prev.filter((item) => item.id !== id));
  };

  if (authLoading || !user || fetching) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm font-medium text-[#665f75]">
        불러오는 중...
      </div>
    );
  }

  const nickname =
    (typeof user.user_metadata?.nickname === "string" &&
      user.user_metadata.nickname.trim()) ||
    "회원";

  const latestInfo =
    records.length > 0 ? getMbtiTypeInfo(records[0].mbti_type) : undefined;

  return (
    <div className="flex-1 flex flex-col gap-5">
      {/* 맨 위: "닉네임 님의 기록" 과 가입 이메일 */}
      <section className="rounded-3xl bg-purple-50/80 border border-purple-100 p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-[#2e293a]">
            {nickname} 님의 기록
          </h1>
          <p className="text-xs sm:text-sm text-[#665f75] mt-0.5">
            {user.email}
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">
          총 {records.length}개의 기록
        </span>
      </section>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs font-medium text-rose-700"
        >
          {errorMessage}
        </p>
      )}

      {/* 저장한 기록이 없을 때 */}
      {records.length === 0 ? (
        <section className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8">
          <div className="rounded-3xl bg-white/90 border border-white px-8 py-8 shadow-[0_8px_24px_rgba(140,120,180,0.1)] space-y-2">
            <p className="text-3xl">📝</p>
            <h2 className="text-lg font-bold text-[#2e293a]">
              아직 저장한 결과가 없어요
            </h2>
            <p className="text-sm text-[#665f75]">
              검사를 마치고 결과를 저장하면 여기에서 다시 볼 수 있어요.
            </p>
          </div>

          <Link
            href="/test"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-7 py-4 text-base font-bold text-white shadow-[0_10px_24px_rgba(168,85,247,0.25)] hover:opacity-95 transition-all"
          >
            검사하러 가기
          </Link>
        </section>
      ) : (
        <div
          className={
            isPc
              ? "grid grid-cols-12 gap-6 items-start"
              : "flex flex-col gap-5"
          }
        >
          {/* 가장 최근에 저장한 유형의 3D 캐릭터 */}
          {latestInfo && (
            <section
              aria-label="최근 저장 유형 캐릭터"
              className={`rounded-3xl border border-white p-4 shadow-[0_10px_26px_rgba(140,120,180,0.12)] flex flex-col items-center text-center gap-2 ${
                isPc ? "col-span-5" : ""
              }`}
              style={{
                background: `linear-gradient(180deg, ${latestInfo.color}88 0%, #ffffffcc 100%)`,
              }}
            >
              <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">
                최근 저장한 유형
              </span>
              <CharacterViewer
                typeCode={latestInfo.code as MbtiTypeCode}
                heightClass={isPc ? "h-60" : "h-64"}
              />
              <p className="text-lg font-bold text-[#2e293a]">
                {latestInfo.code} · {latestInfo.character.name}
              </p>
            </section>
          )}

          {/* 내 검사 기록 목록 (최신순) */}
          <section
            aria-label="내 검사 기록 목록"
            className={`rounded-3xl bg-white/90 border border-white p-4 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2.5 ${
              isPc ? "col-span-7" : ""
            }`}
          >
            <h2 className="text-base font-bold text-[#2e293a] px-1">
              📚 저장된 기록
            </h2>

            <ul className="space-y-2">
              {records.map((item) => {
                const info = getMbtiTypeInfo(item.mbti_type);
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-2xl border border-purple-100/80 bg-purple-50/30 px-3.5 py-3 hover:bg-purple-50/70 transition-colors"
                  >
                    <Link
                      href={`/result/${item.mbti_type}`}
                      className="flex-1 min-w-0 flex items-center gap-2.5"
                    >
                      <span className="text-xs text-[#665f75] shrink-0">
                        {formatDate(item.created_at)}
                      </span>
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold text-[#2e293a] shrink-0"
                        style={{ backgroundColor: info?.color ?? "#ede9fe" }}
                      >
                        {item.mbti_type}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#2e293a] truncate">
                        {info?.nickname ?? ""}
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => void handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="shrink-0 rounded-xl bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      {deletingId === item.id ? "삭제 중" : "삭제"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
