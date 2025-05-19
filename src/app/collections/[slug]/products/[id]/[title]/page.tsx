import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProductById } from '@/lib/data'
import PageWrapper from '@/components/PageWrapper'
import { MdArrowBackIosNew } from 'react-icons/md'


// Helper function to create SEO-friendly slugs
const createSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; id: string; title: string }> 
}): Promise<Metadata> {
  // Destructure params first to avoid direct property access
  const { id, slug } = await params
  const product = await getProductById(id)
  
  if (!product) {
    return { 
      title: 'Product Not Found',
      description: 'The requested product could not be found'
    }
  }

  const collectionName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${product.title} | ${collectionName} Collection`,
    description: product.description,
    alternates: {
      canonical: `/collections/${slug}/products/${id}/${createSlug(product.title)}`
    },
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{
        url: product.image,
        alt: product.title
      }]
    }
  }
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string; id: string; title: string }> 
}) {
  // Destructure params first to avoid direct property access
  const { id, slug, title } = await params
  const product = await getProductById(id)
  
  if (!product) notFound()

  // Verify URL matches current product title
  const expectedSlug = createSlug(product.title)
  if (title !== expectedSlug) {
    redirect(`/collections/${slug}/products/${id}/${expectedSlug}`)
  }

  const collectionName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <PageWrapper>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
        <div className="mb-8">
          <Link
            href={`/collections/${slug}`}
            className="inline-flex items-center text-gray-800/40 hover:text-gray-900 transition-colors duration-300"
            scroll={false}
          >
            <MdArrowBackIosNew size={20} />
            <span className="ml-2">Back to {collectionName}</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative w-full h-96 overflow-hidden rounded-lg">
            <Image
              alt={product.title}
              src={product.image}
              fill
              className="aspect-square w-full rounded-lg object-contain"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-lg text-gray-700">{product.description}</p>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold text-green-600">${product.price}</p>
              {'originalPrice' in product && product.originalPrice && (
                <p className="text-lg text-gray-500 line-through">${product.originalPrice}</p>
              )}
            </div>
            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}