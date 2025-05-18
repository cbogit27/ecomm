"use client"
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, MouseEvent } from "react";

const collections = [
  { title: "Shirts", slug: "shirts", image: "/img/shirts/shirt4-bg.png" },
  { title: "Jeans", slug: "jeans", image: "/img/jeans/jeans-bg.png" },
  { title: "Accessories", slug: "accessories", image: "/img/accessories/accessories-bg.png" },
  { title: "Shoes", slug: "shoes", image: "/img/shoes/shoe-bg.png" },
  { title: "Gadgets", slug: "gadgets", image: "/img/gadgets/gadgets-bg.png" },
];

export default function Collections() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleMouseLeave = () => {
      setIsDragging(false);
      scrollContainer.style.cursor = "grab";
    };

    document.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="bg-white w-full py-16 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center space-y-8">
        <div className="text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Our Collections</h2>
          <p className="text-sm font-light mb-2">
            Browse through a variety of our product categories.
          </p>
          <p className="text-sm font-light">
            Tap any to explore the full collection.
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-thin md:overflow-visible scroll-smooth px-1 py-8"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ cursor: "grab" }}
        >
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-12 w-full">
            {collections.map(({ title, image, slug }, index) => (
              <Link
                href={`/collections/${slug}`}
                key={index}
                className="min-w-[220px] md:min-w-0 flex-shrink-0 md:flex-shrink md:flex md:flex-col items-start text-start group"
              >
                <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`${title} image`}
                    fill
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105 object-cover"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h1 className="text-base font-semibold group-hover:underline">{title}</h1>
                  <h4 className="text-sm text-gray-600">View collection</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
