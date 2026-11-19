import { Suspense } from "react";
import Link from "next/link";
import { getMbtiTypeInfo } from "@/data/types";
import ShareResultButton from "@/components/ShareResultButton";
import CharacterViewer from "@/components/CharacterViewer";

// params에서 유형 코드를 읽어 실제 결과 화면을 그려 주는 컴포넌트입니다
async function ResultContent({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  // 소문자(예: enfp)로 들어와도 대문자로 변환해 데이터를 찾습니다
  const info = getMbtiTypeInfo(type);

  // 16가지 유형에 없는 코드일 때 안내 화면을 보여줍니다
  if (!info) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8">
        <div className="rounded-3xl bg-purple-50/80 border border-purple-100 px-8 py-8 shadow-[0_8px_24px_rgba(140,120,180,0.1)] space-y-2">
          <p className="text-3xl">🤔</p>
          <h1 className="text-xl font-bold text-[#2e293a]">없는 유형이에요</h1>
          <p className="text-sm text-[#665f75]">
            입력하신 성격 유형 정보를 찾을 수 없습니다.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-7 py-4 text-base font-bold text-white shadow-[0_10px_24px_rgba(168,85,247,0.25)] hover:opacity-95 transition-all"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    /* 유형의 대표 색상이 페이지 전체에 은은하게 퍼지도록 배경 그라데이션을 적용합니다 */
    <div
      className="flex-1 flex flex-col gap-6 -mx-5 -my-7 px-5 py-7"
      style={{
        background: `linear-gradient(180deg, ${info.color}66 0%, #ffffff 42%, ${info.color}40 100%)`,
      }}
    >
      {/* 1) "당신의 유형은" 문구, 유형 코드(크게), 별명 */}
      <section className="text-center space-y-2 pt-2">
        <p className="text-sm font-medium text-[#665f75]">당신의 유형은</p>
        <h1 className="text-5xl font-bold tracking-widest text-[#2e293a]">
          {info.code}
        </h1>
        <p className="inline-block rounded-full bg-white/85 px-4 py-1.5 text-sm font-bold text-[#3f3850] shadow-sm">
          {info.nickname}
        </p>
      </section>

      {/* 2) 캐릭터 자리: 해당 유형의 3D 동물 캐릭터를 보여줍니다 */}
      <section aria-label="유형 캐릭터">
        <div
          className="flex flex-col items-center justify-center rounded-3xl border border-white/80 p-3 shadow-[0_10px_26px_rgba(140,120,180,0.12)]"
          style={{ backgroundColor: `${info.color}cc` }}
        >
          <CharacterViewer typeCode={info.code} showDownload />
          <span className="mt-1 rounded-full bg-white/85 px-4 py-1 text-xs font-bold text-[#2e293a] shadow-sm">
            {info.character.name} ({info.character.animal})
          </span>
        </div>
      </section>

      {/* 3) 한 줄 소개와 성격 설명 */}
      <section className="rounded-3xl bg-white/90 border border-white p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-3">
        <p className="text-base font-bold text-[#2e293a] leading-snug break-keep">
          {info.summary}
        </p>
        <p className="text-sm text-[#575068] leading-relaxed break-keep">
          {info.description}
        </p>
      </section>

      {/* 4) 강점 목록, 조심할 점 목록 */}
      <section className="grid grid-cols-1 gap-3">
        {/* 강점 카드 */}
        <div className="rounded-3xl bg-white/90 border border-white p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2.5">
          <h2 className="text-base font-bold text-[#2e293a]">✨ 나의 강점</h2>
          <ul className="space-y-2 text-sm text-[#575068]">
            {info.strengths.map((item) => (
              <li key={item} className="flex items-start gap-2 leading-relaxed">
                <span className="text-purple-500 font-bold">•</span>
                <span className="break-keep">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 조심할 점 카드 */}
        <div className="rounded-3xl bg-white/90 border border-white p-5 shadow-[0_8px_22px_rgba(140,120,180,0.08)] space-y-2.5">
          <h2 className="text-base font-bold text-[#2e293a]">
            🌿 조심할 점
          </h2>
          <ul className="space-y-2 text-sm text-[#575068]">
            {info.cautions.map((item) => (
              <li key={item} className="flex items-start gap-2 leading-relaxed">
                <span className="text-pink-400 font-bold">•</span>
                <span className="break-keep">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5) 잘 맞는 유형 2개: 누르면 해당 유형의 결과 페이지로 이동 */}
      <section className="space-y-2.5">
        <h2 className="text-base font-bold text-[#2e293a] px-1">
          💞 잘 맞는 유형
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {info.compatibleTypes.map((compatCode) => {
            const compatInfo = getMbtiTypeInfo(compatCode);
            return (
              <Link
                key={compatCode}
                href={`/result/${compatCode}`}
                className="flex flex-col items-center justify-center rounded-2xl bg-white/90 border border-white p-4 text-center shadow-[0_6px_18px_rgba(140,120,180,0.08)] hover:scale-[1.02] active:scale-[0.99] transition-all"
              >
                <span
                  className="mb-1.5 inline-block rounded-full px-3 py-0.5 text-xs font-bold text-[#2e293a]"
                  style={{ backgroundColor: compatInfo?.color ?? "#ede9fe" }}
                >
                  {compatCode}
                </span>
                <span className="text-xs font-medium text-[#575068] break-keep">
                  {compatInfo?.character.name ?? ""}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6) 하단 버튼 2개: "다시 검사하기"와 "결과 공유하기" */}
      <section className="flex items-start gap-3 pt-1 pb-2">
        <Link
          href="/test"
          className="flex-1 inline-flex items-center justify-center rounded-2xl bg-white border border-purple-100 px-5 py-4 text-base font-bold text-[#2e293a] shadow-[0_6px_18px_rgba(140,120,180,0.08)] hover:bg-purple-50/70 active:scale-[0.99] transition-all"
        >
          다시 검사하기
        </Link>

        <ShareResultButton />
      </section>
    </div>
  );
}

// MBTI 검사 결과 페이지
export default function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-sm text-[#665f75]">
          결과를 불러오는 중...
        </div>
      }
    >
      <ResultContent params={params} />
    </Suspense>
  );
}
