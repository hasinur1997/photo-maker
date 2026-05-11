import * as htmlToImage from "html-to-image";
import { exportCanvasRef } from "./export-ref";

export type ExportFormat = "png" | "jpeg";
export type ExportEngine = "html-to-image" | "html2canvas";

export interface ExportOptions {
  format: ExportFormat;
  quality: number; // 0–1, only used for JPEG
  filename: string;
  engine: ExportEngine;
}

async function triggerDownload(dataUrl: string, filename: string): Promise<void> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportImage(options: ExportOptions): Promise<void> {
  const node = exportCanvasRef.current;
  if (!node) throw new Error("Export canvas not mounted");

  // Wait for all fonts to be committed to the document
  await document.fonts.ready;

  const { format, quality, filename, engine } = options;
  const ext = format === "png" ? "png" : "jpg";
  const fullFilename = filename.endsWith(`.${ext}`) ? filename : `${filename}.${ext}`;

  const baseOptions = {
    width: 1080,
    height: 1080,
    pixelRatio: 1,
    cacheBust: true,
    // Skip font-face CSS inlining — cross-origin Google Fonts sheets block cssRules access.
    // Fonts are already loaded via webfontloader and render correctly from the browser cache.
    skipFonts: true,
  } as const;

  let dataUrl: string;

  if (engine === "html-to-image") {
    if (format === "png") {
      dataUrl = await htmlToImage.toPng(node, baseOptions);
    } else {
      dataUrl = await htmlToImage.toJpeg(node, { ...baseOptions, quality });
    }
  } else {
    // html2canvas fallback — imported dynamically to keep initial bundle small
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(node, {
      width: 1080,
      height: 1080,
      useCORS: true,
      allowTaint: true,
    });
    const mimeType = format === "png" ? "image/png" : "image/jpeg";
    dataUrl = canvas.toDataURL(mimeType, quality);
  }

  await triggerDownload(dataUrl, fullFilename);
}
