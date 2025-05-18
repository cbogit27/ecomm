// app/collections/[slug]/products/[id]/page.tsx
import Link from 'next/link'
import { getProductById } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { slug: string, id: string } }) {
  const product = await getProductById(params.id)

  if (!product) return notFound()

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
        <Link href={`/collections/${params.slug}`} className="text-green-600 hover:underline mb-4 inline-block">
          ← Back to {params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <img
            alt={product.title}
            src={product.image}
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-4 text-lg text-gray-700">{product.description}</p>
            <p className="mt-6 text-2xl font-semibold text-green-600">${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
