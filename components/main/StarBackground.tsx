"use client";

import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: { isMobile: boolean }) => {
  const ref = useRef<any>();
  // Reduce particles on mobile for better performance
  const particleCount = props.isMobile ? 2000 : 5000;
  
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(particleCount * 3), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      // Slower rotation on mobile to reduce GPU usage
      const speed = props.isMobile ? 0.5 : 1;
      ref.current.rotation.x -= (delta / 10) * speed;
      ref.current.rotation.y -= (delta / 15) * speed;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={props.isMobile ? 0.003 : 0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// CSS-based star fallback for low-end devices
const CSSStarsFallback = () => {
  return (
    <div className="w-full h-full fixed inset-0 z-[-1] overflow-hidden">
      <div className="stars-layer-1" />
      <div className="stars-layer-2" />
      <div className="stars-layer-3" />
      <style jsx>{`
        .stars-layer-1, .stars-layer-2, .stars-layer-3 {
          position: absolute;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
        }
        .stars-layer-1 {
          background: radial-gradient(1px 1px at 20px 30px, white, transparent),
                      radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
                      radial-gradient(1px 1px at 50px 160px, white, transparent),
                      radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.6), transparent),
                      radial-gradient(1px 1px at 130px 80px, white, transparent),
                      radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.7), transparent);
          background-size: 200px 200px;
          animation: stars-move 100s linear infinite;
        }
        .stars-layer-2 {
          background: radial-gradient(1px 1px at 10px 10px, white, transparent),
                      radial-gradient(1.5px 1.5px at 150px 150px, rgba(255,255,255,0.9), transparent),
                      radial-gradient(1px 1px at 60px 100px, white, transparent),
                      radial-gradient(1.5px 1.5px at 175px 50px, rgba(255,255,255,0.8), transparent);
          background-size: 300px 300px;
          animation: stars-move 150s linear infinite;
        }
        .stars-layer-3 {
          background: radial-gradient(2px 2px at 25px 50px, rgba(180,155,255,0.6), transparent),
                      radial-gradient(2px 2px at 100px 200px, rgba(112,66,248,0.5), transparent),
                      radial-gradient(1.5px 1.5px at 200px 100px, rgba(255,255,255,0.7), transparent);
          background-size: 400px 400px;
          animation: stars-move 200s linear infinite reverse;
        }
        @keyframes stars-move {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
};

const StarsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [useWebGL, setUseWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check WebGL support and device capability
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setUseWebGL(false);
          return;
        }

        // Check for low-end mobile devices
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
        
        // Use CSS fallback for very low-end devices
        if (isMobileDevice && isLowEnd) {
          setUseWebGL(false);
        }
      } catch (e) {
        setUseWebGL(false);
      }
    };
    
    checkMobile();
    checkWebGLSupport();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) return null;

  // Use CSS fallback for devices that don't support WebGL well
  if (!useWebGL) {
    return <CSSStarsFallback />;
  }

  return (
    <div className="w-full h-full fixed inset-0 z-[-1]">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={isMobile ? 1 : [1, 2]} // Lower DPR on mobile
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <StarBackground isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
