"use client";

import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="login-screen">
      <button className="login-back" onClick={() => router.back()}>
        <span className="login-back-icon">‹</span>
        <span>뒤로</span>
      </button>

      <div className="login-content">
        <div className="login-logo">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <path d="M16 8C14 7 11 6.5 7 7V23C11 22.5 14 23 16 24C18 23 21 22.5 25 23V7C21 6.5 18 7 16 8Z" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="16" y1="8" x2="16" y2="24" stroke="#1a1a1a" strokeWidth="1.2"/>
            <text x="16" y="7" textAnchor="middle" fontFamily="Georgia, serif" fontSize="8" fontWeight="bold" fill="#1a1a1a">&quot;</text>
          </svg>
        </div>
        <h1 className="login-title">한마디</h1>
        <p className="login-subtitle">로그인하고 AI 운세를 확인하세요</p>

        <div className="login-buttons">
          <button className="login-btn kakao-btn" onClick={() => {/* TODO: signIn('kakao') */}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C5.03 2 1 5.13 1 9C1 11.47 2.69 13.64 5.19 14.89L4.18 18.54C4.11 18.78 4.38 18.97 4.59 18.83L8.88 16.07C9.24 16.11 9.62 16.13 10 16.13C14.97 16.13 19 12.99 19 9.13C19 5.13 14.97 2 10 2Z" fill="#3C1E1E"/>
            </svg>
            카카오로 시작하기
          </button>

          <button className="login-btn google-btn" onClick={() => {/* TODO: signIn('google') */}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.17 10.2C18.17 9.57 18.12 8.95 18.01 8.36H10V11.84H14.58C14.37 12.97 13.72 13.94 12.77 14.58V16.83H15.58C17.22 15.33 18.17 13 18.17 10.2Z" fill="#4285F4"/>
              <path d="M10 19C12.43 19 14.47 18.15 15.58 16.83L12.77 14.58C11.97 15.11 10.93 15.42 10 15.42C7.66 15.42 5.67 13.91 4.96 11.82H2.07V14.14C3.55 17.08 6.55 19 10 19Z" fill="#34A853"/>
              <path d="M4.96 11.82C4.77 11.29 4.66 10.72 4.66 10.13C4.66 9.54 4.77 8.97 4.96 8.44V6.12H2.07C1.39 7.47 1 9 1 10.13C1 11.57 1.39 12.92 2.07 14.14L4.96 11.82Z" fill="#FBBC05"/>
              <path d="M10 4.84C11.47 4.84 12.44 5.38 13.15 6.06L15.64 3.57C14.46 2.47 12.43 1.27 10 1.27C6.55 1.27 3.55 3.18 2.07 6.12L4.96 8.44C5.67 6.35 7.66 4.84 10 4.84Z" fill="#EA4335"/>
            </svg>
            Google로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
