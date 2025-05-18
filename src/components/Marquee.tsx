// components/Marquee.tsx
"use client";
import React, { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number; // in seconds
  className?: string;
  textClassName?: string;
}

export default function Marquee({
  items,
  speed = 20,
  className = "",
  textClassName = "text-lg uppercase font-medium text-gray-700",
}: MarqueeProps) {
  const [duplicates, setDuplicates] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const uniqueId = React.useId(); // for isolated animation names

  // Calculate how many duplicates are needed
  useEffect(() => {
    const calculateDuplicates = () => {
      if (!containerRef.current || !contentRef.current) return;

      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const contentWidth = contentRef.current.getBoundingClientRect().width;

      const neededDuplicates = Math.ceil((containerWidth * 2) / contentWidth) + 1;
      setDuplicates(Math.max(2, neededDuplicates));
    };

    calculateDuplicates();
    window.addEventListener("resize", calculateDuplicates);
    return () => window.removeEventListener("resize", calculateDuplicates);
  }, []);

  // Generate animation dynamically with a unique keyframe name
  useEffect(() => {
    const keyframeStyle = document.createElement("style");
    keyframeStyle.textContent = `
      @keyframes marquee-${uniqueId} {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-100% / ${duplicates + 1}));
        }
      }
      .animate-marquee-${uniqueId} {
        animation: marquee-${uniqueId} ${speed}s linear infinite;
      }
    `;
    document.head.appendChild(keyframeStyle);

    return () => {
      if (keyframeStyle.parentNode) {
        keyframeStyle.parentNode.removeChild(keyframeStyle);
      }
    };
  }, [duplicates, speed, uniqueId]);

  return (
    <div className={`w-full overflow-hidden py-12 relative ${className}`} ref={containerRef}>
      <div className={`flex whitespace-nowrap gap-16 animate-marquee-${uniqueId}`}>
        {/* Original content block */}
        <div ref={contentRef} className={`flex gap-16 ml-16 ${textClassName}`}>
          {items.map((item, i) => (
            <span key={`original-${i}`}>{item}</span>
          ))}
        </div>

        {/* Duplicated content */}
        {Array.from({ length: duplicates }).map((_, dupIndex) => (
          <div key={`dup-${dupIndex}`} className={`flex gap-16 ${textClassName}`}>
            {items.map((item, i) => (
              <span key={`dup-${dupIndex}-${i}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
