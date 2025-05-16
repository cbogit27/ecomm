"use client"
import Image from "next/image";
import { useRef, useState, useEffect, MouseEvent } from "react";

const collections = [
  { title: "Shirts", image: "/img/shirt-bg.png" },
  { title: "Jeans", image: "/img/jeans-bg.png" },
  { title: "Accessories", image: "/img/accessories-bg.png" },
  { title: "Shoes", image: "/img/shoe-bg.png" },
  { title: "Gadgets", image: "/img/gadgets-bg.png" },
];

export default function Collections() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  // Handle mouse down event for drag scrolling
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  // Handle mouse move event for drag scrolling
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up event for drag scrolling
  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  // Cleanup event listeners
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    const handleMouseLeave = () => {
      setIsDragging(false);
      scrollContainer.style.cursor = "grab";
    };
    
    // Add event listeners
    document.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    
    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="bg-white w-full py-16 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center space-y-8">
        {/* Section Header */}
        <div className="text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Our Collections</h2>
          <p className="text-sm font-light mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis adipisci libero rem suscipit...
          </p>
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </div>
        
        {/* Scrollable on mobile, grid on medium+ */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-thin md:overflow-visible scroll-smooth px-1 py-8"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ cursor: "grab" }}
        >
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-12 w-full">
            {collections.map(({ title, image }, index) => (
              <div
                key={index}
                className="min-w-[220px] md:min-w-0 flex-shrink-0 md:flex-shrink md:flex md:flex-col items-start text-start"
              >
                <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src={image}
                    alt={`${title} image`}
                    fill
                    className="transition-transform duration-300 ease-in-out hover:scale-105 object-cover"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h1 className="text-base font-semibold">{title}</h1>
                  <h4 className="text-sm text-gray-600">₦12,000</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}