import Link from "next/link";

// 없는 주소로 들어왔을 때 서비스 분위기에 맞게 안내해 주는 404 페이지입니다
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8">
      <div className="rounded-3xl bg-purple-50/80 border border-purple-100 px-8 py-9 shadow-[0_10px_28px_rgba(140,120,180,0.12)] space-y-3 max-w-[360px] w-full">
        <p className="text-4xl">🐾</p>
        <p className="text-xs font-bold tracking-widest text-purple-600">
          404 NOT FOUND
        </p>
        <h1 className="text-xl font-bold text-[#2e293a]">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-sm text-[#665f75] leading-relaxed break-keep">
          주소가 잘못되었거나 사라진 페이지예요.
          <br />
          아래 버튼을 눌러 홈이나 유형 도감으로 이동해 보세요.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[320px]">
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(168,85,247,0.24)] hover:opacity-95 transition-all"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href="/types"
          className="flex-1 inline-flex items-center justify-center rounded-2xl bg-white border border-purple-100 px-5 py-3.5 text-sm font-bold text-[#2e293a] shadow-sm hover:bg-purple-50/70 transition-all"
        >
          유형 도감 보기
        </Link>
      </div>
    </div>
  );
}
