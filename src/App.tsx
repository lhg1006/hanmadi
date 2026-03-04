import { useState, useCallback } from "react";
import { categories } from "./data/quotes";
import type { Quote } from "./data/quotes";
import CategorySelector from "./components/CategorySelector";
import QuoteCard from "./components/QuoteCard";
import { QuoteIcon } from "./components/Icons";
import "./App.css";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedCategory(id);
    setQuote(getRandomQuote(id));
  }, []);

  const handleNext = useCallback(() => {
    if (selectedCategory) {
      setQuote((prev) => getRandomQuote(selectedCategory, prev));
    }
  }, [selectedCategory]);

  const handleBack = useCallback(() => {
    setSelectedCategory(null);
    setQuote(null);
  }, []);

  const selectedCat = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="app">
      {!quote ? (
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

          <footer className="home-footer">
            <p>총 {categories.reduce((sum, c) => sum + c.quotes.length, 0)}개의 명언</p>
          </footer>
        </div>
      ) : (
        <QuoteCard
          quote={quote}
          categoryName={selectedCat?.name ?? ""}
          categoryId={selectedCat?.id ?? ""}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
