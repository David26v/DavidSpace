"use client";

import Toast, { useToast } from "@/components/sub/Toast";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";

const contactReasons = [
  { value: "project", label: "Project inquiry" },
  { value: "freelance", label: "Freelance engagement" },
  { value: "consulting", label: "Consulting / audit" },
  { value: "hiring", label: "Full-time opportunities" },
  { value: "other", label: "Other" },
];

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "david.fajardo26v@gmail.com",
    href: "mailto:david.fajardo26v@gmail.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+63 976 259 4374",
    href: "tel:+639762594374",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Caloocan City, Philippines",
    href: null,
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/davidfajardo26",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/david-fajardo",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/LeL0uCh26/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/chinitz_david26/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

// Allowed file types and max size
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/zip",
  "application/x-rar-compressed",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB total
const MAX_FILES = 5;

// File type icons
const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  if (type === "application/pdf") {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
};

// Format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Calendly Modal Component
const CalendlyModal = ({ onClose }: { onClose: () => void }) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [handleEscape]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group"
      >
        <svg
          className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-[85vh] bg-[#0c0f1a] rounded-2xl overflow-hidden"
        style={{
          animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          boxShadow: "0 25px 80px -12px rgba(112, 66, 248, 0.3)",
          border: "1px solid rgba(112, 66, 248, 0.2)",
        }}
      >
        <div
          className="p-4 md:p-6 flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(112, 66, 248, 0.15) 0%, rgba(112, 66, 248, 0.05) 100%)",
            borderBottom: "1px solid rgba(112, 66, 248, 0.2)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center"
            style={{ boxShadow: "0 8px 30px rgba(112, 66, 248, 0.4)" }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Schedule a Call</h2>
            <p className="text-gray-400 text-sm">Pick a time that works for you</p>
          </div>
        </div>

        <div className="h-[calc(85vh-88px)] overflow-hidden">
          <div
            className="calendly-inline-widget w-full h-full"
            data-url="https://calendly.com/david-fajardo26v/30min?hide_gdpr_banner=1&background_color=0c0f1a&text_color=ffffff&primary_color=7042f8"
            style={{ minWidth: "320px", height: "100%" }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default function ContactPage() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast, success, error, warning, hideToast } = useToast();

  // Handle file selection
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: File[] = [];
    let totalSize = files.reduce((acc, f) => acc + f.size, 0);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Check file count
      if (files.length + newFiles.length >= MAX_FILES) {
        warning("File Limit Reached", `You can only attach up to ${MAX_FILES} files.`);
        break;
      }

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        warning("Invalid File Type", `"${file.name}" is not a supported file type.`);
        continue;
      }

      // Check individual file size
      if (file.size > MAX_FILE_SIZE) {
        warning("File Too Large", `"${file.name}" exceeds the 10MB limit.`);
        continue;
      }

      // Check total size
      if (totalSize + file.size > MAX_TOTAL_SIZE) {
        warning("Total Size Exceeded", "Total attachments cannot exceed 25MB.");
        break;
      }

      // Check for duplicates
      if (files.some((f) => f.name === file.name && f.size === file.size)) {
        continue;
      }

      newFiles.push(file);
      totalSize += file.size;
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Remove file
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // Add files to FormData
    files.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      success(
        "Message Sent Successfully! 🎉",
        "Thank you for reaching out! I'll get back to you within one business day."
      );

      // Reset form and files
      formElement.reset();
      setFiles([]);
    } catch (err) {
      error(
        "Failed to Send Message",
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16 px-6">
      {/* Toast Notification */}
      <Toast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />

      <section className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#b49bff]">Contact</p>
          <h1 className="text-4xl md:text-5xl font-semibold">Let&apos;s Connect</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;m always open to new ideas and collaborations. Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>

              <div className="space-y-5">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-[#7042f8]/10 border border-[#7042f8]/30 flex items-center justify-center text-[#b49bff] group-hover:bg-[#7042f8]/20 group-hover:border-[#7042f8]/50 transition-all duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-white hover:text-[#b49bff] transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-[#2A0E61]/30">
                <p className="text-sm text-gray-500 mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 flex items-center justify-center text-gray-400 hover:text-[#b49bff] hover:border-[#7042f8]/50 hover:bg-[#7042f8]/10 transition-all duration-300"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule a Call Card */}
            <div
              className="rounded-2xl border border-[#7042f8]/30 bg-gradient-to-br from-[#7042f8]/10 to-[#0c0f1a] p-6 md:p-8 cursor-pointer group hover:border-[#7042f8]/50 transition-all duration-300"
              onClick={() => setShowCalendly(true)}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ boxShadow: "0 8px 30px rgba(112, 66, 248, 0.3)" }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#b49bff] transition-colors">
                    Ready to discuss?
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Book a free 30-minute discovery call to discuss your project, goals, and how I can help.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#b49bff] text-sm font-medium">
                    Schedule with Calendly
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Card */}
            {/* <Link
              href="/store"
              className="block rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 p-6 md:p-8 group hover:border-[#7042f8]/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#facc15] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ boxShadow: "0 8px 30px rgba(249, 115, 22, 0.3)" }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#b49bff] transition-colors">
                    Looking for templates?
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Browse my collection of premium dashboard templates, UI kits, and starter kits.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#f97316] text-sm font-medium group-hover:text-[#facc15] transition-colors">
                    Visit Store
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link> */}

            {/* Availability Status */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0f1220]/80 border border-[#2A0E61]/30">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span className="text-sm text-gray-300">Currently available for new projects</span>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 space-y-6"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Send a Message</h2>
            <p className="text-gray-400 text-sm mb-6">
              Fill out the form below and I&apos;ll get back to you within one business day.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm text-gray-200">
                Name
                <input
                  required
                  name="name"
                  type="text"
                  maxLength={100}
                  className="rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7042f8] transition-colors"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-200">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  maxLength={100}
                  className="rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7042f8] transition-colors"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-200">
              What can I help with?
              <select
                required
                name="reason"
                className="rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 px-4 py-3 text-white focus:outline-none focus:border-[#7042f8] transition-colors"
                defaultValue=""
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {contactReasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-200">
              Message
              <textarea
                required
                name="message"
                rows={4}
                maxLength={5000}
                className="rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7042f8] transition-colors resize-none"
                placeholder="Tell me about your project, timeline, and any specific requirements..."
                disabled={isSubmitting}
              />
            </label>

            {/* File Upload Section */}
            <div className="space-y-3">
              <label className="text-sm text-gray-200">
                Attachments <span className="text-gray-500">(optional)</span>
              </label>

              {/* Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative rounded-xl border-2 border-dashed p-6 text-center cursor-pointer
                  transition-all duration-300
                  ${isDragging
                    ? "border-[#7042f8] bg-[#7042f8]/10"
                    : "border-[#2A0E61]/50 bg-[#0f1220]/50 hover:border-[#7042f8]/50 hover:bg-[#0f1220]"
                  }
                  ${isSubmitting ? "opacity-50 pointer-events-none" : ""}
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ALLOWED_FILE_TYPES.join(",")}
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  disabled={isSubmitting}
                />

                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${isDragging ? "bg-[#7042f8]/20 text-[#b49bff]" : "bg-[#7042f8]/10 text-[#7042f8]"}
                    `}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <span className="text-[#b49bff] font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      PNG, JPG, PDF, DOC, XLS, ZIP up to 10MB each (max 5 files, 25MB total)
                    </p>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#0f1220] border border-[#2A0E61]/30 group"
                    >
                      {/* File Preview / Icon */}
                      {file.type.startsWith("image/") ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#7042f8]/10 flex-shrink-0">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#7042f8]/10 flex items-center justify-center text-[#b49bff] flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                      )}

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        disabled={isSubmitting}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Total Size */}
                  <div className="flex justify-between items-center text-xs text-gray-500 px-1">
                    <span>{files.length} file{files.length !== 1 ? "s" : ""} attached</span>
                    <span>
                      Total: {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))} / 25MB
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ boxShadow: "0 4px 20px rgba(112, 66, 248, 0.3)" }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to receive communication from me regarding your inquiry.
            </p>
          </form>
        </div>

        {/* Back to home */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#b49bff] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </section>

      {/* Calendly Modal */}
      {showCalendly && <CalendlyModal onClose={() => setShowCalendly(false)} />}
    </main>
  );
}