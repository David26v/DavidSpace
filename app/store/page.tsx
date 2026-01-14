"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { PRODUCTS, categories, licenseInfo, type Product, type ProductCategory, type LicenseType } from "@/constants/products";

const products = PRODUCTS;

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(price);
};

// Animated counter hook
const useCounter = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return { count, ref };
};

// Product Modal Component
const ProductModal = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>("pro");
  const [activeImage, setActiveImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsLoaded(true), 50);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [handleEscape]);

  const allImages = [product.image, ...(product.images || [])];
  const discount = product.originalPrice
    ? Math.round((1 - product.price[selectedLicense] / product.originalPrice[selectedLicense]) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div 
        className={`absolute inset-0 bg-[#030014]/95 backdrop-blur-xl transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#4f1cd4]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#c084fc]/15 rounded-full blur-[120px]" />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 group"
      >
        <svg className="w-5 h-5 text-white/70 group-hover:text-white group-hover:rotate-90 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col lg:flex-row transition-all duration-700 ${
          isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(15, 10, 40, 0.95) 0%, rgba(8, 5, 25, 0.98) 100%)",
          boxShadow: "0 50px 100px -20px rgba(79, 28, 212, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Left - Images */}
        <div className="lg:w-[55%] bg-black/30">
          {/* Main Image */}
          <div className="relative aspect-video lg:aspect-[4/3]">
            <Image
              src={allImages[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0520] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0520]/50 opacity-80" />
            
            {/* Badges */}
            <div className="absolute top-5 left-5 flex gap-2">
              {product.isNew && (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  ✦ NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  ★ BESTSELLER
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Image navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-3 p-5">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                    activeImage === idx 
                      ? "ring-2 ring-[#a855f7] ring-offset-2 ring-offset-[#0a0520] scale-105" 
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="p-5 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-medium">Built with</p>
            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech, idx) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Info */}
        <div className="lg:w-[45%] flex flex-col max-h-[90vh] lg:max-h-none overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-6 lg:p-8">
            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-white/20"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-white/50 ml-1">{product.rating}</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-sm text-white/50">{product.reviews} reviews</span>
              <span className="text-white/20">|</span>
              <span className="text-sm text-white/50">{product.sales} sales</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">{product.name}</h2>
            <p className="text-white/50 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* License Selection */}
          <div className="px-6 lg:px-8 pb-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">Select License</p>
            <div className="grid grid-cols-3 gap-3">
              {(["basic", "pro", "extended"] as LicenseType[]).map((license) => (
                <button
                  key={license}
                  onClick={() => setSelectedLicense(license)}
                  className={`relative p-4 rounded-2xl text-center transition-all duration-300 overflow-hidden ${
                    selectedLicense === license
                      ? "bg-gradient-to-br from-[#7c3aed]/30 to-[#a855f7]/20 border-[#a855f7]/50"
                      : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10"
                  } border`}
                >
                  {selectedLicense === license && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-4 h-4 text-[#a855f7]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">{licenseInfo[license].name}</span>
                  <span className="block text-xl font-bold text-white">
                    {formatPrice(product.price[license])}
                  </span>
                  {product.originalPrice && (
                    <span className="block text-xs text-white/30 line-through mt-1">
                      {formatPrice(product.originalPrice[license])}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* License Features */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#a855f7]/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white/80">{licenseInfo[selectedLicense].name} License</p>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {licenseInfo[selectedLicense].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                    <svg className="w-3 h-3 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="px-6 lg:px-8 pb-6 flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">What&apos;s Included</p>
            <div className="grid grid-cols-2 gap-2">
              {product.features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <svg className="w-4 h-4 text-[#a855f7] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-white/60">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer - CTA */}
          <div className="p-6 lg:p-8 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs text-white/40 uppercase tracking-wider">Total</span>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-white">{formatPrice(product.price[selectedLicense])}</p>
                  {product.originalPrice && (
                    <span className="text-sm text-white/30 line-through">
                      {formatPrice(product.originalPrice[selectedLicense])}
                    </span>
                  )}
                </div>
              </div>
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all text-sm font-medium flex items-center gap-2"
                >
                  Live Preview
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            <button
              className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
                boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Purchase Now
            </button>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-white/30">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Payment
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Instant Download
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

// Product Card Component
const ProductCard = ({
  product,
  onClick,
  index,
}: {
  product: Product;
  onClick: () => void;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        background: "linear-gradient(135deg, rgba(20, 15, 45, 0.8) 0%, rgba(10, 8, 30, 0.9) 100%)",
        boxShadow: isHovered 
          ? "0 30px 60px -15px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(168, 85, 247, 0.2)"
          : "0 10px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gradient border effect */}
      <div 
        className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, transparent 50%, rgba(124, 58, 237, 0.3) 100%)",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0520] via-[#0a0520]/50 to-transparent" />
        <div className={`absolute inset-0 bg-[#7c3aed]/10 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.isNew && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
              Bestseller
            </span>
          )}
          {product.isFeatured && !product.isBestseller && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/30 backdrop-blur-md">
              Featured
            </span>
          )}
        </div>

        {/* Quick View overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center gap-2 transform transition-transform duration-500"
               style={{ transform: isHovered ? "translateY(0)" : "translateY(20px)" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Quick View
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating & Sales */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-white/70">{product.rating}</span>
          </div>
          <span className="text-xs text-white/30">{product.sales} sales</span>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${isHovered ? "text-[#c084fc]" : "text-white"}`}>
          {product.name}
        </h3>
        <p className="text-sm text-white/40 mb-4 line-clamp-2 leading-relaxed">{product.shortDescription}</p>

        {/* Tech Stack Preview */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/5 text-white/50 border border-white/10">
              {tech}
            </span>
          ))}
          {product.techStack.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/5 text-white/50 border border-white/10">
              +{product.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/30">From</span>
            <p className="text-2xl font-bold text-white">{formatPrice(product.price.basic)}</p>
          </div>
          <button 
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              isHovered 
                ? "bg-[#a855f7] text-white shadow-lg shadow-[#a855f7]/30" 
                : "bg-white/5 text-white/70 border border-white/10 hover:border-white/20"
            }`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Stats component
const StatsSection = () => {
  const stat1 = useCounter(1200, 2000);
  const stat2 = useCounter(50, 1500);
  const stat3 = useCounter(98, 1800);

  return (
    <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
      <div ref={stat1.ref} className="text-center">
        <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat1.count}+</p>
        <p className="text-sm text-white/40">Happy Customers</p>
      </div>
      <div ref={stat2.ref} className="text-center">
        <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat2.count}+</p>
        <p className="text-sm text-white/40">Products Sold</p>
      </div>
      <div ref={stat3.ref} className="text-center">
        <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat3.count}%</p>
        <p className="text-sm text-white/40">Satisfaction Rate</p>
      </div>
    </div>
  );
};

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#030014" }}>
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4f1cd4]/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#7c3aed]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[150px]" />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Premium Digital Products</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="text-white">Templates &</span>
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)" }}
            >
              Developer Kits
            </span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Production-ready templates, UI kits, and starter kits crafted by a developer 
            who ships real products. Save weeks of development time.
          </p>

          {/* Stats */}
          <StatsSection />

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-white/30">
            {[
              { icon: "✓", text: "Production-Ready" },
              { icon: "↻", text: "Regular Updates" },
              { icon: "◈", text: "Dev Support" },
              { icon: "↓", text: "Instant Download" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[#a855f7]">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-10 w-px h-40 bg-gradient-to-b from-transparent via-[#a855f7]/30 to-transparent hidden lg:block" />
        <div className="absolute top-1/2 right-10 w-px h-40 bg-gradient-to-b from-transparent via-[#a855f7]/30 to-transparent hidden lg:block" />
      </section>

      {/* Search & Filter */}
      <section className="px-6 mb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div 
            className={`relative mb-8 transition-all duration-500 ${isSearchFocused ? "transform scale-[1.02]" : ""}`}
          >
            <div 
              className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                isSearchFocused ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)",
                filter: "blur(20px)",
              }}
            />
            <div className="relative">
              <svg 
                className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isSearchFocused ? "text-[#a855f7]" : "text-white/30"
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search templates, UI kits, dashboards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#a855f7]/50 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProductCategory)}
                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "text-white shadow-lg"
                    : "bg-white/[0.03] text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70"
                }`}
                style={activeCategory === cat.id ? {
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.5)",
                } : {}}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 mb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-white/50 text-lg mb-2">No products found</p>
              <p className="text-white/30 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Buy Section */}
      <section className="px-6 py-24 relative">
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%)",
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#a855f7] font-medium">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Built Different</h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Unlike marketplace templates, these products are built from real-world experience and maintained with care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Production-Ready",
                description: "Not just demos—these templates power real client projects",
                color: "#a855f7",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
                title: "Clean Code",
                description: "Well-organized, documented, and following best practices",
                color: "#22c55e",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: "Regular Updates",
                description: "Bug fixes, new features, and compatibility improvements",
                color: "#f59e0b",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "Direct Support",
                description: "Get help from the developer who built it—not a support team",
                color: "#3b82f6",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 15, 45, 0.6) 0%, rgba(10, 8, 30, 0.8) 100%)",
                  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#a855f7] font-medium">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">Common Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "What's included in the download?",
                a: "You'll receive the complete source code, documentation, and any design files (Figma) if included. Everything is organized and ready to use.",
              },
              {
                q: "Can I use this for client projects?",
                a: "Yes! With the Pro or Extended license, you can use the templates for unlimited client projects. The Basic license is for personal use only.",
              },
              {
                q: "Do you offer refunds?",
                a: "Due to the digital nature of the products, refunds are handled case-by-case. If there's a technical issue I can't resolve, I'll gladly refund your purchase.",
              },
              {
                q: "How do I get support?",
                a: "Pro and Extended license holders get priority email support. Basic license holders can access community support through GitHub discussions.",
              },
              {
                q: "Are updates free?",
                a: "Yes, updates are free for the duration of your license (6 months for Basic, 1 year for Pro, lifetime for Extended).",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 15, 45, 0.5) 0%, rgba(10, 8, 30, 0.7) 100%)",
                  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/[0.02] transition-colors">
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white/50 group-open:rotate-180 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative p-12 md:p-16 rounded-[2rem] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(20, 15, 45, 0.8) 100%)",
              boxShadow: "0 0 0 1px rgba(168, 85, 247, 0.2), 0 40px 80px -20px rgba(168, 85, 247, 0.2)",
            }}
          >
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7c3aed]/20 rounded-full blur-[80px]" />
            
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Something Custom?</h2>
              <p className="text-white/50 mb-10 max-w-xl mx-auto">
                Can&apos;t find exactly what you need? I also offer custom development services. 
                Let&apos;s discuss your project requirements.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back to home */}
      <div className="text-center px-6 pb-16 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#a855f7] transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </main>
  );
}