import { useState, useCallback, useRef } from "react";
import { categories } from "./data/quotes";
import type { Quote } from "./data/quotes";
import CategorySelector from "./components/CategorySelector";
import QuoteCard from "./components/QuoteCard";
import DailyFive from "./components/DailyFive";
import { QuoteIcon } from "./components/Icons";
import "./App.css";

type Screen = "home" | "quote" | "dailyFive";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const queues = useRef<Record<string, Quote[]>>({});

  const nextFromQueue = (catId: string): Quote => {
    if (!queues.current[catId] || queues.current[catId].length === 0) {
      const cat = categories.find((c) => c.id === catId)!;
      queues.current[catId] = shuffle(cat.quotes);
    }
    return queues.current[catId].pop()!;
  };

  const handleSelect = useCallback((id: string) => {
    setSelectedCategory(id);
    setQuote(nextFromQueue(id));
    setScreen("quote");
  }, []);

  const handleNext = useCallback(() => {
    if (selectedCategory) {
      setQuote(nextFromQueue(selectedCategory));
    }
  }, [selectedCategory]);

  const handleBack = useCallback(() => {
    setSelectedCategory(null);
    setQuote(null);
    setScreen("home");
  }, []);

  const handleChangeCategory = useCallback((id: string) => {
    setSelectedCategory(id);
    setQuote(nextFromQueue(id));
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedCategory(null);
    setQuote(null);
    setScreen("home");
  }, []);

  const handleGoDailyFive = useCallback(() => {
    setSelectedCategory(null);
    setQuote(null);
    setScreen("dailyFive");
  }, []);

  const selectedCat = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="app">
      {screen === "home" && (
        <div className="home-screen">
          <header className="header">
            <div className="header-top">
              <QuoteIcon size={24} color="#333" />
              <span className="header-app-name">한마디</span>
              <QuoteIcon size={24} color="#333" />
            </div>
            <h1 className="title">오늘의 명언</h1>
          </header>

          <CategorySelector
            categories={categories}
            selectedId={selectedCategory}
            onSelect={handleSelect}
          />

          <div className="home-bottom">
            <button className="daily-five-btn" onClick={() => setScreen("dailyFive")}>
              오늘의 다섯 명언 한번에 보기
            </button>
            <p className="home-footer-text">
              총 {categories.reduce((sum, c) => sum + c.quotes.length, 0)}개의 명언
            </p>
          </div>
        </div>
      )}

      {screen === "quote" && quote && (
        <QuoteCard
          quote={quote}
          categoryName={selectedCat?.name ?? ""}
          categoryId={selectedCat?.id ?? ""}
          categories={categories}
          onNext={handleNext}
          onBack={handleBack}
          onChangeCategory={handleChangeCategory}
          onGoHome={handleGoHome}
          onGoDailyFive={handleGoDailyFive}
        />
      )}

      {screen === "dailyFive" && (
        <DailyFive onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
