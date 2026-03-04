import { useState, useCallback } from "react";
import { categories } from "./data/quotes";
import type { Quote } from "./data/quotes";
import CategorySelector from "./components/CategorySelector";
import QuoteCard from "./components/QuoteCard";
import DailyFive from "./components/DailyFive";
import { QuoteIcon } from "./components/Icons";
import "./App.css";

type Screen = "home" | "quote" | "dailyFive";

function getRandomQuote(categoryId: string, current?: Quote | null): Quote | null {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return null;
  if (category.quotes.length <= 1) return category.quotes[0] ?? null;
  let next: Quote;
  do {
    const idx = Math.floor(Math.random() * category.quotes.length);
    next = category.quotes[idx];
  } while (current && next.text === current.text);
  return next;
}

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedCategory(id);
    setQuote(getRandomQuote(id));
    setScreen("quote");
  }, []);

  const handleNext = useCallback(() => {
    if (selectedCategory) {
      setQuote((prev) => getRandomQuote(selectedCategory, prev));
    }
  }, [selectedCategory]);

  const handleBack = useCallback(() => {
    setSelectedCategory(null);
    setQuote(null);
    setScreen("home");
  }, []);

  const handleChangeCategory = useCallback((id: string) => {
    setSelectedCategory(id);
    setQuote(getRandomQuote(id));
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
            <div className="header-icon"><QuoteIcon size={56} color="#333" /></div>
            <h1 className="title">오늘의 명언</h1>
            <p className="subtitle">
              당신에게 필요한 한마디를
              <br />
              만나보세요
            </p>
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
