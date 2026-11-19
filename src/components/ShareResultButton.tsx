"use client";

import { useState } from "react";

// 현재 결과 페이지 주소를 복사하고 안내 문구를 띄우는 공유 버튼 컴포넌트입니다
export default function ShareResultButton() {
  // 복사 완료 안내 문구 표시 여부
  const [copied, setCopied] = useState(false);

  // 공유 버튼을 눌렀을 때 현재 주소를 클립보드에 복사합니다
  const handleShare = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // 클립보드 API가 제한된 환경에서도 복사가 되도록 임시 입력창을 사용합니다
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col items-center">
      <button
        type="button"
        onClick={handleShare}
        className="w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-5 py-4 text-base font-bold text-white shadow-[0_10px_24px_rgba(168,85,247,0.25)] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
      >
        결과 공유하기
      </button>

      {/* 복사 성공 안내 문구 */}
      {copied && (
        <p
          role="status"
          className="mt-2 text-xs font-medium text-purple-700"
        >
          주소를 복사했어요
        </p>
      )}
    </div>
  );
}
