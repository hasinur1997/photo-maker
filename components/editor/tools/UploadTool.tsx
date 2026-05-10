"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { RefreshCw, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/lib/store";
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_PHOTO_BYTES,
  handlePhotoFile,
} from "@/lib/photo";
import { cn } from "@/lib/utils";

export function UploadTool() {
  const photo = useEditor((s) => s.photo);
  const setPhoto = useEditor((s) => s.setPhoto);
  const clearPhoto = useEditor((s) => s.clearPhoto);

  const onDrop = useCallback(
    ([file]: File[]) => handlePhotoFile(file, setPhoto),
    [setPhoto]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: Object.fromEntries(ACCEPTED_PHOTO_TYPES.map((t) => [t, []])),
    maxSize: MAX_PHOTO_BYTES,
    multiple: false,
    onDropAccepted: onDrop,
    onDropRejected: (rejections) => {
      const code = rejections[0]?.errors[0]?.code;
      if (code === "file-too-large") {
        toast.error("File is too large. Maximum is 15 MB.");
      } else if (code === "file-invalid-type") {
        toast.error("Invalid file type. Upload PNG, JPEG, or WebP.");
      } else {
        toast.error("Could not upload file.");
      }
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <p className="text-sm font-medium text-foreground">Photo</p>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center select-none",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-7 w-7 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isDragActive ? "Drop to upload" : "Drop a photo here, or click to browse"}
        </p>
        <p className="text-xs text-muted-foreground/60">PNG · JPEG · WebP · max 15 MB</p>
      </div>

      {/* Current photo preview */}
      {photo && (
        <div className="flex flex-col gap-2">
          <div className="relative w-full aspect-square rounded-md overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt="Uploaded photo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={open}>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Replace
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive hover:text-destructive"
              onClick={clearPhoto}
            >
              <X className="h-3.5 w-3.5 mr-1.5" />
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
