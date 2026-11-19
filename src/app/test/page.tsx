"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, type MbtiTrait } from "@/data/questions";
import { calculateMbti } from "@/lib/mbti";

export default function TestPage() {
  const router = useRouter();

  // 현재 화면에 보여줄 문항의 순서 번호 (0부터 시작)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 각 문항에서 사용자가 고른 성향 글자를 저장하는 배열
  const [answers, setAnswers] = useState<(MbtiTrait | undefined)[]>(() =>
    Array(QUESTIONS.length).fill(undefined)
  );

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // 선택지 버튼을 눌렀을 때 실행되는 함수입니다
  const handleSelectOption = (trait: MbtiTrait) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = trait;
    setAnswers(nextAnswers);

    // 마지막 문항이라면 유형을 계산해서 결과 페이지로 이동합니다
    if (currentIndex === totalQuestions - 1) {
      const completedTraits = nextAnswers.filter(
        (item): item is MbtiTrait => item !== undefined
      );
      const mbtiType = calculateMbti(completedTraits);
      router.push(`/result/${mbtiType}`);
      return;
    }

    // 다음 문항으로 바로 넘어갑니다
    setCurrentIndex((prev) => prev + 1);
  };

  // 이전 버튼을 눌렀을 때 앞 문항으로 돌아갑니다
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between gap-6">
      {/* 위쪽 진행 상황 표시 영역 (숫자 + 진행 막대) */}
      <section aria-label="진행 상황" className="space-y-2.5">
        <div className="flex items-center justify-between text-sm font-medium text-[#665f75]">
          <span className="inline-flex items-center rounded-full bg-purple-100/80 px-3 py-0.5 text-xs font-bold text-purple-700">
            질문 {currentIndex + 1}
          </span>
          <span className="font-bold text-purple-700">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* 진행 막대 */}
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-purple-100/80"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* 가운데 질문과 2개 선택지 버튼 영역 */}
      <section className="flex-1 flex flex-col justify-center gap-6 py-2">
        <div className="rounded-3xl bg-purple-50/60 border border-purple-100/80 p-6 shadow-[0_8px_24px_rgba(140,120,180,0.08)]">
          <h1 className="text-xl font-bold leading-relaxed text-[#2e293a] text-center break-keep">
            {currentQuestion.question}
          </h1>
        </div>

        {/* 큼직한 선택지 버튼 2개 */}
        <div className="flex flex-col gap-3.5">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentIndex] === option.trait;

            return (
              <button
                key={option.trait}
                type="button"
                onClick={() => handleSelectOption(option.trait)}
                className={`w-full min-h-[76px] rounded-2xl border px-5 py-4 text-left text-base font-medium leading-relaxed break-keep transition-all active:scale-[0.99] cursor-pointer shadow-[0_6px_18px_rgba(140,120,180,0.08)] ${
                  isSelected
                    ? "border-purple-400 bg-purple-100/90 text-purple-900"
                    : "border-purple-100 bg-white text-[#2e293a] hover:border-purple-300 hover:bg-purple-50/70"
                }`}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </section>

      {/* 아래쪽 이전 버튼 영역 (첫 질문에서는 숨깁니다) */}
      <div className="min-h-[48px] flex items-center">
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center justify-center rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium text-[#665f75] hover:bg-gray-200 active:scale-[0.99] transition-all cursor-pointer"
          >
            ← 이전
          </button>
        )}
      </div>
    </div>
  );
}
