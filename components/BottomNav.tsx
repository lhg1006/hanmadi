"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./BottomNav.css";

const tabs = [
  {
    href: "/",
    label: "명언",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 6C10.5 5.2 8 4.8 4 5.2V18C8 17.6 10.5 18 12 18.8C13.5 18 16 17.6 20 18V5.2C16 4.8 13.5 5.2 12 6Z"
          stroke={active ? "#1a1a1a" : "#999"}
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill={active ? "#1a1a1a" : "none"}
          fillOpacity={active ? 0.08 : 0}
        />
        <line x1="12" y1="6" x2="12" y2="18.8" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    href: "/fortune",
    label: "운세",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.5" fill={active ? "#1a1a1a" : "none"} fillOpacity={active ? 0.08 : 0} />
        <path d="M12 8V12L15 14" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="5" r="1" fill={active ? "#1a1a1a" : "#999"} />
        <circle cx="12" cy="19" r="1" fill={active ? "#1a1a1a" : "#999"} />
        <circle cx="5" cy="12" r="1" fill={active ? "#1a1a1a" : "#999"} />
        <circle cx="19" cy="12" r="1" fill={active ? "#1a1a1a" : "#999"} />
      </svg>
    ),
  },
  {
    href: "/mypage",
    label: "마이",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="4" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.5" fill={active ? "#1a1a1a" : "none"} fillOpacity={active ? 0.08 : 0} />
        <path d="M4 20C4 17 7.6 14.5 12 14.5C16.4 14.5 20 17 20 20" stroke={active ? "#1a1a1a" : "#999"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  // 명언 카드 화면이나 dailyFive에서는 네비바 숨기기
  const hideNav = pathname.startsWith("/fortune/palm") ||
    pathname.startsWith("/fortune/face") ||
    pathname.startsWith("/fortune/saju") ||
    pathname.startsWith("/fortune/result") ||
    pathname.startsWith("/login");

  if (hideNav) return null;

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = tab.href === "/"
          ? pathname === "/"
          : pathname.startsWith(tab.href);
        return (
          <Link key={tab.href} href={tab.href} className={`nav-tab ${isActive ? "nav-active" : ""}`}>
            {tab.icon(isActive)}
            <span className="nav-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
