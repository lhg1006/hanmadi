interface IconProps {
  size?: number;
  color?: string;
}

/** 헤더 - 펼쳐진 책 + 따옴표 */
export function QuoteIcon({ size = 48, color = "#333" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 8C14 7 11 6.5 7 7V23C11 22.5 14 23 16 24C18 23 21 22.5 25 23V7C21 6.5 18 7 16 8Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="16" y1="8" x2="16" y2="24" stroke={color} strokeWidth="1.2"/>
      <text x="16" y="7" textAnchor="middle" fontFamily="Georgia, serif" fontSize="8" fontWeight="bold" fill={color}>"</text>
    </svg>
  );
}

/** 힘이 되는 명언 - 불꽃 */
export function FlameIcon({ size = 32, color = "#FF6B35" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2C16 2 10 10 10 18C10 21.3 12.7 24 16 24C19.3 24 22 21.3 22 18C22 10 16 2 16 2Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M16 12C16 12 13 16 13 20C13 21.7 14.3 23 16 23C17.7 23 19 21.7 19 20C19 16 16 12 16 12Z"
        fill="#FFD166"
      />
      <ellipse cx="16" cy="27" rx="6" ry="2" fill={color} opacity="0.15" />
    </svg>
  );
}

/** 성공에 대한 명언 - 별 위의 깃발 */
export function FlagIcon({ size = 32, color = "#4361EE" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill={color} opacity="0.1" />
      <path d="M12 8V26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 8L22 11L12 16"
        fill={color}
        opacity="0.85"
      />
      <circle cx="16" cy="26" r="0" fill="none" />
      <path d="M9 26H23" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** 마음가짐 명언 - 연꽃 */
export function LotusIcon({ size = 32, color = "#7B61FF" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 10C16 10 12 16 12 20C12 22.2 13.8 24 16 24C18.2 24 20 22.2 20 20C20 16 16 10 16 10Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M16 14C16 14 8 16 8 22C8 22 12 22 16 18"
        fill={color}
        opacity="0.4"
      />
      <path
        d="M16 14C16 14 24 16 24 22C24 22 20 22 16 18"
        fill={color}
        opacity="0.4"
      />
      <path
        d="M16 12C16 12 6 12 6 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M16 12C16 12 26 12 26 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.25"
      />
      <ellipse cx="16" cy="26" rx="6" ry="1.5" fill={color} opacity="0.1" />
    </svg>
  );
}

/** 사랑과 관계 명언 - 하트 */
export function HeartIcon({ size = 32, color = "#EF476F" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 28S4 20 4 13C4 9.1 7.1 6 11 6C13.2 6 15.2 7.2 16 9C16.8 7.2 18.8 6 21 6C24.9 6 28 9.1 28 13C28 20 16 28 16 28Z"
        fill={color}
      />
      <path
        d="M11 10C9.3 10 8 11.3 8 13"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/** 인생의 지혜 - 나침반 */
export function CompassIcon({ size = 32, color = "#06D6A0" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" opacity="0.3" />
      <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1.5" opacity="0.15" />
      <polygon points="16,6 18,15 16,14 14,15" fill={color} />
      <polygon points="16,26 14,17 16,18 18,17" fill={color} opacity="0.4" />
      <polygon points="6,16 15,14 14,16 15,18" fill={color} opacity="0.4" />
      <polygon points="26,16 17,18 18,16 17,14" fill={color} opacity="0.4" />
      <circle cx="16" cy="16" r="2" fill={color} />
    </svg>
  );
}

/** 아이콘 매핑 */
import type { ReactNode } from "react";

const iconMap: Record<string, (props: IconProps) => ReactNode> = {
  strength: FlameIcon,
  success: FlagIcon,
  mindset: LotusIcon,
  love: HeartIcon,
  wisdom: CompassIcon,
};

export function CategoryIcon({ id, size = 32 }: { id: string; size?: number }) {
  const Icon = iconMap[id];
  if (!Icon) return null;
  return <Icon size={size} />;
}
