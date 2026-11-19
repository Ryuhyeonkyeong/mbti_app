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
  /** 문항 고유 번호 (1 ~ 20) */
  id: number;
  /** 이 문항이 측정하는 지표 */
  dimension: MbtiDimension;
  /** 일상 속 상황을 묻는 짧은 질문 */
  question: string;
  /** 두 가지 선택지 */
  options: [QuestionOption, QuestionOption];
}

// 같은 지표가 연달아 나오지 않도록 순서를 섞어 배치한 20개 문항 목록입니다
export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: "EI",
    question: "주말에 약속이 갑자기 취소되었을 때 어떤 기분이 드나요?",
    options: [
      { text: "아쉬워서 다른 친구에게 연락해 새로운 약속을 잡아요", trait: "E" },
      { text: "오히려 좋아하며 집에서 혼자만의 휴식을 즐겨요", trait: "I" },
    ],
  },
  {
    id: 2,
    dimension: "SN",
    question: "새로운 가전제품을 샀을 때 가장 먼저 하는 행동은 무엇인가요?",
    options: [
      { text: "설명서를 차근차근 읽어 보고 기능부터 확인해요", trait: "S" },
      { text: "대충 감으로 눌러 보며 어떤 기능들이 있는지 상상해 봐요", trait: "N" },
    ],
  },
  {
    id: 3,
    dimension: "TF",
    question: "친구가 \"나 오늘 면접에서 또 떨어졌어\"라고 말할 때 첫 반응은 어떤가요?",
    options: [
      { text: "어떤 질문이 어려웠는지 물어보며 다음 전략을 같이 고민해요", trait: "T" },
      { text: "많이 속상했겠다며 먼저 따뜻한 위로와 공감을 건네줘요", trait: "F" },
    ],
  },
  {
    id: 4,
    dimension: "JP",
    question: "여행을 떠나기 전날 밤, 나의 가방과 일정표는 어떤 상태인가요?",
    options: [
      { text: "동선과 맛집 리스트까지 시간 단위로 깔끔하게 정리돼 있어요", trait: "J" },
      { text: "꼭 필요한 짐만 대충 챙기고 현지에서 끌리는 대로 움직여요", trait: "P" },
    ],
  },
  {
    id: 5,
    dimension: "SN",
    question: "친구가 최근 본 영화 이야기를 꺼낼 때 어떤 부분이 더 궁금한가요?",
    options: [
      { text: "배우의 연기나 인상 깊었던 장면 같은 구체적인 내용이요", trait: "S" },
      { text: "영화가 전하려는 숨은 의미나 결말 이후의 상상이요", trait: "N" },
    ],
  },
  {
    id: 6,
    dimension: "TF",
    question: "선물을 고를 때 나에게 더 중요하게 다가오는 기준은 무엇인가요?",
    options: [
      { text: "상대방이 평소 자주 쓸 수 있는 실용성과 가성비예요", trait: "T" },
      { text: "상대방이 받고 기분 좋아할 만한 의미와 정성이에요", trait: "F" },
    ],
  },
  {
    id: 7,
    dimension: "JP",
    question: "마감 기한이 일주일 남은 과제를 받았을 때 언제 시작하나요?",
    options: [
      { text: "미리 조금씩 나눠서 마감 전날엔 여유 있게 끝내 둬요", trait: "J" },
      { text: "막판에 집중력이 폭발하는 편이라 마감 직전에 몰아서 해요", trait: "P" },
    ],
  },
  {
    id: 8,
    dimension: "EI",
    question: "낯선 사람들이 모인 소모임에 처음 갔을 때 나는 어떤 편인가요?",
    options: [
      { text: "먼저 말을 걸며 자연스럽게 분위기를 풀어가요", trait: "E" },
      { text: "먼저 다가와 주기를 기다리며 조용히 분위기를 살펴요", trait: "I" },
    ],
  },
  {
    id: 9,
    dimension: "TF",
    question: "회의 중에 내 의견과 다른 주장이 나왔을 때 어떻게 반응하나요?",
    options: [
      { text: "근거와 논리를 따져 보며 더 나은 방향인지 판단해요", trait: "T" },
      { text: "상대방의 기분이 상하지 않도록 부드럽게 조율하려고 해요", trait: "F" },
    ],
  },
  {
    id: 10,
    dimension: "JP",
    question: "주말 아침에 눈을 떴을 때 하루를 어떻게 보내시나요?",
    options: [
      { text: "전날 세워 둔 계획표대로 할 일을 하나씩 체크하며 보내요", trait: "J" },
      { text: "그날 기분과 컨디션에 따라 즉흥적으로 하고 싶은 걸 정해요", trait: "P" },
    ],
  },
  {
    id: 11,
    dimension: "EI",
    question: "하루 종일 바쁘게 보낸 뒤 에너지를 채우는 나만의 방법은 무엇인가요?",
    options: [
      { text: "친한 사람들과 수다를 떨며 오늘 있었던 일을 나눠요", trait: "E" },
      { text: "조용한 방에서 좋아하는 영상이나 음악을 보며 쉬어요", trait: "I" },
    ],
  },
  {
    id: 12,
    dimension: "SN",
    question: "멍하니 하늘이나 풍경을 바라볼 때 주로 어떤 생각을 하나요?",
    options: [
      { text: "오늘 날씨가 참 맑다, 바람이 시원하다 같은 현재 느낌에 집중해요", trait: "S" },
      { text: "만약 저 구름 위에 집이 있다면 어떨까 같은 상상을 펼쳐요", trait: "N" },
    ],
  },
  {
    id: 13,
    dimension: "JP",
    question: "책상 위나 컴퓨터 바탕화면의 파일 정리는 어떤 모습인가요?",
    options: [
      { text: "폴더별로 이름과 기준을 정해 깔끔하게 분류해 둬요", trait: "J" },
      { text: "내가 어디에 뒀는지만 기억하면 되니 편한 대로 놓아둬요", trait: "P" },
    ],
  },
  {
    id: 14,
    dimension: "EI",
    question: "회사나 학교에서 새로운 팀 프로젝트를 시작할 때 어떤 방식이 편한가요?",
    options: [
      { text: "여럿이 모여 바로 이야기를 나누며 아이디어를 모아요", trait: "E" },
      { text: "먼저 혼자 생각을 정리한 뒤에 의견을 공유해요", trait: "I" },
    ],
  },
  {
    id: 15,
    dimension: "SN",
    question: "누군가에게 길을 알려줄 때 어떤 식으로 설명하는 편인가요?",
    options: [
      { text: "편의점을 지나 오른쪽으로 두 블록 가면 나온다고 정확히 말해요", trait: "S" },
      { text: "큰길 따라 쭉 가다 보면 느낌상 금방 보일 거라고 말해요", trait: "N" },
    ],
  },
  {
    id: 16,
    dimension: "TF",
    question: "슬픈 영화를 보고 나온 직후 나의 모습은 어떤 편인가요?",
    options: [
      { text: "이야기의 개연성이나 연출이 어땠는지 차분히 떠올려 봐요", trait: "T" },
      { text: "주인공의 감정에 푹 빠져 여운이 한참 동안 가시지 않아요", trait: "F" },
    ],
  },
  {
    id: 17,
    dimension: "EI",
    question: "카페에 자리를 잡을 때 주로 어떤 공간을 고르시나요?",
    options: [
      { text: "활기찬 분위기가 느껴지는 창가나 홀 가운데 자리가 좋아요", trait: "E" },
      { text: "사람 시선이 덜 닿는 구석진 자리나 조용한 층이 편해요", trait: "I" },
    ],
  },
  {
    id: 18,
    dimension: "SN",
    question: "요리를 할 때 레시피를 보는 나만의 스타일은 어떤가요?",
    options: [
      { text: "계량 스푼과 타이머를 맞춰 정해진 순서대로 만들어요", trait: "S" },
      { text: "기본 흐름만 보고 내 감각대로 재료를 바꿔 넣어 봐요", trait: "N" },
    ],
  },
  {
    id: 19,
    dimension: "TF",
    question: "친한 지인이 고민 상담을 요청할 때 내가 더 잘해주는 역할은 무엇인가요?",
    options: [
      { text: "상황을 객관적으로 정리해 현실적인 해결책을 찾아줘요", trait: "T" },
      { text: "끝까지 고개를 끄덕이며 상대의 마음을 온전히 받아줘요", trait: "F" },
    ],
  },
  {
    id: 20,
    dimension: "JP",
    question: "약속 장소로 가는 길에 갑자기 예쁜 소품샵을 발견했다면 어떻게 하나요?",
    options: [
      { text: "약속 시간에 늦지 않도록 일단 지나치고 다음에 들러요", trait: "J" },
      { text: "시간 여유가 조금이라도 있으면 잠깐 들어가 구경하고 나와요", trait: "P" },
    ],
  },
];
