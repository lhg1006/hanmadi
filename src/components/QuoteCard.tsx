import { useEffect, useState, useRef } from "react";
import type { Quote } from "../data/quotes";
import { CategoryIcon } from "./Icons";
import "./QuoteCard.css";

interface Props {
  quote: Quote;
  categoryName: string;
  categoryId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function QuoteCard({ quote, categoryName, categoryId, onNext, onBack }: Props) {
  const [visible, setVisible] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, [quote]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);
    if (deltaY > 60 && deltaX < 100) {
      onNext();
    }
  };

  return (
    <div
      className="quote-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="quote-topbar">
        <button className="back-btn" onClick={onBack}>
          <span className="back-icon">‹</span>
          <span>돌아가기</span>
        </button>
        <div className="topbar-category">
          <CategoryIcon id={categoryId} size={18} />
          <span>{categoryName}</span>
        </div>
      </div>

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
