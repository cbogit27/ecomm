// app/collections/[slug]/products/[id]/page.tsx
import { getProductById } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { slug: string, id: string } }) {
  const product = await getProductById(params.id)

  if (!product) return notFound()

  return (
    <div className="p-6">
      <img src={product.image} alt={product.title} className="w-full max-w-md" />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-lg mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  )
}
