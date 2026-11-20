// MBTI 8가지 성격 성향 글자 타입
export type MbtiTrait = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

// 4가지 성격 지표 구분 타입
export type MbtiDimension = "EI" | "SN" | "TF" | "JP";

// 각 문항의 선택지 1개를 나타내는 타입
export interface QuestionOption {
  /** 화면에 보여줄 선택지 문구 */
  text: string;
  /** 이 선택지를 골랐을 때 점수가 올라가는 성향 글자 */
  trait: MbtiTrait;
}

// 검사 문항 1개를 나타내는 타입
export interface Question {
  /** 문항 고유 번호 (1 ~ 80) */
  id: number;
  /** 이 문항이 측정하는 지표 */
  dimension: MbtiDimension;
  /** 일상·회사·연애 속 상황을 묻는 짧은 질문 */
  question: string;
  /** 두 가지 선택지 */
  options: [QuestionOption, QuestionOption];
}

// E/I 20문항 (일상, 회사, 연애 상황 포함)
const EI_QUESTIONS: Omit<Question, "id">[] = [
  {
    dimension: "EI",
    question: "주말에 약속이 갑자기 취소되었을 때 어떤 기분이 드나요?",
    options: [
      { text: "아쉬워서 다른 친구에게 연락해 새로운 약속을 잡아요", trait: "E" },
      { text: "오히려 좋아하며 집에서 혼자만의 휴식을 즐겨요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "회사에서 새로운 팀 프로젝트를 시작할 때 어떤 방식이 편한가요?",
    options: [
      { text: "여럿이 모여 바로 이야기를 나누며 아이디어를 모아요", trait: "E" },
      { text: "먼저 혼자 생각을 정리한 뒤에 의견을 공유해요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "연인과 데이트를 마치고 집에 돌아왔을 때 어떤 편인가요?",
    options: [
      { text: "아쉬운 마음에 자기 전까지 통화나 톡으로 더 이야기해요", trait: "E" },
      { text: "즐거웠던 여운을 느끼며 조용히 혼자만의 시간을 가져요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "낯선 사람들이 모인 소모임에 처음 갔을 때 나는 어떤 편인가요?",
    options: [
      { text: "먼저 말을 걸며 자연스럽게 분위기를 풀어가요", trait: "E" },
      { text: "먼저 다가와 주기를 기다리며 조용히 분위기를 살펴요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "회사 점심시간에 주로 어떻게 시간을 보내시나요?",
    options: [
      { text: "동료들과 같이 밥을 먹고 커피 마시며 수다를 떨어요", trait: "E" },
      { text: "혼자 산책하거나 이어폰을 끼고 조용히 쉬는 게 좋아요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "연인의 친한 친구들과 함께 만나는 자리에 초대받았다면 어떤가요?",
    options: [
      { text: "금방 어울려 농담도 주고받으며 즐거운 시간을 보내요", trait: "E" },
      { text: "예의 바르게 웃으며 듣지만 집에 오면 기가 좀 빠져요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "하루 종일 바쁘게 보낸 뒤 에너지를 채우는 나만의 방법은 무엇인가요?",
    options: [
      { text: "친한 사람들과 만나 오늘 있었던 일을 나누며 풀어요", trait: "E" },
      { text: "조용한 방에서 좋아하는 영상이나 음악을 보며 쉬어요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "직장에서 전체 회식이나 워크숍 소식을 들었을 때 어떤 생각이 드나요?",
    options: [
      { text: "평소 말 못 섞던 분들과도 친해질 기회라 은근 기대돼요", trait: "E" },
      { text: "언제 끝날지 시간부터 계산하며 벌써 피곤해져요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "연애할 때 내가 더 선호하는 연락 스타일은 어떤 쪽인가요?",
    options: [
      { text: "소소한 일상도 실시간으로 자주 연락하고 통화하는 게 좋아요", trait: "E" },
      { text: "각자 할 일에 집중하다가 여유 있을 때 차분히 연락해요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "카페에 자리를 잡을 때 주로 어떤 공간을 고르시나요?",
    options: [
      { text: "활기찬 분위기가 느껴지는 창가나 홀 가운데 자리가 좋아요", trait: "E" },
      { text: "사람 시선이 덜 닿는 구석진 자리나 조용한 층이 편해요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "회사에서 다른 부서 사람과 협업해야 할 때 어떻게 다가가나요?",
    options: [
      { text: "직접 자리로 찾아가거나 전화로 빠르게 이야기해요", trait: "E" },
      { text: "메신저나 이메일로 용건을 깔끔하게 정리해서 보내요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "좋아하는 사람이 생겼을 때 나의 행동은 어떤 편인가요?",
    options: [
      { text: "먼저 말을 걸고 약속을 잡으며 호감을 티 내는 편이에요", trait: "E" },
      { text: "주변을 맴돌며 상대의 반응을 조심스럽게 살피는 편이에요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "긴 연휴가 생겼을 때 가장 먼저 떠오르는 이상적인 계획은 무엇인가요?",
    options: [
      { text: "친구들이나 가족과 함께 여행을 떠나 북적북적 노는 거예요", trait: "E" },
      { text: "아무 약속 없이 집에서 푹 쉬며 취미 생활을 즐기는 거예요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "회의 중에 좋은 아이디어가 떠올랐을 때 어떻게 하나요?",
    options: [
      { text: "말하면서 생각을 키우는 편이라 바로 손을 들고 이야기해요", trait: "E" },
      { text: "머릿속으로 충분히 다듬은 뒤에 꼭 필요할 때만 말해요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "연인과 다툰 뒤 감정을 푸는 방식은 어떤 편인가요?",
    options: [
      { text: "바로 얼굴을 보거나 통화하면서 이야기를 나누고 풀어야 해요", trait: "E" },
      { text: "잠시 혼자 마음을 가라앉힐 시간을 가진 뒤에 대화하고 싶어요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "새로운 동네로 이사했을 때 가장 먼저 해보고 싶은 일은 무엇인가요?",
    options: [
      { text: "동네 맛집이나 핫플레이스를 돌아다니며 활기를 느껴봐요", trait: "E" },
      { text: "조용한 산책로나 나만 아는 아늑한 단골 가게를 찾아요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "회사에서 새로 입사한 후배가 들어왔을 때 어떻게 대하나요?",
    options: [
      { text: "먼저 다가가 말을 걸고 점심도 같이 먹자며 챙겨줘요", trait: "E" },
      { text: "질문하면 친절히 답해주지만 먼저 크게 다가가진 않아요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "연인과의 기념일에 어떤 데이트가 더 기억에 남나요?",
    options: [
      { text: "사람 많고 신나는 페스티벌이나 테마파크에서 노는 날이요", trait: "E" },
      { text: "둘만의 조용한 숙소나 아늑한 레스토랑에서 보내는 날이요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "고민이 생겼을 때 마음을 정리하는 나만의 방법은 무엇인가요?",
    options: [
      { text: "친한 지인에게 털어놓고 이야기하면서 해답을 찾아요", trait: "E" },
      { text: "일기를 쓰거나 혼자 산책하며 조용히 생각을 정리해요", trait: "I" },
    ],
  },
  {
    dimension: "EI",
    question: "퇴근 후 우연히 직장 동료를 지하철역에서 마주쳤다면 어떤가요?",
    options: [
      { text: "반갑게 인사하고 집 가는 길 내내 수다 떨며 함께 가요", trait: "E" },
      { text: "가볍게 인사만 나누고 각자 이어폰을 끼고 가는 게 편해요", trait: "I" },
    ],
  },
];

// S/N 20문항 (일상, 회사, 연애 상황 포함)
const SN_QUESTIONS: Omit<Question, "id">[] = [
  {
    dimension: "SN",
    question: "새로운 가전제품을 샀을 때 가장 먼저 하는 행동은 무엇인가요?",
    options: [
      { text: "설명서를 차근차근 읽어 보고 기능부터 확인해요", trait: "S" },
      { text: "대충 감으로 눌러 보며 어떤 기능들이 있는지 상상해 봐요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "회사에서 상사가 업무 지시를 내릴 때 어떤 설명이 이해하기 쉽나요?",
    options: [
      { text: "언제까지 무엇을 어떤 양식으로 만들지 구체적인 예시가 좋아요", trait: "S" },
      { text: "이 일이 왜 필요한지 전체 방향과 큰 그림을 먼저 듣고 싶어요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "연인이 해준 말 중 더 설레고 기억에 오래 남는 표현은 무엇인가요?",
    options: [
      { text: "\"오늘 입은 옷 색이 잘 어울려\" 같은 세심하고 현실적인 칭찬이요", trait: "S" },
      { text: "\"너랑 있으면 영화 속 주인공이 된 것 같아\" 같은 로맨틱한 표현이요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "친구가 최근 본 영화 이야기를 꺼낼 때 어떤 부분이 더 궁금한가요?",
    options: [
      { text: "배우의 연기나 인상 깊었던 장면 같은 구체적인 내용이요", trait: "S" },
      { text: "영화가 전하려는 숨은 의미나 결말 이후의 상상이요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "직장에서 새로운 기획안을 작성할 때 주로 어디에 강점이 있나요?",
    options: [
      { text: "기존 사례와 데이터를 바탕으로 실현 가능한 안을 짜는 거예요", trait: "S" },
      { text: "지금까지 없던 참신한 콘셉트와 미래 가능성을 제안하는 거예요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "연인과 미래 이야기를 나눌 때 주로 어떤 대화를 더 자주 하나요?",
    options: [
      { text: "다음 주말 데이트 코스나 현실적인 저축·생활 계획이요", trait: "S" },
      { text: "우리가 10년 뒤에 어떤 모습으로 살고 있을지에 대한 상상이요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "멍하니 하늘이나 풍경을 바라볼 때 주로 어떤 생각을 하나요?",
    options: [
      { text: "오늘 날씨가 참 맑다, 바람이 시원하다 같은 현재 느낌에 집중해요", trait: "S" },
      { text: "만약 저 구름 위에 집이 있다면 어떨까 같은 상상을 펼쳐요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "회사에서 이미 잘 돌아가는 업무 방식을 바꿀 때 어떤 편인가요?",
    options: [
      { text: "검증된 기존 방식이 안전하니 꼭 필요한 부분만 조심스레 고쳐요", trait: "S" },
      { text: "더 새롭고 효율적인 아이디어가 떠오르면 과감히 바꿔 보고 싶어요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "연인에게 선물을 줄 때 어떤 기준으로 고르는 편인가요?",
    options: [
      { text: "요즘 연인이 실제로 필요하다고 말했던 실용적인 물건을 사요", trait: "S" },
      { text: "우리만의 의미가 담긴 깜짝 이벤트나 색다른 선물을 고민해요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "누군가에게 길을 알려줄 때 어떤 식으로 설명하는 편인가요?",
    options: [
      { text: "편의점을 지나 오른쪽으로 두 블록 가면 나온다고 정확히 말해요", trait: "S" },
      { text: "큰길 따라 쭉 가다 보면 느낌상 금방 보일 거라고 말해요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "업무 실수가 발생했을 때 가장 먼저 살펴보는 것은 무엇인가요?",
    options: [
      { text: "어느 단계에서 어떤 숫자와 절차가 틀렸는지 사실부터 확인해요", trait: "S" },
      { text: "이 문제가 전체 프로젝트와 앞으로의 흐름에 미칠 영향을 봐요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "소개팅이나 첫 만남에서 상대방을 볼 때 더 눈에 들어오는 점은 무엇인가요?",
    options: [
      { text: "깔끔한 옷차림, 말투, 손짓처럼 지금 눈앞에 보이는 모습이에요", trait: "S" },
      { text: "대화가 통하는 느낌, 풍기는 분위기, 숨겨진 매력 같은 감이에요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "요리를 할 때 레시피를 보는 나만의 스타일은 어떤가요?",
    options: [
      { text: "계량 스푼과 타이머를 맞춰 정해진 순서대로 만들어요", trait: "S" },
      { text: "기본 흐름만 보고 내 감각대로 재료를 바꿔 넣어 봐요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "직장 동료의 발표를 들을 때 어떤 발표가 더 좋게 느껴지나요?",
    options: [
      { text: "구체적인 근거와 실제 수치가 깔끔하게 정리된 발표요", trait: "S" },
      { text: "새로운 비전과 흥미로운 통찰이 돋보이는 발표요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "연인이 \"나 오늘 꿈에 네가 나왔어\"라고 말하면 첫 반응은 어떤가요?",
    options: [
      { text: "\"진짜? 꿈에서 내가 뭐 하고 있었어?\" 하고 장면을 물어봐요", trait: "S" },
      { text: "\"무슨 뜻일까? 우리한테 좋은 일이 생기려나!\" 하며 의미를 찾아요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "책을 읽거나 강의를 들을 때 더 재미있게 느껴지는 내용은 무엇인가요?",
    options: [
      { text: "바로 써먹을 수 있는 현실적인 노하우와 생생한 경험담이요", trait: "S" },
      { text: "새로운 개념이나 세상의 숨은 원리를 다루는 추상적인 이야기요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "회사에서 반복적인 루틴 업무를 처리할 때 어떤 기분이 드나요?",
    options: [
      { text: "익숙하고 예측 가능해서 마음이 편하고 실수도 적어 좋아요", trait: "S" },
      { text: "금방 지루해져서 새로운 일이나 변화를 찾고 싶어져요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "연애 초반에 상대방에게 빠지게 되는 결정적인 순간은 언제인가요?",
    options: [
      { text: "나를 챙겨주는 세심한 배려와 따뜻한 행동을 직접 봤을 때요", trait: "S" },
      { text: "말하지 않아도 통하는 듯한 특별한 교감과 대화가 이어질 때요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "사과라는 단어를 들었을 때 머릿속에 가장 먼저 떠오르는 것은 무엇인가요?",
    options: [
      { text: "빨갛고 아삭한 과일 사과나 달콤한 사과 주스의 맛이에요", trait: "S" },
      { text: "백설공주, 뉴턴의 만유인력, 아니면 미안하다는 사과가 떠올라요", trait: "N" },
    ],
  },
  {
    dimension: "SN",
    question: "회사의 5년 뒤 모습을 떠올릴 때 나의 시선은 어디를 향하나요?",
    options: [
      { text: "지금 내 자리에서 쌓아 올릴 현실적인 경력과 연봉이에요", trait: "S" },
      { text: "업계의 변화 속에서 내가 개척할 수 있는 새로운 가능성들이에요", trait: "N" },
    ],
  },
];

// T/F 20문항 (일상, 회사, 연애 상황 포함)
const TF_QUESTIONS: Omit<Question, "id">[] = [
  {
    dimension: "TF",
    question: "친구가 \"나 오늘 면접에서 또 떨어졌어\"라고 말할 때 첫 반응은 어떤가요?",
    options: [
      { text: "어떤 질문이 어려웠는지 물어보며 다음 전략을 같이 고민해요", trait: "T" },
      { text: "많이 속상했겠다며 먼저 따뜻한 위로와 공감을 건네줘요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "회사에서 동료가 제출한 보고서에 오류가 많다면 어떻게 말하나요?",
    options: [
      { text: "수정이 필요한 부분과 이유를 객관적으로 짚어 바로 알려줘요", trait: "T" },
      { text: "고생했다는 말을 먼저 건넨 뒤 조심스럽게 수정 의견을 말해요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "연인이 \"나 오늘 회사에서 너무 억울한 일을 당했어\"라고 할 때 어떻게 반응하나요?",
    options: [
      { text: "누가 잘못했는지 상황을 정리해 보고 대처 방법을 알려줘요", trait: "T" },
      { text: "우선 연인 편을 들며 얼마나 속상했을지 같이 화내 주고 안아줘요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "선물을 고를 때 나에게 더 중요하게 다가오는 기준은 무엇인가요?",
    options: [
      { text: "상대방이 평소 자주 쓸 수 있는 실용성과 가성비예요", trait: "T" },
      { text: "상대방이 받고 기분 좋아할 만한 의미와 정성이에요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "직장 회의 중에 내 의견과 다른 주장이 나왔을 때 어떻게 반응하나요?",
    options: [
      { text: "근거와 논리를 따져 보며 더 나은 방향인지 판단해요", trait: "T" },
      { text: "상대방의 기분이 상하지 않도록 부드럽게 조율하려고 해요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "연인과 의견 충돌이 생겼을 때 가장 중요하게 생각하는 것은 무엇인가요?",
    options: [
      { text: "서로 무엇이 맞고 틀렸는지 원인을 명확히 짚고 넘어가는 거예요", trait: "T" },
      { text: "서로의 상한 감정을 먼저 보듬고 마음을 다치지 않게 하는 거예요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "슬픈 영화를 보고 나온 직후 나의 모습은 어떤 편인가요?",
    options: [
      { text: "이야기의 개연성이나 연출이 어땠는지 차분히 떠올려 봐요", trait: "T" },
      { text: "주인공의 감정에 푹 빠져 여운이 한참 동안 가시지 않아요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "회사에서 좋은 평가를 받았을 때 가장 기분 좋은 칭찬은 무엇인가요?",
    options: [
      { text: "\"일 처리가 정말 깔끔하고 전문적이네요\"라는 실력 인정이요", trait: "T" },
      { text: "\"덕분에 팀 분위기가 너무 좋았어요\"라는 사람에 대한 감사요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "연인에게 사랑을 확인받는다고 느끼는 순간은 언제인가요?",
    options: [
      { text: "내가 힘들 때 실질적으로 문제를 해결해 주고 믿음을 줄 때요", trait: "T" },
      { text: "따뜻한 말과 다정한 눈빛으로 내 마음을 세심하게 알아줄 때요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "친한 지인이 고민 상담을 요청할 때 내가 더 잘해주는 역할은 무엇인가요?",
    options: [
      { text: "상황을 객관적으로 정리해 현실적인 해결책을 찾아줘요", trait: "T" },
      { text: "끝까지 고개를 끄덕이며 상대의 마음을 온전히 받아줘요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "직장에서 팀원을 뽑거나 역할을 나눌 때 무엇을 가장 우선하나요?",
    options: [
      { text: "각자의 능력과 성과에 맞춰 가장 공정하게 배분하는 거예요", trait: "T" },
      { text: "서로 호흡이 잘 맞고 누구도 소외되지 않도록 배려하는 거예요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "연인이 약속에 늦었을 때 미안하다고 사과하면 어떤 마음이 드나요?",
    options: [
      { text: "왜 늦었는지 납득할 만한 이유를 들으면 금방 괜찮아져요", trait: "T" },
      { text: "이유보다 진심이 담긴 미안함과 다정한 태도를 보면 마음이 풀려요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "친구가 새 헤어스타일이 어울리냐고 물어봤을 때 어떻게 답하나요?",
    options: [
      { text: "앞머리 길이나 색감 등 객관적으로 느낀 점을 솔직하게 말해요", trait: "T" },
      { text: "일단 잘 어울린다고 칭찬하며 기분 좋아지게 말해줘요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "회사에서 어려운 결정을 내려야 할 때 주로 무엇을 기준으로 삼나요?",
    options: [
      { text: "숫자와 원칙, 회사 전체에 가져올 실질적인 이익이에요", trait: "T" },
      { text: "함께 일하는 사람들의 사기와 관계에 미칠 영향이에요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "연인에게 서운한 점이 생겼을 때 어떻게 표현하는 편인가요?",
    options: [
      { text: "감정을 빼고 어떤 행동이 왜 불편했는지 논리적으로 설명해요", trait: "T" },
      { text: "그때 내가 어떤 기분이 들었는지 솔직한 감정을 먼저 말해요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "나에게 더 어울리는 칭찬의 말은 어느 쪽에 가까운가요?",
    options: [
      { text: "\"넌 정말 똑똑하고 판단이 정확해\"라는 말이에요", trait: "T" },
      { text: "\"넌 참 따뜻하고 배려심이 깊어\"라는 말이에요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "직장에서 동료가 개인 사정으로 업무를 대신 부탁한다면 어떻게 하나요?",
    options: [
      { text: "내 일정과 업무량을 계산해 보고 가능할 때만 도와줘요", trait: "T" },
      { text: "딱한 사정이 마음에 걸려서 내가 조금 바쁘더라도 도와주려 해요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "연인이 \"나 살찐 것 같지 않아?\"라고 물었을 때 나의 대답은?",
    options: [
      { text: "\"조금 찐 것 같기도 한데 건강엔 문제없어 보여\"라고 사실대로 말해요", trait: "T" },
      { text: "\"전혀! 지금 모습이 훨씬 보기 좋고 귀여워\"라고 다정하게 말해요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "뉴스나 사회 이슈를 볼 때 더 많이 드는 생각은 무엇인가요?",
    options: [
      { text: "제도의 허점이나 인과관계가 어떻게 되는지 분석해 봐요", trait: "T" },
      { text: "피해 입은 사람들의 아픔과 감정에 먼저 마음이 쓰여요", trait: "F" },
    ],
  },
  {
    dimension: "TF",
    question: "직장 상사로부터 날카로운 피드백을 들었을 때 어떤 반응이 나오나요?",
    options: [
      { text: "말투는 아쉽지만 내용 중 고칠 만한 타당한 지적만 챙겨요", trait: "T" },
      { text: "내용과 별개로 차가운 말투 때문에 하루 종일 마음이 무거워요", trait: "F" },
    ],
  },
];

// J/P 20문항 (일상, 회사, 연애 상황 포함)
const JP_QUESTIONS: Omit<Question, "id">[] = [
  {
    dimension: "JP",
    question: "여행을 떠나기 전날 밤, 나의 가방과 일정표는 어떤 상태인가요?",
    options: [
      { text: "동선과 맛집 리스트까지 시간 단위로 깔끔하게 정리돼 있어요", trait: "J" },
      { text: "꼭 필요한 짐만 대충 챙기고 현지에서 끌리는 대로 움직여요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "회사에서 마감 기한이 일주일 남은 보고서를 받았을 때 언제 시작하나요?",
    options: [
      { text: "미리 조금씩 나눠서 마감 전날엔 여유 있게 끝내 둬요", trait: "J" },
      { text: "막판에 집중력이 폭발하는 편이라 마감 직전에 몰아서 해요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "연인과 데이트를 계획할 때 주로 어떤 스타일인가요?",
    options: [
      { text: "식당 예약부터 동선까지 미리 정해 둬야 마음이 놓여요", trait: "J" },
      { text: "만나서 그날 날씨와 기분 따라 가고 싶은 곳을 정해요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "주말 아침에 눈을 떴을 때 하루를 어떻게 보내시나요?",
    options: [
      { text: "전날 세워 둔 계획표대로 할 일을 하나씩 체크하며 보내요", trait: "J" },
      { text: "그날 기분과 컨디션에 따라 즉흥적으로 하고 싶은 걸 정해요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "직장 책상 위나 컴퓨터 바탕화면의 파일 정리는 어떤 모습인가요?",
    options: [
      { text: "폴더별로 이름과 기준을 정해 깔끔하게 분류해 둬요", trait: "J" },
      { text: "내가 어디에 뒀는지만 기억하면 되니 편한 대로 놓아둬요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "연인이 약속 당일에 갑자기 \"우리 오늘 저기 대신 딴 데 갈래?\"라고 하면 어떤가요?",
    options: [
      { text: "미리 세워 둔 계획이 틀어져서 살짝 당황스럽고 아쉬워요", trait: "J" },
      { text: "오히려 재미있는 변수라 생각하며 신나게 바로 따라가요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "약속 장소로 가는 길에 갑자기 예쁜 소품샵을 발견했다면 어떻게 하나요?",
    options: [
      { text: "약속 시간에 늦지 않도록 일단 지나치고 다음에 들러요", trait: "J" },
      { text: "시간 여유가 조금이라도 있으면 잠깐 들어가 구경하고 나와요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "회사에서 갑작스럽게 업무 일정이 변경되었을 때 어떤 기분이 드나요?",
    options: [
      { text: "계획했던 흐름이 꼬여서 스트레스를 받고 다시 정리해야 해요", trait: "J" },
      { text: "\"어쩔 수 없지\" 하며 바뀐 상황에 맞춰 유연하게 움직여요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "연인과의 기념일이나 생일 이벤트는 언제부터 준비하나요?",
    options: [
      { text: "최소 몇 주 전부터 선물과 장소를 정해 두고 미리 예약해요", trait: "J" },
      { text: "며칠 전이나 당일에 딱 떠오른 센스 있는 선택으로 준비해요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "장보기를 하러 마트에 갔을 때 나는 어떤 모습인가요?",
    options: [
      { text: "미리 적어 온 장보기 목록에 있는 물건만 딱 사서 나와요", trait: "J" },
      { text: "돌아다니다가 맛있어 보이는 게 있으면 즉흥적으로 담아요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "직장에서 출근하자마자 가장 먼저 하는 일은 무엇인가요?",
    options: [
      { text: "오늘 해야 할 일 목록(To-do)을 순서대로 정리해 둬요", trait: "J" },
      { text: "메일이나 메신저를 보면서 급한 일부터 그때그때 처리해요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "썸 타는 상대와 첫 데이트를 잡을 때 선호하는 방식은 무엇인가요?",
    options: [
      { text: "며칠 전에 날짜와 시간, 만날 장소를 확실히 정해 두는 거예요", trait: "J" },
      { text: "\"이번 주 시간 될 때 연락하자\"며 편하게 여지를 두는 거예요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "스마트폰 알람이나 캘린더 앱을 어떻게 활용하시나요?",
    options: [
      { text: "할 일과 약속을 시간별로 빠짐없이 기록해 두고 지켜요", trait: "J" },
      { text: "정말 중요한 몇 가지만 적어 두고 대부분 그때그때 기억해요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "회사에서 여러 개의 업무가 한꺼번에 밀려왔을 때 어떻게 처리하나요?",
    options: [
      { text: "마감 기한과 중요도에 따라 순서를 정해 하나씩 끝내요", trait: "J" },
      { text: "이것저것 번갈아 손대다가 탄력 받은 일부터 빠르게 끝내요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "연인과 1박 2일 커플 여행을 갈 때 짐 싸는 스타일은 어떤가요?",
    options: [
      { text: "며칠 전부터 체크리스트를 보며 빠진 것 없이 미리 싸 둬요", trait: "J" },
      { text: "출발 직전에 대충 챙기고 빠진 건 여행지에서 사면 된다고 봐요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "친한 친구들과 모임 날짜를 잡을 때 주로 어떤 역할을 하나요?",
    options: [
      { text: "언제 어디서 만날지 투표를 올려 빠르게 확정 짓는 편이에요", trait: "J" },
      { text: "다들 정해 주는 날짜와 장소에 맞춰서 유동적으로 따라가요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "직장에서 명확한 매뉴얼이 없는 자유로운 과제를 받으면 어떤가요?",
    options: [
      { text: "먼저 기준과 단계별 목표를 내가 직접 세우고 시작해요", trait: "J" },
      { text: "일단 부딪혀 보면서 진행 중에 방향을 찾아가는 게 재미있어요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "연애할 때 상대방의 어떤 점에 조금 답답함을 느낄 수 있나요?",
    options: [
      { text: "약속이나 계획을 자꾸 미루고 즉흥적으로 바꾸는 모습이요", trait: "J" },
      { text: "사소한 일정까지 꼭 정해진 대로만 하려고 빡빡하게 굴 때요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "퇴근 후나 수업이 끝난 뒤의 저녁 시간은 주로 어떻게 흐르나요?",
    options: [
      { text: "운동, 공부, 집안일 등 정해 둔 루틴에 맞춰 규칙적으로 보내요", trait: "J" },
      { text: "그날의 피곤함과 기분에 따라 하고 싶은 걸 자유롭게 해요", trait: "P" },
    ],
  },
  {
    dimension: "JP",
    question: "긴 보고서나 과제를 끝냈을 때 가장 뿌듯한 순간은 언제인가요?",
    options: [
      { text: "계획한 일정표대로 차질 없이 일찍 마무리했을 때예요", trait: "J" },
      { text: "마감 직전까지 아이디어를 다듬어 극적으로 완성했을 때예요", trait: "P" },
    ],
  },
];

// 같은 지표(EI, SN, TF, JP)가 연달아 나오지 않도록 20라운드로 번갈아 섞은 총 80개 문항입니다
export const QUESTIONS: Question[] = Array.from({ length: 20 }, (_, round) => [
  { id: round * 4 + 1, ...EI_QUESTIONS[round] },
  { id: round * 4 + 2, ...SN_QUESTIONS[round] },
  { id: round * 4 + 3, ...TF_QUESTIONS[round] },
  { id: round * 4 + 4, ...JP_QUESTIONS[round] },
]).flat();
