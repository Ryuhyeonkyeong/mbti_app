"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getKoreanAuthErrorMessage } from "@/lib/authError";

// 이메일 + 비밀번호 방식 회원가입 페이지입니다
export default function SignupPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  // 회원가입 폼 제출 시 실행되는 함수입니다
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setInfoMessage("");

    const trimmedNickname = nickname.trim();
    const trimmedEmail = email.trim();

    // 입력값 기본 검증
    if (!trimmedNickname) {
      setErrorMessage("닉네임을 입력해 주세요.");
      return;
    }
    if (!trimmedEmail) {
      setErrorMessage("이메일을 입력해 주세요.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("비밀번호는 6자 이상이어야 해요.");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호 확인이 서로 달라요.");
      return;
    }

    setSubmitting(true);

    try {
      // 닉네임은 사용자 메타데이터(user_metadata.nickname)에 함께 저장합니다
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            nickname: trimmedNickname,
          },
        },
      });

      if (error) {
        setErrorMessage(getKoreanAuthErrorMessage(error));
        return;
      }

      // 이메일 인증이 꺼져 있어 바로 로그인 세션이 생기면 홈으로 이동합니다
      if (data.session) {
        router.push("/");
        return;
      }

      // 이메일 인증이 켜져 있어 바로 로그인되지 않은 경우 안내 문구를 보여줍니다
      setInfoMessage(
        "가입 확인 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto py-4">
      <div className="rounded-3xl bg-white/90 border border-white p-6 shadow-[0_10px_28px_rgba(140,120,180,0.12)] space-y-5">
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-bold text-[#2e293a]">회원가입</h1>
          <p className="text-xs sm:text-sm text-[#665f75]">
            검사 결과를 저장하고 마이페이지에서 다시 볼 수 있어요.
          </p>
        </div>

        {/* 이메일 인증 안내 메시지 */}
        {infoMessage ? (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center space-y-3">
            <p className="text-sm font-medium text-emerald-800 leading-relaxed break-keep">
              {infoMessage}
            </p>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors"
            >
              로그인 화면으로 가기
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="signup-nickname"
                className="block text-xs font-bold text-[#3f3850]"
              >
                닉네임
              </label>
              <input
                id="signup-nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="사용할 닉네임을 입력해 주세요"
                required
                className="w-full rounded-2xl border border-purple-100 bg-purple-50/40 px-4 py-3 text-sm text-[#2e293a] outline-none focus:border-purple-400 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="signup-email"
                className="block text-xs font-bold text-[#3f3850]"
              >
                이메일
              </label>
              <input
                id="signup-email"
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
                htmlFor="signup-password"
                className="block text-xs font-bold text-[#3f3850]"
              >
                비밀번호 (6자 이상)
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6자 이상 입력해 주세요"
                required
                className="w-full rounded-2xl border border-purple-100 bg-purple-50/40 px-4 py-3 text-sm text-[#2e293a] outline-none focus:border-purple-400 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="signup-password-confirm"
                className="block text-xs font-bold text-[#3f3850]"
              >
                비밀번호 확인
              </label>
              <input
                id="signup-password-confirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호를 한 번 더 입력해 주세요"
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
              {submitting ? "처리 중..." : "가입하기"}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-[#665f75] pt-1">
          이미 회원이신가요?{" "}
          <Link
            href="/login"
            className="font-bold text-purple-700 hover:underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
