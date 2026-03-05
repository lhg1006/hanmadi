export const FORTUNE_PRICES = {
  palm: { name: "손금 분석", price: 1000, description: "손바닥 사진으로 운세를 확인하세요" },
  face: { name: "관상 분석", price: 1000, description: "얼굴 사진으로 관상을 풀어드려요" },
  saju: { name: "사주 분석", price: 1500, description: "생년월일시로 사주팔자를 봐드려요" },
} as const;

export type FortuneType = keyof typeof FORTUNE_PRICES;
