"use client";

import { useEffect } from "react";
import { loadFont } from "@/lib/google-fonts";
import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Alumni Memories — gradient top/bottom overlays so the photo shows through */
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
      {/* ── Top gradient overlay with logo + badge ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start"
        style={{
          height: 220,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0) 100%)",
          padding: "16px 28px",
          gap: 16,
        }}
      >
        {/* School logo */}
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
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

      {/* Gold accent line — sits just above the main-title text slot */}
      <div
        className="absolute"
        style={{ left: 36, top: 873, width: 72, height: 2.5, backgroundColor: C.gold }}
      />

      {/* ── Bottom gradient overlay ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 320,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}
