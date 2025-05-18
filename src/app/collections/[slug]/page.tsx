// app/collections/[slug]/page.tsx
import { getCollectionWithProducts } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = await getCollectionWithProducts(params.slug)

  if (!collection) return notFound()

  return (
    <div>
      <h1 className="text-3xl font-bold">{collection.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {collection.products.map(product => (
          <a key={product.id} href={`/collections/${collection.slug}/products/${product.id}`}>
            <div className="border p-4 rounded hover:shadow-lg">
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>${product.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
