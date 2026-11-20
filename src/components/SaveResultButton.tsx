"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";
import type { MbtiTypeCode } from "@/data/types";

// 검사 결과를 Supabase test_results 테이블에 저장하는 버튼 컴포넌트입니다
export default function SaveResultButton({
  typeCode,
}: {
  typeCode: MbtiTypeCode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 저장 버튼을 눌렀을 때 실행됩니다
  const handleSave = async () => {
    if (saving || saved || loading) return;
    setErrorMessage("");

    // 로그아웃 상태라면 로그인 후 다시 이 결과 페이지로 돌아오도록 보냅니다
    if (!user) {
      router.push(`/login?next=/result/${typeCode}`);
      return;
    }

    setSaving(true);

    try {
      // user_id와 created_at은 DB 기본값으로 자동 저장되므로 mbti_type만 보냅니다
      const { error } = await supabase.from("test_results").insert({
        mbti_type: typeCode,
      });

      if (error) {
        if (error.code === "42501") {
          setErrorMessage(
            "저장 권한이 없어요. 다시 로그인한 뒤 시도해 주세요."
          );
        } else {
          setErrorMessage(
            "결과를 저장하지 못했어요. 잠시 후 다시 시도해 주세요."
          );
        }
        return;
      }

      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || saved || loading}
        className={`w-full inline-flex items-center justify-center rounded-2xl px-5 py-4 text-base font-bold transition-all ${
          saved
            ? "bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default"
            : "bg-purple-600 text-white shadow-[0_10px_24px_rgba(147,51,234,0.25)] hover:bg-purple-500 active:scale-[0.99] cursor-pointer disabled:opacity-60"
        }`}
      >
        {saving ? "저장 중..." : saved ? "저장했어요" : "내 기록에 저장"}
      </button>

      {errorMessage && (
        <p
          role="alert"
          className="mt-2 text-xs font-medium text-rose-700 text-center"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
