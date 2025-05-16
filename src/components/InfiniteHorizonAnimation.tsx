"use client"
import React, { useRef, useEffect, useState } from "react";

export default function Animation() {
  const [duplicates, setDuplicates] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Calculate how many duplicates we need to fill the screen width
  useEffect(() => {
    const calculateDuplicates = () => {
      if (!containerRef.current || !contentRef.current) return;
      
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const contentWidth = contentRef.current.getBoundingClientRect().width;
      
      // We need at least enough duplicates to cover twice the screen width
      // This ensures we always have content to scroll to before resetting
      const neededDuplicates = Math.ceil((containerWidth * 2) / contentWidth) + 1;
      
      setDuplicates(Math.max(2, neededDuplicates));
    };
    
    calculateDuplicates();
    window.addEventListener('resize', calculateDuplicates);
    
    return () => window.removeEventListener('resize', calculateDuplicates);
  }, []);
  
  // Set up the CSS animation dynamically
  useEffect(() => {
    const keyframeStyle = document.createElement('style');
    keyframeStyle.textContent = `
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-100% / ${duplicates + 1}));
        }
      }
      
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
    `;
    document.head.appendChild(keyframeStyle);
    
    return () => {
      if (keyframeStyle.parentNode) {
        keyframeStyle.parentNode.removeChild(keyframeStyle);
      }
    };
  }, [duplicates]);
  
  // Products array - single source of truth
  const products = [
    "Product One",
    "Product Two",
    "Product Three",
    "Product Four",
    "Product Five",
    "Product Six",
    "Product Seven",
    "Product Eight"
  ];
  
  return (
    <div className="bg-white border-y border-gray-400/40">
      <div 
        ref={containerRef}
        className="w-full overflow-hidden py-16 relative"
      >
        <div className="flex whitespace-nowrap animate-marquee gap-16">
          {/* Original content block that we measure */}
          <div 
            ref={contentRef}
            className="flex gap-16 text-lg uppercase font-medium text-gray-700 ml-16"
          >
            {products.map((product, index) => (
              <span key={`original-${index}`}>{product}</span>
            ))}
          </div>
          
          {/* Duplicated blocks as needed */}
          {Array.from({ length: duplicates }).map((_, dupIndex) => (
            <div 
              key={`dup-${dupIndex}`}
              className="flex gap-16 text-lg uppercase font-medium text-gray-700"
            >
              {products.map((product, index) => (
                <span key={`dup-${dupIndex}-${index}`}>{product}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}