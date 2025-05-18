import Link from 'next/link'
import { getCollectionWithProducts } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = await getCollectionWithProducts(params.slug)

  if (!collection) return notFound()

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">{collection.name}</h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {collection.products.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${collection.slug}/products/${product.id}`}
              className="group"
            >
              <div className="border rounded-lg p-4 hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
