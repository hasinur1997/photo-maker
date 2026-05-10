"use client";

import { useEditor } from "@/lib/store";

export function PhotoLayer() {
  const photo = useEditor((s) => s.photo);
  if (!photo) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src}
      alt=""
      draggable={false}
      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
    />
  );
}
