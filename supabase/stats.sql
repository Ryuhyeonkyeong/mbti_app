-- ============================================================
-- Tina' MBTI 유형별 통계 조회 함수(get_type_stats) 생성 SQL
-- 같은 SQL을 여러 번 실행해도 오류가 나지 않도록 작성되었습니다.
-- ============================================================

-- 1. 유형 코드별 저장 개수만 집계해서 돌려주는 함수를 만듭니다
-- security definer: 테이블 직접 조회 권한이 없는 방문자(anon) 대신 함수 작성자 권한으로 안전하게 집계만 수행합니다
-- set search_path = '': 외부 스키마 하이재킹을 막기 위해 검색 경로를 비워 둡니다
create or replace function public.get_type_stats()
returns table (
  mbti_type text,
  count bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    tr.mbti_type,
    count(*)::bigint as count
  from public.test_results as tr
  group by tr.mbti_type
  order by count desc, tr.mbti_type asc;
$$;

-- 2. 기본 공개(public) 실행 권한을 회수한 뒤, 방문자(anon)와 회원(authenticated)에게 실행 권한을 줍니다
revoke all on function public.get_type_stats() from public;
grant execute on function public.get_type_stats() to anon, authenticated;

-- 3. Supabase API(PostgREST)가 새 함수를 바로 인식하도록 스키마 캐시를 새로고침합니다
notify pgrst, 'reload schema';
