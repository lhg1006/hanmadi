"use client";

import { useMemo } from "react";
import { categories } from "@/data/quotes";
import type { Quote } from "@/data/quotes";
import { CategoryIcon } from "./Icons";
import "./DailyFive.css";

interface DailyQuote {
  quote: Quote;
  categoryName: string;
  categoryId: string;
}

function getTodayFive(): DailyQuote[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  return categories.map((cat, i) => {
    const idx = (seed + i * 137) % cat.quotes.length;
    return {
      quote: cat.quotes[idx],
      categoryName: cat.name,
      categoryId: cat.id,
    };
  });
}

function formatText(text: string) {
  return text.split(/(?<=[.,]\s?)/).map((seg, i, arr) => (
    <span key={i}>
      {seg.trim()}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

interface Props {
  onBack: () => void;
}

export default function DailyFive({ onBack }: Props) {
  const dailyQuotes = useMemo(() => getTodayFive(), []);

  return (
    <div className="daily-five-screen">
      <div className="daily-five-topbar">
        <button className="daily-five-back" onClick={onBack}>
          <span className="daily-five-back-icon">‹</span>
          <span>돌아가기</span>
        </button>
        <span className="daily-five-date">
          {new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
        </span>
      </div>

      <div className="daily-five-scroll">
        <h2 className="daily-five-title">오늘의 다섯 명언</h2>

        <div className="daily-five-list">
          {dailyQuotes.map((item, i) => (
            <div className="daily-five-card" key={i}>
              <div className="daily-five-card-header">
                <CategoryIcon id={item.categoryId} size={20} />
                <span className="daily-five-cat-name">{item.categoryName}</span>
              </div>
              <p className="daily-five-text">{formatText(item.quote.text)}</p>
              <p className="daily-five-author">— {item.quote.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
