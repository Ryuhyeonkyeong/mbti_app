"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getKoreanAuthErrorMessage } from "@/lib/authError";

// 주소의 next 값을 읽어 안전한 내부 경로만 허용합니다
function getSafeNextPath(rawNext: string | null): string {
  if (!rawNext) return "/";
  if (rawNext.startsWith("/") && !rawNext.startsWith("//")) {
    return rawNext;
  }
  return "/";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 로그인 폼 제출 시 실행되는 함수입니다
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        setErrorMessage(getKoreanAuthErrorMessage(error));
        return;
      }

      // 로그인에 성공하면 next 주소(없으면 홈)로 이동합니다
      router.push(nextPath);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto py-4">
      <div className="rounded-3xl bg-white/90 border border-white p-6 shadow-[0_10px_28px_rgba(140,120,180,0.12)] space-y-5">
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-bold text-[#2e293a]">로그인</h1>
          <p className="text-xs sm:text-sm text-[#665f75]">
            저장한 검사 결과를 확인하려면 로그인해 주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="block text-xs font-bold text-[#3f3850]"
            >
              이메일
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              className="w-full rounded-2xl border border-purple-100 bg-purple-50/40 px-4 py-3 text-sm text-[#2e293a] outline-none focus:border-purple-400 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="block text-xs font-bold text-[#3f3850]"
            >
              비밀번호
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              required
              className="w-full rounded-2xl border border-purple-100 bg-purple-50/40 px-4 py-3 text-sm text-[#2e293a] outline-none focus:border-purple-400 focus:bg-white transition-all"
            />
          </div>

          {/* 오류 안내 문구 */}
          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-xs font-medium text-rose-700"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-5 py-4 text-base font-bold text-white shadow-[0_10px_24px_rgba(168,85,247,0.25)] hover:opacity-95 active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer"
          >
            {submitting ? "처리 중..." : "로그인"}
          </button>
        </form>

        <div className="text-center text-xs text-[#665f75] pt-1">
          아직 회원이 아니신가요?{" "}
          <Link
            href="/signup"
            className="font-bold text-purple-700 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

// 이메일 + 비밀번호 방식 로그인 페이지입니다
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-sm text-[#665f75]">
          불러오는 중...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
