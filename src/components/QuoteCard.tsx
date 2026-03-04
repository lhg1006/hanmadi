import { useEffect, useState, useRef } from "react";
import type { Quote, Category } from "../data/quotes";
import { CategoryIcon } from "./Icons";
import "./QuoteCard.css";

interface Props {
  quote: Quote;
  categoryName: string;
  categoryId: string;
  categories: Category[];
  onNext: () => void;
  onBack: () => void;
  onChangeCategory: (id: string) => void;
  onGoHome: () => void;
  onGoDailyFive: () => void;
}

export default function QuoteCard({
  quote,
  categoryName,
  categoryId,
  categories,
  onNext,
  onBack,
  onChangeCategory,
  onGoHome,
  onGoDailyFive,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, [quote]);

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);
    if (deltaY > 60 && deltaX < 100 && !menuOpen) {
      onNext();
    }
  };

  return (
    <div
      className="quote-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar: 뒤로 | 카테고리(가운데) | 메뉴(우측) */}
      <div className="quote-topbar">
        <button className="back-btn" onClick={onBack}>
          <span className="back-icon">‹</span>
        </button>

        <div className="topbar-category">
          <CategoryIcon id={categoryId} size={18} />
          <span>{categoryName}</span>
        </div>

        <div className="menu-wrapper" ref={menuRef}>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="5" r="1.8" fill="#666" />
              <circle cx="11" cy="11" r="1.8" fill="#666" />
              <circle cx="11" cy="17" r="1.8" fill="#666" />
            </svg>
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item dropdown-home"
                onClick={() => { setMenuOpen(false); onGoHome(); }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 7.5L9 3L15 7.5V15C15 15.6 14.6 16 14 16H4C3.4 16 3 15.6 3 15V7.5Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 16V10H11V16" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span></span>
              </button>

              <button
                className="dropdown-item dropdown-daily"
                onClick={() => { setMenuOpen(false); onGoDailyFive(); }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="3" y="3" width="12" height="12" rx="3" stroke="#666" strokeWidth="1.5"/>
                  <path d="M7 7H11M7 9.5H11M7 12H10" stroke="#666" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>오늘의 다섯 명언</span>
              </button>

              <div className="dropdown-divider" />

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`dropdown-item ${cat.id === categoryId ? "dropdown-active" : ""}`}
                  onClick={() => { setMenuOpen(false); onChangeCategory(cat.id); }}
                >
                  <CategoryIcon id={cat.id} size={18} />
                  <span>{cat.name}</span>
                  {cat.id === categoryId && <span className="dropdown-check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 메뉴 열렸을 때 배경 오버레이 */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}

      {/* Fixed size card */}
      <div className="quote-content-wrapper">
        <div className={`quote-card-fixed ${visible ? "fade-in" : "fade-out"}`}>
          <div className="quote-mark">"</div>
          <p className="quote-text">
            {quote.text.split(/(?<=[.,]\s?)/).map((segment, i, arr) => (
              <span key={i}>
                {segment.trim()}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="quote-author">— {quote.author}</p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="quote-bottom">
        <button className="next-btn" onClick={onNext}>
          다른 명언 보기
        </button>
        <p className="swipe-hint">위로 스와이프해도 넘어갑니다</p>
      </div>
    </div>
  );
}
