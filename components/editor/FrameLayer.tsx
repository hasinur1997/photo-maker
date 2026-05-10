"use client";

import { useEditor } from "@/lib/store";
import { getFrame } from "@/frames/registry";

export function FrameLayer() {
  const frameId = useEditor((s) => s.frameId);
  const frameCustomization = useEditor((s) => s.frameCustomization);

  const frame = getFrame(frameId);
  if (!frame) return null;

  const { Component } = frame;
  return <Component customization={frameCustomization} />;
}
