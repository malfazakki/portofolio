"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from "lucide-react";

interface ProjectSlideshowProps {
  images: string[];
  title: string;
}

export default function ProjectSlideshow({ images, title }: ProjectSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = images.length;

  const nextSlide = useCallback(() => {
    if (total > 1) {
      setCurrentIndex((prev) => (prev + 1) % total);
    }
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total > 1) {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    }
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (total === 0) {
    return (
      <div className="w-full aspect-video bg-card border-4 border-primary retro-shadow flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-12 h-12 border-2 border-primary/50 flex items-center justify-center mb-3 bg-background">
          <ImageOff className="w-6 h-6 text-primary/70" />
        </div>
        <span className="text-xs font-mono font-bold tracking-wider text-primary">
          [ NO SCREENSHOTS YET ]
        </span>
        <span className="text-[10px] text-muted-foreground font-mono mt-1">
          Screenshot sedang disiapkan
        </span>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="space-y-4">
      {/* Main Slideshow Frame */}
      <div className="relative aspect-video w-full bg-background border-4 border-primary retro-shadow overflow-hidden group select-none">
        <img
          src={currentImage}
          alt={`${title} - Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover pixelated"
        />

        {/* Counter Badge */}
        {total > 1 && (
          <div className="absolute top-3 left-3 bg-background/90 border-2 border-primary px-2.5 py-1 text-[11px] font-mono font-bold text-primary retro-shadow">
            [ {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
          </div>
        )}

        {/* Fullscreen Trigger */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 p-1.5 bg-background/90 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors retro-shadow"
          title="Lihat Layar Penuh"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Navigation Arrows (if multiple) */}
        {total > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/90 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all retro-shadow opacity-90 group-hover:opacity-100"
              title="Slide Sebelumnya (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/90 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all retro-shadow opacity-90 group-hover:opacity-100"
              title="Slide Selanjutnya (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row (if multiple) */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-20 sm:w-24 aspect-video shrink-0 border-2 overflow-hidden transition-all ${
                  isActive
                    ? "border-primary scale-105 shadow-md ring-2 ring-primary"
                    : "border-muted opacity-60 hover:opacity-100 hover:border-primary/50"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover pixelated"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors retro-shadow"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full border-4 border-primary bg-background retro-shadow flex items-center justify-center overflow-hidden">
            <img
              src={currentImage}
              alt={`${title} - Layar Penuh`}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {total > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground retro-shadow"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground retro-shadow"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-3 text-xs font-mono text-primary font-bold">
            [ Slide {currentIndex + 1} of {total} ] • {title}
          </div>
        </div>
      )}
    </div>
  );
}

