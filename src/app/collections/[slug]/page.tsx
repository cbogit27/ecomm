import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getCollections, getCollectionWithProducts } from '@/lib/data'
import PageWrapper from '@/components/PageWrapper'
import { MdArrowBackIosNew } from 'react-icons/md'

// No need for Params type - use direct object destructuring
export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map(collection => ({
    slug: collection.slug
  }))
}

// Modified params typing to use Promise
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionWithProducts(slug)
  
  if (!collection) return { 
    title: 'Collection Not Found',
    description: 'The requested collection could not be found'
  }
  
  return {
    title: `${collection.name} Collection`,
    description: `Browse our ${collection.name} collection`,
    alternates: {
      canonical: `/collections/${slug}`
    }
  }
}

export default async function CollectionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const collection = await getCollectionWithProducts(slug)
  
  if (!collection) notFound()

  return (
    <PageWrapper>
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/collections/all"
            className="inline-flex items-center text-gray-800/40 hover:text-gray-900 transition-colors duration-300"
            scroll={false}
          >
            <MdArrowBackIosNew size={20} />
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-10">{collection.name}</h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {collection.products.map(product => (
            <Link
              key={product.id}
              href={`/collections/${collection.slug}/products/${product.id}/${product.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')}`}
              className="group"
            >
              <div className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="relative w-full h-96 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="aspect-square w-full rounded-lg object-contain group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}