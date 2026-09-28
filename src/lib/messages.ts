export const MESSAGES = {
  idle: [
    "심심해~ 나랑 놀아줘!",
    "비밀번호 안 까먹었지?",
    "오늘도 화이팅!",
    "나만 믿어, 다 기억해둘게",
    "뀨... 심심하다옹",
  ],
  addAccount: [
    "저장 완료! 내가 잘 지켜줄게",
    "새 계정이 늘었네, 반가워!",
    "안전하게 저장해뒀어~",
  ],
  update: ["수정 완료! 짜잔~", "업데이트 했어, 깔끔하지?"],
  delete: ["잘가~ 안녕!", "삭제했어, 후련하지?"],
  view: [
    "또 까먹었구나? ㅋㅋ",
    "비밀번호 확인! 이번엔 외워봐",
    "괜찮아, 나만 믿어!",
    "까먹은 횟수가 하나 늘었어요...",
  ],
  copy: [
    "복사 완료! 붙여넣기 고고",
    "또 복사했네~ 다음엔 외워보자!",
    "복사해두면 편하지만 외우는 것도 잊지 마!",
  ],
  click: ["왜 불렀어?", "나 여기 있어!", "뀨뀨!", "헤헤 간지러워"],
} as const;

export function randomMessage(list: readonly string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}
