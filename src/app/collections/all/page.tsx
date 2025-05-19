'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCollections } from '@/lib/data' // adjust the path as needed

interface CategoryDisplay {
  title: string
  image: string
  items: number
  slug: string
}

export default function AllCollections() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<CategoryDisplay[]>([])

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    async function fetchCollections() {
      const data = await getCollections()
      const formatted = data.map((collection) => ({
        title: collection.name,
        image: collection.products[0]?.image || '/placeholder.png',
        items: collection.products.length,
        slug: collection.slug,
      }))
      setCategories(formatted)
    }
    fetchCollections()
  }, [])

  return (
    <div className="w-full px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="uppercase text-4xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Shop now, not later. Browse the best of our favorite pieces..
        </p>
      </div>

      <div className="relative">
        {/* Scroll buttons */}
        <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Scroll left"
            >
            ←
            </button>

            <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Scroll right"
            >
            →
            </button>

        {/* Horizontal scroll */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth px-4 py-8"
        >
          {categories.map((cat, index) => (
            <Link
              href={`/collections/${cat.slug}`}
              key={index}
              className="min-w-[300px] flex-shrink-0 bg-gradient-to-t from-transparent to-transparent text-white relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                width={300}
                height={200}
                className="object-contain w-full h-56"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4">
                <h3 className="uppercase font-semibold text-lg">{cat.title}</h3>
                <p className="text-sm">{cat.items} Items</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <ArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
