"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ExternalLink, Github } from "lucide-react";

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string;
  liveLink?: string | null;
  githubLink?: string | null;
}

export default function ProjectLightbox({
  isOpen,
  onClose,
  title,
  imageSrc,
  liveLink,
  githubLink,
}: ProjectLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset loading state when image source changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [imageSrc]);

  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-ink-950/80 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} preview`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-ink-200 flex flex-col my-auto"
            style={{ maxHeight: "calc(100dvh - 2rem)" }}
          >
            {/* Modal Header */}
            <div className="bg-ink-100/90 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-ink-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
              </div>

              <div className="text-[11px] sm:text-xs font-mono text-ink-700 bg-white px-2.5 sm:px-3 py-1 rounded-md border border-ink-200/80 flex items-center gap-1.5 shadow-2xs max-w-[60%] truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
                <span className="truncate font-semibold">{title}</span>
                <span className="text-ink-400 font-normal hidden xs:inline">· Interface</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center rounded-lg text-ink-500 hover:text-ink-900 hover:bg-ink-200/70 active:scale-90 transition-all cursor-pointer"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Image Viewport */}
            <div className="relative bg-ink-950 max-h-[65dvh] sm:max-h-[72vh] overflow-y-auto overflow-x-hidden flex items-center justify-center lightbox-scroll">
              {/* Loading spinner */}
              {!imageLoaded && !imageError && (
                <div className="flex flex-col items-center justify-center gap-2.5 text-ink-400 bg-ink-950 z-10 py-16 w-full">
                  <Loader2 size={28} className="animate-spin text-accent-blue" />
                  <span className="text-xs font-mono text-ink-400">Loading preview...</span>
                </div>
              )}

              {/* Error fallback */}
              {imageError && (
                <div className="flex flex-col items-center justify-center gap-2 text-ink-400 bg-ink-950 z-10 p-8 text-center w-full">
                  <p className="text-sm text-ink-300">Preview image could not be loaded.</p>
                  {liveLink && (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent-blue font-semibold hover:underline mt-2"
                    >
                      Visit live site instead <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}

              {/* Interface Screenshot Image */}
              <img
                src={imageSrc}
                alt={`${title} interface preview`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-auto max-h-[65dvh] sm:max-h-[72vh] object-contain block select-none transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 bg-ink-50 border-t border-ink-100 flex items-center justify-between text-xs flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-medium text-ink-700 text-[11px] sm:text-xs truncate">
                  {title} · Full Preview
                </span>
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-blue hover:underline"
                  >
                    Live site <ExternalLink size={11} />
                  </a>
                )}
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-ink-500 hover:text-ink-900"
                  >
                    <Github size={11} /> Code
                  </a>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-ink-400 text-2xs hidden sm:block">
                  Press ESC or click outside to close
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="sm:hidden px-2.5 py-1 rounded bg-ink-200/80 text-ink-700 text-[11px] font-semibold active:bg-ink-300"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
