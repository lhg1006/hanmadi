"use client";

import Link from "next/link";
import "./mypage.css";

export default function MyPage() {
  return (
    <div className="mypage-screen">
      <header className="mypage-header">
        <h1 className="mypage-title">마이페이지</h1>
      </header>

      <div className="mypage-login-prompt">
        <div className="login-prompt-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="18" r="8" stroke="#ccc" strokeWidth="2.5"/>
            <path d="M8 40C8 33 15 28 24 28C33 28 40 33 40 40" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="login-prompt-text">로그인하고 운세를 확인해보세요</p>
        <Link href="/login" className="login-prompt-btn">
          로그인
        </Link>
      </div>

      <div className="mypage-section">
        <h2 className="mypage-section-title">분석 히스토리</h2>
        <div className="mypage-empty">
          <p>아직 분석 내역이 없습니다</p>
        </div>
      </div>
    </div>
  );
}
