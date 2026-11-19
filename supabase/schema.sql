-- ============================================================
-- Tina' MBTI 검사 결과 저장 테이블(test_results) 생성 SQL
-- 같은 SQL을 여러 번 실행해도 오류가 나지 않도록 작성되었습니다.
-- ============================================================

-- 1. 검사 결과를 저장할 test_results 테이블을 만듭니다 (이미 있으면 건너뜁니다)
create table if not exists public.test_results (
  -- 자동으로 1씩 늘어나는 고유 번호이자 기본 키(Primary Key)입니다
  id bigint generated always as identity primary key,

  -- 결과를 저장한 회원의 ID입니다
  -- auth.users 테이블의 id를 참조하며, 회원이 탈퇴(삭제)되면 결과도 함께 삭제됩니다
  -- 앱에서 따로 보내지 않아도 로그인한 회원의 ID(auth.uid())가 자동으로 들어갑니다
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),

  -- 4글자 MBTI 유형 코드입니다 (E/I, S/N, T/F, J/P 조합만 저장할 수 있습니다)
  mbti_type text not null check (mbti_type ~ '^[EI][SN][TF][JP]$'),

  -- 결과가 저장된 날짜와 시간입니다 (따로 넣지 않으면 현재 시각이 들어갑니다)
  created_at timestamptz not null default now()
);

-- 2. 내 검사 기록을 최신순으로 빠르게 찾기 위한 인덱스(색인)를 만듭니다
create index if not exists idx_test_results_user_id_created_at
  on public.test_results (user_id, created_at desc);

-- 3. 테이블 접근 권한(GRANT)을 설정합니다
-- 로그인하지 않은 방문자(anon)에게는 아무 권한도 주지 않습니다
revoke all on table public.test_results from anon;

-- 로그인한 회원(authenticated)에게만 조회(select), 저장(insert), 삭제(delete) 권한을 줍니다
grant select, insert, delete on table public.test_results to authenticated;

-- 4. 행 수준 보안(RLS: Row Level Security)을 켭니다
-- 이 설정이 켜져 있어야 회원마다 자기 데이터만 볼 수 있게 막을 수 있습니다
alter table public.test_results enable row level security;

-- 5. RLS 정책 3개를 만듭니다 (기존 정책이 있으면 먼저 지우고 새로 만들어 중복 오류를 방지합니다)

-- 정책 1: 로그인한 회원은 자기 결과만 조회(SELECT)할 수 있습니다
drop policy if exists "본인 결과만 조회 가능" on public.test_results;
create policy "본인 결과만 조회 가능"
  on public.test_results
  for select
  to authenticated
  using (auth.uid() = user_id);

-- 정책 2: 로그인한 회원은 자기 이름(user_id)으로만 결과를 저장(INSERT)할 수 있습니다
drop policy if exists "본인 이름으로만 저장 가능" on public.test_results;
create policy "본인 이름으로만 저장 가능"
  on public.test_results
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- 정책 3: 로그인한 회원은 자기 결과만 삭제(DELETE)할 수 있습니다
drop policy if exists "본인 결과만 삭제 가능" on public.test_results;
create policy "본인 결과만 삭제 가능"
  on public.test_results
  for delete
  to authenticated
  using (auth.uid() = user_id);
