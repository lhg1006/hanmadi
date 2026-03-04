import { useEffect, useState, useRef, useCallback } from "react";
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
  const [cardState, setCardState] = useState<"idle" | "spin-out" | "spin-in">("idle");
  const [displayQuote, setDisplayQuote] = useState(quote);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayQuote(quote);
      setCardState("spin-in");
      return;
    }
    // 새 명언이 들어오면: spin-out → 내용 교체 → spin-in
    setCardState("spin-out");
    const timer = setTimeout(() => {
      setDisplayQuote(quote);
      setCardState("spin-in");
    }, 350);
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
    if (deltaX < 100 && !menuOpen) {
      if (deltaY > 60) onNext();
      if (deltaY < -60) onBack();
    }
  };

  const handleShare = useCallback(async () => {
    const url = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "오늘의 명언 - 한마디",
          text: `"${displayQuote.text}"\n— ${displayQuote.author}`,
          url,
        });
      } catch {
        // 사용자가 공유 취소
      }
    } else {
      await navigator.clipboard.writeText(
        `"${displayQuote.text}"\n— ${displayQuote.author}\n\n${url}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [displayQuote]);

  const handleCardCopy = useCallback(async () => {
    const text = `"${displayQuote.text}"\n— ${displayQuote.author}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [displayQuote]);

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

      {/* Fixed size card with 3D spin */}
      <div className="quote-content-wrapper">
        <div className={`quote-card-fixed card-${cardState}`} onClick={handleCardCopy}>
          <div className="quote-mark">"</div>
          <p className="quote-text">
            {displayQuote.text.split(/(?<=[.,]\s?)/).map((segment, i, arr) => (
              <span key={i}>
                {segment.trim()}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="quote-author">— {displayQuote.author}</p>
        </div>
      </div>
      <p className={`card-copy-hint ${copied ? "hint-copied" : ""}`}>
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{verticalAlign: "-2px", marginRight: "4px"}}>
              <circle cx="7" cy="7" r="6.5" stroke="#4361EE" strokeWidth="1.2"/>
              <path d="M4.5 7L6.2 8.8L9.5 5.2" stroke="#4361EE" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            클립보드에 복사되었습니다
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{verticalAlign: "-2px", marginRight: "4px"}}>
              <rect x="4.5" y="1.5" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M2.5 4.5V11C2.5 11.6 2.9 12 3.5 12H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            카드를 탭하면 명언이 복사됩니다
          </>
        )}
      </p>
      <p className="swipe-hint">위로 스와이프: 다음 명언 · 아래로 스와이프: 뒤로</p>

      {/* Bottom actions */}
      <div className="quote-bottom">
        <div className="bottom-buttons">
          <button className="share-btn" onClick={handleShare}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 12V16C4 16.6 4.4 17 5 17H15C15.6 17 16 16.6 16 16V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 3V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 6L10 3L13 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="next-btn" onClick={onNext}>
            다른 명언 보기
          </button>
        </div>
      </div>
    </div>
  );
}
