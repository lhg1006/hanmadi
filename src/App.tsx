import { useState, useCallback, useRef, useEffect } from "react";
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

function getInitialScreen(): Screen {
  const params = new URLSearchParams(window.location.search);
  if (params.get("mode") === "dailyFive") return "dailyFive";
  return "home";
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
}

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isStandalone = window.matchMedia("(display-mode: standalone)").matches
  || ("standalone" in navigator && (navigator as unknown as { standalone: boolean }).standalone);

function App() {
  const [screen, setScreen] = useState<Screen>(getInitialScreen);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const queues = useRef<Record<string, Quote[]>>({});
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = useCallback(async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      setInstallPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  }, [installPrompt]);

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
            {!isStandalone && (installPrompt || isIOS) && (
              <button className="install-btn" onClick={handleInstall}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M5 8L9 12L13 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                홈 화면에 추가
              </button>
            )}
            <p className="home-footer-text">
              총 {categories.reduce((sum, c) => sum + c.quotes.length, 0)}개의 명언
            </p>
          </div>

          {showIOSGuide && (
            <>
              <div className="menu-overlay" onClick={() => setShowIOSGuide(false)} />
              <div className="ios-guide">
                <p className="ios-guide-title">홈 화면에 추가하기</p>
                <div className="ios-guide-steps">
                  <p>1. 하단의 <strong>공유 버튼</strong>을 탭하세요</p>
                  <p>2. <strong>"홈 화면에 추가"</strong>를 선택하세요</p>
                </div>
                <button className="ios-guide-close" onClick={() => setShowIOSGuide(false)}>확인</button>
              </div>
            </>
          )}
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
