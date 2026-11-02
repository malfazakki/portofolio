/**
 * Client-Side Image Compression using Browser Canvas API
 * Reduces large 5MB-20MB screenshots/photos to ~150KB-400KB in milliseconds
 * before sending over the network to Cloudinary.
 */

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  savedPercent: number;
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  targetFormat?: "image/webp" | "image/jpeg";
}

export async function compressImageClient(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.82,
    targetFormat = "image/webp",
  } = options;

  const originalSize = file.size;

  // If already small enough (under 250KB) and not a huge dimension image, skip
  if (file.size < 250 * 1024 && !file.type.includes("png")) {
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      savedPercent: 0,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Gagal membaca file gambar"));

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => reject(new Error("Gagal memuat elemen gambar untuk kompresi"));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaling preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // If canvas context fails, return original file
          return resolve({
            file,
            originalSize,
            compressedSize: originalSize,
            savedPercent: 0,
          });
        }

        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve({
                file,
                originalSize,
                compressedSize: originalSize,
                savedPercent: 0,
              });
            }

            const newExtension = targetFormat === "image/webp" ? ".webp" : ".jpg";
            const newFileName = file.name.replace(/\.[^/.]+$/, "") + newExtension;

            const compressedFile = new File([blob], newFileName, {
              type: targetFormat,
              lastModified: Date.now(),
            });

            const compressedSize = compressedFile.size;
            const savedPercent = Math.max(
              0,
              Math.round(((originalSize - compressedSize) / originalSize) * 100)
            );

            resolve({
              file: compressedFile,
              originalSize,
              compressedSize,
              savedPercent,
            });
          },
          targetFormat,
          quality
        );
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes to readable string (e.g. 1.2 MB or 340 KB)
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

