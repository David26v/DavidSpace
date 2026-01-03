"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // Auto-close duration in ms (0 = no auto-close)
}

const toastConfig = {
  success: {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgGradient: "from-green-500/20 to-emerald-500/10",
    borderColor: "border-green-500/50",
    iconBg: "bg-green-500",
    titleColor: "text-green-400",
    progressColor: "bg-green-500",
  },
  error: {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgGradient: "from-red-500/20 to-rose-500/10",
    borderColor: "border-red-500/50",
    iconBg: "bg-red-500",
    titleColor: "text-red-400",
    progressColor: "bg-red-500",
  },
  warning: {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    bgGradient: "from-yellow-500/20 to-amber-500/10",
    borderColor: "border-yellow-500/50",
    iconBg: "bg-yellow-500",
    titleColor: "text-yellow-400",
    progressColor: "bg-yellow-500",
  },
  info: {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgGradient: "from-blue-500/20 to-cyan-500/10",
    borderColor: "border-blue-500/50",
    iconBg: "bg-blue-500",
    titleColor: "text-blue-400",
    progressColor: "bg-blue-500",
  },
};

export default function Toast({
  type,
  title,
  message,
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);
  const config = toastConfig[type];

  useEffect(() => {
    if (!isVisible) {
      setIsLeaving(false);
      setProgress(100);
      return;
    }

    if (duration > 0) {
      // Progress bar animation
      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
      }, 10);

      // Auto-close timer
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
      setIsLeaving(false);
      setProgress(100);
    }, 300);
  };

  if (!isVisible && !isLeaving) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] pointer-events-none">
      <div
        className={`
          pointer-events-auto
          w-[380px] max-w-[calc(100vw-48px)]
          rounded-2xl
          border ${config.borderColor}
          bg-gradient-to-r ${config.bgGradient}
          bg-[#0c0f1a]/95
          backdrop-blur-xl
          shadow-2xl
          overflow-hidden
          transform transition-all duration-300 ease-out
          ${isVisible && !isLeaving 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0"
          }
        `}
        style={{
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${
            type === "success" ? "rgba(34, 197, 94, 0.15)" :
            type === "error" ? "rgba(239, 68, 68, 0.15)" :
            type === "warning" ? "rgba(234, 179, 8, 0.15)" :
            "rgba(59, 130, 246, 0.15)"
          }`,
        }}
      >
        {/* Main Content */}
        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`
                w-12 h-12 rounded-xl ${config.iconBg}
                flex items-center justify-center
                text-white flex-shrink-0
                shadow-lg
              `}
              style={{
                boxShadow: `0 8px 20px ${
                  type === "success" ? "rgba(34, 197, 94, 0.4)" :
                  type === "error" ? "rgba(239, 68, 68, 0.4)" :
                  type === "warning" ? "rgba(234, 179, 8, 0.4)" :
                  "rgba(59, 130, 246, 0.4)"
                }`,
              }}
            >
              {config.icon}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0 pt-1">
              <h4 className={`font-semibold ${config.titleColor} text-base`}>
                {title}
              </h4>
              <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="
                w-8 h-8 rounded-lg
                flex items-center justify-center
                text-gray-500 hover:text-white
                hover:bg-white/10
                transition-all duration-200
                flex-shrink-0
              "
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {duration > 0 && (
          <div className="h-1 bg-white/5">
            <div
              className={`h-full ${config.progressColor} transition-all duration-100 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Hook for easier toast management
export function useToast() {
  const [toast, setToast] = useState<{
    isVisible: boolean;
    type: ToastType;
    title: string;
    message: string;
  }>({
    isVisible: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = (type: ToastType, title: string, message: string) => {
    setToast({ isVisible: true, type, title, message });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
    // Convenience methods
    success: (title: string, message: string) => showToast("success", title, message),
    error: (title: string, message: string) => showToast("error", title, message),
    warning: (title: string, message: string) => showToast("warning", title, message),
    info: (title: string, message: string) => showToast("info", title, message),
  };
}