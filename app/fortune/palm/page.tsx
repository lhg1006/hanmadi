"use client";

import { useRouter } from "next/navigation";

export default function PalmPage() {
  const router = useRouter();
  return (
    <div style={{ padding: "20px", paddingTop: "calc(env(safe-area-inset-top, 12px) + 20px)" }}>
      <button onClick={() => router.back()} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "#666" }}>
        ‹ 뒤로
      </button>
      <h1 style={{ marginTop: "20px", fontSize: "22px", fontWeight: 800 }}>손금 분석</h1>
      <p style={{ marginTop: "8px", color: "#888" }}>준비 중입니다</p>
    </div>
  );
}
