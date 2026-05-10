import { toast } from "sonner";

export const ACCEPTED_PHOTO_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_PHOTO_BYTES = 15 * 1024 * 1024; // 15 MB

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("FileReader failed"));
    reader.readAsDataURL(file);
  });
}

/** Validate, read, and dispatch a photo file. Shows toasts on failure. */
export async function handlePhotoFile(
  file: File,
  setPhoto: (src: string) => void
): Promise<void> {
  if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
    toast.error("Invalid file type. Upload PNG, JPEG, or WebP.");
    return;
  }
  if (file.size > MAX_PHOTO_BYTES) {
    toast.error("File is too large. Maximum is 15 MB.");
    return;
  }
  try {
    const src = await readFileAsDataURL(file);
    setPhoto(src);
  } catch {
    toast.error("Failed to read the image file.");
  }
}
