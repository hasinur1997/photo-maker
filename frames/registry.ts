import type { FrameDefinition, TextSlot } from "./types";
import type { FrameCustomization } from "@/lib/types";
import { F1Frame } from "./f1/F1Frame";
import { F2Frame } from "./f2/F2Frame";
import { F3Frame } from "./f3/F3Frame";
import { F4Frame } from "./f4/F4Frame";
import { F5Frame } from "./f5/F5Frame";
import { F6Frame } from "./f6/F6Frame";
import { F7Frame } from "./f7/F7Frame";
import { F8Frame } from "./f8/F8Frame";
import { F9Frame } from "./f9/F9Frame";
import { F10Frame } from "./f10/F10Frame";
import { F11Frame } from "./f11/F11Frame";

const BASE: FrameCustomization = {
  borderColor: "#ffffff",
  borderWidth: 0,
  opacity: 1,
  shadow: { enabled: false, x: 0, y: 4, blur: 16, spread: 0, color: "rgba(0,0,0,0.3)" },
};

// Helpers for common slot shapes
const schoolNameSlot = (y: number, color: string, size = 22, w = 780): TextSlot => ({
  id: "school-name",
  defaultText: "শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়",
  defaults: { x: (1080 - w) / 2, y, width: w, height: 40, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: size, color, textAlign: "center" },
});
const alumniSlot = (y: number, color: string, size = 11, w = 500): TextSlot => ({
  id: "alumni-assoc",
  defaultText: "ALUMNI ASSOCIATION",
  defaults: { x: (1080 - w) / 2, y, width: w, height: 24, fontFamily: "Inter", fontWeight: 700, fontSize: size, color, textAlign: "center" },
});

export const FRAMES: FrameDefinition[] = [
  {
    id: "f1",
    name: "Classic Polaroid",
    thumbnail: "/frames/f1.png",
    defaultCustomization: BASE,
    Component: F1Frame,
    textSlots: [
      schoolNameSlot(745, "#1C4A2B", 21),
      alumniSlot(792, "#C8941A", 10),
    ],
  },
  {
    id: "f2",
    name: "Modern Editorial",
    thumbnail: "/frames/f2.png",
    defaultCustomization: BASE,
    Component: F2Frame,
    textSlots: [
      { id: "school-name", defaultText: "শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়", defaults: { x: 122, y: 16, width: 520, height: 26, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: 18, color: "#FAF6ED", textAlign: "left" } },
      { id: "alumni-assoc", defaultText: "Alumni Association", defaults: { x: 122, y: 46, width: 340, height: 18, fontFamily: "Inter", fontWeight: 700, fontSize: 10, color: "#E8C66B", textAlign: "left" } },
      { id: "center-text", defaultText: "আমাদের অতীত স্মৃতি, আমাদের বন্ধন", defaults: { x: 140, y: 440, width: 800, height: 60, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: 36, color: "#FAF6ED", textAlign: "center" } },
    ],
  },
  {
    id: "f3",
    name: "Vintage Stamp",
    thumbnail: "/frames/f3.png",
    defaultCustomization: BASE,
    Component: F3Frame,
    textSlots: [
      schoolNameSlot(430, "#1C4A2B", 28),
      alumniSlot(475, "#C8941A"),
    ],
  },
  {
    id: "f4",
    name: "Bold Color Block",
    thumbnail: "/frames/f4.png",
    defaultCustomization: BASE,
    Component: F4Frame,
    textSlots: [
      { id: "school-name", defaultText: "শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়", defaults: { x: 120, y: 902, width: 500, height: 30, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: 16, color: "#1A1A14", textAlign: "left" } },
      { id: "alumni-assoc", defaultText: "ALUMNI ASSOCIATION", defaults: { x: 120, y: 935, width: 300, height: 20, fontFamily: "Inter", fontWeight: 700, fontSize: 9, color: "#C8941A", textAlign: "left" } },
    ],
  },
  {
    id: "f5",
    name: "Circular Portrait",
    thumbnail: "/frames/f5.png",
    defaultCustomization: BASE,
    Component: F5Frame,
    textSlots: [
      // Text below circle (circle bottom at y≈830, cream area 830-1080)
      schoolNameSlot(855, "#1A1A14", 24, 800),
      alumniSlot(893, "#C8941A", 10, 500),
    ],
  },
  {
    id: "f6",
    name: "Magazine Cover",
    thumbnail: "/frames/f6.png",
    defaultCustomization: BASE,
    Component: F6Frame,
    textSlots: [
      { id: "school-name", defaultText: "শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়", defaults: { x: 122, y: 17, width: 400, height: 26, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: 18, color: "#FFFFFF", textAlign: "left" } },
      { id: "main-title", defaultText: "স্মৃতির পাতায়", defaults: { x: 60, y: 700, width: 960, height: 80, fontFamily: "Galada", fontWeight: 400, fontSize: 72, color: "#FFFFFF", textAlign: "center" } },
    ],
  },
  {
    id: "f7",
    name: "Batch Badge",
    thumbnail: "/frames/f7.png",
    defaultCustomization: BASE,
    Component: F7Frame,
    textSlots: [
      // batch-year appears inside the gold circle badge (top-right: x=844, y=27, w=198, h=198)
      { id: "batch-year", defaultText: "2010", defaults: { x: 844, y: 72, width: 198, height: 80, fontFamily: "Inter", fontWeight: 700, fontSize: 48, color: "#0F3A1D", textAlign: "center" } },
      schoolNameSlot(840, "#1C4A2B", 18, 700),
      alumniSlot(875, "#C8941A", 9, 400),
    ],
  },
  {
    id: "f8",
    name: "Year Frame Giant",
    thumbnail: "/frames/f8.png",
    defaultCustomization: BASE,
    Component: F8Frame,
    textSlots: [
      { id: "batch-year", defaultText: "2015", defaults: { x: 0, y: 0, width: 1080, height: 280, fontFamily: "Inter", fontWeight: 500, fontSize: 300, color: "#1C4A2B", textAlign: "center" } },
      schoolNameSlot(940, "#1C4A2B", 18, 700),
    ],
  },
  {
    id: "f9",
    name: "Yearbook Card",
    thumbnail: "/frames/f9.png",
    defaultCustomization: BASE,
    Component: F9Frame,
    textSlots: [
      { id: "school-name", defaultText: "শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়", defaults: { x: 115, y: 73, width: 660, height: 26, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: 20, color: "#1C4A2B", textAlign: "left" } },
      { id: "alumni-assoc", defaultText: "ALUMNI ASSOCIATION · YEARBOOK", defaults: { x: 115, y: 103, width: 660, height: 18, fontFamily: "Inter", fontWeight: 700, fontSize: 10, color: "#C8941A", textAlign: "left" } },
      { id: "batch-year", defaultText: "Class of 1998", defaults: { x: 75, y: 480, width: 930, height: 50, fontFamily: "Inter", fontWeight: 700, fontSize: 36, color: "#1C4A2B", textAlign: "center" } },
    ],
  },
  {
    id: "f10",
    name: "Pennant Banner",
    thumbnail: "/frames/f10.png",
    defaultCustomization: BASE,
    Component: F10Frame,
    textSlots: [
      { id: "school-name", defaultText: "শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়", defaults: { x: 136, y: 25, width: 700, height: 28, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: 20, color: "#FFFFFF", textAlign: "left" } },
      { id: "alumni-assoc", defaultText: "ALUMNI ASSOCIATION", defaults: { x: 136, y: 58, width: 500, height: 18, fontFamily: "Inter", fontWeight: 700, fontSize: 10, color: "#E8C66B", textAlign: "left" } },
      { id: "batch-text", defaultText: "BATCH 2003", defaults: { x: 140, y: 436, width: 800, height: 50, fontFamily: "Inter", fontWeight: 800, fontSize: 40, color: "#FAF6ED", textAlign: "center" } },
    ],
  },
  {
    id: "f11",
    name: "Stamped Year",
    thumbnail: "/frames/f11.png",
    defaultCustomization: BASE,
    Component: F11Frame,
    textSlots: [
      { id: "school-name", defaultText: "শরৎগঞ্জ তফিজ উদ্দিন আহমেদ উচ্চ বিদ্যালয়", defaults: { x: 118, y: 60, width: 560, height: 26, fontFamily: "Hind Siliguri", fontWeight: 700, fontSize: 18, color: "#1C4A2B", textAlign: "left" } },
      { id: "alumni-assoc", defaultText: "ALUMNI ASSOCIATION", defaults: { x: 118, y: 90, width: 400, height: 18, fontFamily: "Inter", fontWeight: 700, fontSize: 10, color: "#C8941A", textAlign: "left" } },
      { id: "batch-year", defaultText: "BATCH 2008", defaults: { x: 60, y: 500, width: 960, height: 60, fontFamily: "Inter", fontWeight: 800, fontSize: 48, color: "#1C4A2B", textAlign: "center" } },
    ],
  },
];

export function getFrame(id: string): FrameDefinition | undefined {
  return FRAMES.find((f) => f.id === id);
}
