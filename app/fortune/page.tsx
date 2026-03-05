"use client";

import { FORTUNE_PRICES } from "@/lib/config/prices";
import Link from "next/link";
import "./fortune.css";

const fortuneIcons = {
  palm: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 8C22 8 20 10 20 12V24L16 18C15 16.5 13 16 11.5 17C10 18 10 20 11 21.5L18 32C18 32 20 36 24 38C28 36 32 32 32 28V14C32 12 30 10 28 10C26 10 24.5 11.5 24.5 13" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 12V8C20 6 21.5 4 24 4C26.5 4 28 6 28 8" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  face: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="16" stroke="#4361EE" strokeWidth="2.5"/>
      <circle cx="18" cy="21" r="2" fill="#4361EE"/>
      <circle cx="30" cy="21" r="2" fill="#4361EE"/>
      <path d="M18 30C20 33 28 33 30 30" stroke="#4361EE" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 16C16 12 20 10 24 10C28 10 32 12 34 16" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    </svg>
  ),
  saju: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="32" rx="6" stroke="#7B61FF" strokeWidth="2.5"/>
      <line x1="8" y1="20" x2="40" y2="20" stroke="#7B61FF" strokeWidth="1.5" opacity="0.3"/>
      <line x1="24" y1="8" x2="24" y2="40" stroke="#7B61FF" strokeWidth="1.5" opacity="0.3"/>
      <text x="16" y="16" textAnchor="middle" fontSize="7" fill="#7B61FF" fontWeight="bold">年</text>
      <text x="32" y="16" textAnchor="middle" fontSize="7" fill="#7B61FF" fontWeight="bold">月</text>
      <text x="16" y="34" textAnchor="middle" fontSize="7" fill="#7B61FF" fontWeight="bold">日</text>
      <text x="32" y="34" textAnchor="middle" fontSize="7" fill="#7B61FF" fontWeight="bold">時</text>
    </svg>
  ),
};

export default function FortunePage() {
  return (
    <div className="fortune-screen">
      <header className="fortune-header">
        <h1 className="fortune-title">AI 운세</h1>
        <p className="fortune-subtitle">AI가 분석하는 나만의 운세</p>
      </header>

      <div className="fortune-list">
        {(Object.keys(FORTUNE_PRICES) as (keyof typeof FORTUNE_PRICES)[]).map((type) => {
          const item = FORTUNE_PRICES[type];
          return (
            <Link key={type} href={`/fortune/${type}`} className="fortune-card">
              <div className="fortune-card-icon">
                {fortuneIcons[type]}
              </div>
              <div className="fortune-card-info">
                <span className="fortune-card-name">{item.name}</span>
                <span className="fortune-card-desc">{item.description}</span>
              </div>
              <div className="fortune-card-price">
                {item.price.toLocaleString()}원
              </div>
              <span className="fortune-card-arrow">›</span>
            </Link>
          );
        })}
      </div>

      <p className="fortune-notice">
        AI 운세는 오락 목적으로 제공되며, 전문적인 상담을 대체하지 않습니다.
      </p>
    </div>
  );
}
