"use client";

import Toast, { useToast } from "@/components/sub/Toast";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const contactReasons = [
  { value: "project", label: "Project inquiry", icon: "💼" },
  { value: "freelance", label: "Freelance engagement", icon: "🤝" },
  { value: "consulting", label: "Consulting / audit", icon: "🔍" },
  { value: "hiring", label: "Full-time opportunities", icon: "🚀" },
  { value: "other", label: "Other", icon: "💬" },
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
    color: "from-blue-500 to-cyan-500",
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
    color: "from-green-500 to-emerald-500",
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
    color: "from-purple-500 to-pink-500",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/David26v",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    color: "hover:bg-gray-700",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/david-rodrigo-fajardo/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:bg-blue-600",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vid_26.fajardo/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
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

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024;
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

// Floating Label Input Component
const FloatingInput = ({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        className="peer w-full rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#7042f8] focus:ring-2 focus:ring-[#7042f8]/20 transition-all duration-300"
        placeholder={label}
      />
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || hasValue
            ? "-top-2.5 text-xs bg-[#0c0f1a] px-2 text-[#b49bff]"
            : "top-4 text-gray-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast, success, error, warning, hideToast } = useToast();

  // Handle file selection
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: File[] = [];
    let totalSize = files.reduce((acc, f) => acc + f.size, 0);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (files.length + newFiles.length >= MAX_FILES) {
        warning("File Limit Reached", `You can only attach up to ${MAX_FILES} files.`);
        break;
      }

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        warning("Invalid File Type", `"${file.name}" is not a supported file type.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        warning("File Too Large", `"${file.name}" exceeds the 10MB limit.`);
        continue;
      }

      if (totalSize + file.size > MAX_TOTAL_SIZE) {
        warning("Total Size Exceeded", "Total attachments cannot exceed 25MB.");
        break;
      }

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

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

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

      formElement.reset();
      setFiles([]);
      setSelectedReason("");
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
    <main className="min-h-screen bg-[#030014] text-white pt-28 pb-16 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7042f8]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#b49bff]/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7042f8]/5 rounded-full blur-[150px]" />
      </div>

      {/* Toast Notification */}
      <Toast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />

      <section className="relative max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7042f8]/10 border border-[#7042f8]/30 text-[#b49bff] text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b49bff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b49bff]"></span>
            </span>
            Available for new projects
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#7042f8] via-[#b49bff] to-[#7042f8] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Connect
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss opportunities? I&apos;m always open to new ideas and collaborations. Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Side - Contact Information (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-5 hover:border-[#7042f8]/50 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7042f8]/0 via-[#7042f8]/5 to-[#b49bff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg`}>
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-[#b49bff] transition-colors font-medium truncate block"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium truncate">{info.value}</p>
                      )}
                    </div>
                    {info.href && (
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-[#b49bff] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-5">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#7042f8]/50 transition-all duration-300 ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Schedule a Call Card */}
            <Link
              href="/schedule"
              className="relative rounded-2xl border border-[#7042f8]/30 bg-gradient-to-br from-[#7042f8]/20 via-[#0c0f1a] to-[#b49bff]/10 p-6 cursor-pointer group hover:border-[#7042f8]/50 transition-all duration-300 overflow-hidden block"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7042f8]/0 via-[#7042f8]/10 to-[#7042f8]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7042f8] to-[#b49bff] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  style={{ boxShadow: "0 8px 30px rgba(112, 66, 248, 0.4)" }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#b49bff] transition-colors">
                    Prefer a live conversation?
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Book a free 30-minute discovery call to discuss your project.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#b49bff] text-sm font-medium">
                    Schedule with Calendly
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Response Time */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0f1220]/80 border border-[#2A0E61]/30">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">Quick Response</p>
                <p className="text-xs text-gray-500">Usually within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form (3 columns) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-[#2A0E61]/50 bg-[#0c0f1a]/80 backdrop-blur p-6 md:p-8 space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Send a Message</h2>
              <p className="text-gray-400 text-sm">
                Fill out the form below and I&apos;ll get back to you within one business day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput
                label="Your Name"
                name="name"
                required
                disabled={isSubmitting}
                maxLength={100}
              />
              <FloatingInput
                label="Email Address"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                maxLength={100}
              />
            </div>

            {/* Reason Selection - Visual Cards */}
            <div className="space-y-3">
              <label className="text-sm text-gray-400">What can I help with?</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {contactReasons.map((reason) => (
                  <label
                    key={reason.value}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      selectedReason === reason.value
                        ? "border-[#7042f8] bg-[#7042f8]/20 shadow-lg shadow-[#7042f8]/20"
                        : "border-[#2A0E61]/50 bg-[#0f1220] hover:border-[#7042f8]/50 hover:bg-[#0f1220]/80"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reason.value}
                      checked={selectedReason === reason.value}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="sr-only"
                      required
                      disabled={isSubmitting}
                    />
                    <span className="text-2xl">{reason.icon}</span>
                    <span className={`text-xs text-center font-medium ${
                      selectedReason === reason.value ? "text-white" : "text-gray-400"
                    }`}>
                      {reason.label}
                    </span>
                    {selectedReason === reason.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7042f8] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                required
                name="message"
                rows={5}
                maxLength={5000}
                className="w-full rounded-xl bg-[#0f1220] border border-[#2A0E61]/50 px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#7042f8] focus:ring-2 focus:ring-[#7042f8]/20 transition-all duration-300 resize-none"
                placeholder="Tell me about your project, timeline, and any specific requirements..."
                disabled={isSubmitting}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                Max 5000 characters
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-3">
              <label className="text-sm text-gray-400">
                Attachments <span className="text-gray-600">(optional)</span>
              </label>

              {/* Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer
                  transition-all duration-300
                  ${isDragging
                    ? "border-[#7042f8] bg-[#7042f8]/10 scale-[1.02]"
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
                      w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                      ${isDragging 
                        ? "bg-[#7042f8]/30 text-[#b49bff] scale-110 rotate-6" 
                        : "bg-[#7042f8]/10 text-[#7042f8]"
                      }
                    `}
                  >
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      <span className="text-[#b49bff] font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      PNG, JPG, PDF, DOC, XLS, ZIP up to 10MB each (max 5 files)
                    </p>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2 animate-fadeIn">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#0f1220] border border-[#2A0E61]/30 group hover:border-[#7042f8]/30 transition-all duration-300"
                    >
                      {file.type.startsWith("image/") ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#7042f8]/10 flex-shrink-0">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#7042f8]/10 flex items-center justify-center text-[#b49bff] flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                        disabled={isSubmitting}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  <div className="flex justify-between items-center text-xs text-gray-500 px-1 pt-1">
                    <span>{files.length} file{files.length !== 1 ? "s" : ""} attached</span>
                    <span>
                      Total: {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))} / 25MB
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-[#7042f8] to-[#b49bff] text-white font-semibold overflow-hidden transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#7042f8]/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#b49bff] to-[#7042f8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative flex items-center justify-center gap-2">
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
                    Send Message
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
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
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#b49bff] transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </section>


      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </main>
  );
}