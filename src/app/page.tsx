import Link from "next/link";

// 첫 화면에 보여줄 3가지 특징 카드 데이터입니다
const FEATURES = [
  {
    emoji: "⏱️",
    title: "20문항 · 2분",
    description: "부담 없이 빠르게 답할 수 있는 간단한 질문",
    bgClass: "bg-pink-50/90 border-pink-100",
  },
  {
    emoji: "🧩",
    title: "16가지 유형",
    description: "내 성향에 딱 맞는 16가지 성격 유형 분석",
    bgClass: "bg-sky-50/90 border-sky-100",
  },
  {
    emoji: "🐾",
    title: "유형별 3D 캐릭터",
    description: "유형마다 닮은 귀여운 3D 동물 친구 공개",
    bgClass: "bg-emerald-50/90 border-emerald-100",
  },
];

export default function Home() {
  return (
    /* 첫 화면 전체 영역에 연한 민트색 계열 배경을 적용합니다 */
    <div className="flex-1 flex flex-col justify-between gap-8 -mx-5 -my-7 px-5 py-7 bg-gradient-to-b from-[#e7fbf2] via-[#f1fdf8] to-[#e0f7ed]">
      {/* 상단 인사 및 검사 시작 버튼 영역 */}
      <section className="flex flex-col items-center text-center pt-4 gap-5">
        {/* 파스텔 배지 */}
        <span className="inline-flex items-center rounded-full bg-purple-100/80 px-3.5 py-1 text-xs font-medium text-purple-700">
          ✨ 나만의 성격 유형 찾기
        </span>

        {/* 큰 제목과 한 줄 소개 문구 */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-[#2e293a] leading-snug">
            나는 어떤 유형일까?
          </h1>
          <p className="text-sm sm:text-base text-[#665f75] leading-relaxed">
            가벼운 질문에 답하고 나의 성격 유형과
            <br />
            어울리는 3D 동물 캐릭터를 만나보세요.
          </p>
        </div>

        {/* 큼직한 검사 시작 버튼 (/test 페이지로 이동) */}
        <Link
          href="/test"
          className="w-full mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-8 py-5 text-lg font-bold text-white shadow-[0_12px_28px_rgba(168,85,247,0.3)] hover:opacity-95 active:scale-[0.99] transition-all"
        >
          검사 시작하기
        </Link>
      </section>

      {/* 서비스 특징을 소개하는 카드 3개 영역 */}
      <section aria-label="서비스 특징" className="grid grid-cols-1 gap-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className={`flex items-center gap-4 rounded-2xl border p-4 shadow-[0_6px_18px_rgba(140,120,180,0.08)] ${feature.bgClass}`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
              {feature.emoji}
            </div>
            <div className="text-left">
              <h2 className="text-base font-bold text-[#2e293a]">
                {feature.title}
              </h2>
              <p className="text-xs text-[#665f75] mt-0.5">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 맨 아래 작은 안내 문구 */}
      <footer className="pt-2 pb-1 text-center">
        <p className="text-xs text-[#8d859c] leading-relaxed">
          이 검사는 재미로 보는 간이 검사이며, 공식 MBTI® 검사가 아닙니다.
        </p>
      </footer>
    </div>
  );
}
