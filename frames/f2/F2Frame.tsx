"use client";

import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Modern Editorial — full-photo with transparent overlays, school logo, gradient bands, vertical accent text */
export function F2Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Top gradient — darkens header area for text legibility */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 260, background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)" }}
      />

      {/* Header row: logo + school info + alumni badge */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: 110, paddingLeft: 60, paddingRight: 60 }}
      >
        {/* School logo — circular with white border */}
        <div
          className="shrink-0"
          style={{
            width: 72, height: 72, borderRadius: "50%",
            overflow: "hidden",
            border: "2.5px solid rgba(255,255,255,0.85)",
            marginRight: 16,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/school-logo.png"
            alt="School logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* School name + alumni association — rendered via text slots (slots positioned here) */}
        <div className="flex-1" />

        {/* ALUMNI badge top-right */}
        <div
          style={{
            background: C.gold,
            color: "#1A1A14",
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 3,
            padding: "9px 18px",
          }}
        >
          ALUMNI &#39;26
        </div>
      </div>

      {/* Thin gold separator under header */}
      <div
        className="absolute left-0 right-0"
        style={{ top: 110, height: 1, background: "rgba(232,198,107,0.35)" }}
      />

      {/* Right-edge vertical text: SARATGANJ · MEMORIES · VOL. 01 */}
      <div
        className="absolute top-0 bottom-0 right-0 flex items-center justify-center"
        style={{ width: 38 }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Inter",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: 4,
            transform: "rotate(90deg)",
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          SARATGANJ · MEMORIES · VOL. 01
        </span>
      </div>

      {/* Bottom dark gradient */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 420, background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0) 100%)" }}
      />

      {/* Gold accent line above title */}
      <div
        className="absolute"
        style={{ left: 60, bottom: 178, width: 52, height: 3, background: C.gold }}
      />
    </div>
  );
}
