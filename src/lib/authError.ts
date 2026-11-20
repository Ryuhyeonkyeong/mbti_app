// Supabase Auth 오류 메시지를 초보자도 이해하기 쉬운 한국어로 바꿔주는 함수입니다
export function getKoreanAuthErrorMessage(
  error: { message?: string } | null
): string {
  const msg = (error?.message ?? "").toLowerCase();

  if (msg.includes("already registered") || msg.includes("already exists")) {
    return "이미 가입된 이메일이에요.";
  }
  if (msg.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 틀렸어요.";
  }
  if (msg.includes("email not confirmed")) {
    return "이메일 인증이 완료되지 않았어요. 메일의 확인 링크를 먼저 눌러주세요.";
  }
  if (
    msg.includes("password should be at least") ||
    msg.includes("weak_password") ||
    msg.includes("6 characters")
  ) {
    return "비밀번호는 6자 이상이어야 해요.";
  }
  if (
    msg.includes("unable to validate email") ||
    msg.includes("invalid email")
  ) {
    return "올바른 이메일 주소를 입력해 주세요.";
  }

  return "요청을 처리하는 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.";
}
