"use client";

import { useEffect } from "react";
import { loadFont } from "@/lib/google-fonts";
import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Alumni Memories — solid black top/bottom bars, hardcoded school logo + Bengali title */
export function F12Frame({ customization: c }: FrameComponentProps) {
  useEffect(() => {
    void loadFont("Hind Siliguri", [400, 700]);
    void loadFont("Galada", [400]);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* ── Solid black top header ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: 115, backgroundColor: C.black, paddingLeft: 28, paddingRight: 28, gap: 16 }}
      >
        {/* School logo */}
        <div
          style={{
            width: 84, height: 84, borderRadius: "50%",
            overflow: "hidden",
            border: "2.5px solid rgba(255,255,255,0.85)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/school-logo.png"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* School name + association label */}
        <div style={{ flexShrink: 1, minWidth: 0 }}>
          <div style={{ color: C.white, fontSize: 20, fontWeight: 700, fontFamily: "'Hind Siliguri', sans-serif", lineHeight: 1.25 }}>
            শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়
          </div>
          <div style={{ color: C.gold, fontSize: 10, fontWeight: 700, letterSpacing: 4, marginTop: 6, fontFamily: "Inter, sans-serif" }}>
            ALUMNI ASSOCIATION
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* ALUMNI '26 badge */}
        <div
          style={{
            backgroundColor: C.gold,
            color: C.dark,
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 4,
            padding: "10px 16px",
            flexShrink: 0,
          }}
        >
          ALUMNI &#39;26
        </div>
      </div>

      {/* Thin gold separator under header */}
      <div
        className="absolute left-0 right-0"
        style={{ top: 115, height: 1, background: `rgba(200,148,26,0.3)` }}
      />

      {/* ── Right-edge vertical text ── */}
      <div
        className="absolute top-0 bottom-0 right-0 flex items-center justify-center"
        style={{ width: 40 }}
      >
        <span
          style={{
            color: C.gold,
            fontFamily: "Inter, sans-serif",
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: 5,
            transform: "rotate(90deg)",
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          SARATGANJ · MEMORIES VOL. 01
        </span>
      </div>

      {/* ── Solid black bottom section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col justify-center"
        style={{ height: 225, backgroundColor: C.black, padding: "18px 36px 26px" }}
      >
        {/* Gold accent line */}
        <div style={{ width: 72, height: 2.5, backgroundColor: C.gold, marginBottom: 12 }} />

        {/* Main title: আমাদের (white) স্মৃতি (gold italic) */}
        <div style={{ lineHeight: 1.05, marginBottom: 14 }}>
          <span style={{ color: C.white, fontSize: 80, fontWeight: 700, fontFamily: "'Hind Siliguri', sans-serif" }}>
            আমাদের{" "}
          </span>
          <span style={{ color: C.gold, fontSize: 80, fontWeight: 700, fontStyle: "italic", fontFamily: "'Galada', cursive" }}>
            স্মৃতি
          </span>
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", fontFamily: "'Hind Siliguri', sans-serif", lineHeight: 1.5 }}>
          প্রতিটি মুহূর্ত, প্রতিটি বন্ধন — আমাদের আলামনাই আসোসিয়েশনের গর্ব।
        </div>
      </div>
    </div>
  );
}
