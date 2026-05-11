"use client";

import { useEffect } from "react";
import { loadFont } from "@/lib/google-fonts";
import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Magazine Cover — dark gradient overlays, school logo top-left, title at bottom */
export function F6Frame({ customization: c }: FrameComponentProps) {
  useEffect(() => {
    void loadFont("Hind Siliguri", [400, 700]);
    void loadFont("Galada", [400]);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 280,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Top header row: logo | spacer | ALUMNI badge */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: 140, paddingLeft: 24, paddingRight: 24, gap: 16 }}
      >
        {/* School logo circle */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.85)",
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
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 3,
            padding: "10px 16px",
            flexShrink: 0,
          }}
        >
          ALUMNI &#39;26
        </div>
      </div>

      {/* Right-edge vertical text */}
      <div
        className="absolute top-0 bottom-0 right-0 flex items-center justify-center"
        style={{ width: 40 }}
      >
        <span
          style={{
            color: C.gold,
            fontFamily: "Inter, sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 4,
            transform: "rotate(90deg)",
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          SARATGANJ · MEMORIES VOL. 01
        </span>
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 380,
          background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Gold accent line — sits just above main-title text slot */}
      <div
        className="absolute"
        style={{ left: 54, top: 862, width: 64, height: 2.5, backgroundColor: C.gold }}
      />
    </div>
  );
}
