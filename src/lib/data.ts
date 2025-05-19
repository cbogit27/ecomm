import { Collection, CollectionResponse, ProductResponse } from './types'

const collections: Collection[] = [
    {
      id: 'shirts',
      name: 'Shirts',
      slug: 'shirts',
      products: [
        {
          id: 's1',
          title: 'Classic White Shirt',
          price: 30,
          image: '/img/shirts/shirt3-bg.png',
          description: 'A crisp white shirt made from 100% cotton.',
        },
        {
          id: 's2',
          title: 'Flannel Shirt',
          price: 40,
          image: '/img/shirts/shirt4-bg.png',
          description: 'Warm flannel shirt perfect for cold seasons.',
        },
      ],
    },
    {
      id: 'jeans',
      name: 'Jeans',
      slug: 'jeans',
      products: [
        {
          id: 'j1',
          title: 'Slim Fit Jeans',
          price: 50,
          image: '/img/jeans/jeans1-bg.png',
          description: 'Stylish slim fit denim for all occasions.',
        },
        {
          id: 'j2',
          title: 'Ripped Blue Jeans',
          price: 55,
          image: '/img/jeans/jeans2-bg.png',
          description: 'Trendy ripped jeans with a comfortable stretch.',
        },
      ],
    },
    {
      id: 'shoes',
      name: 'Shoes',
      slug: 'shoes',
      products: [
        {
          id: 'sh1',
          title: 'Running Sneakers',
          price: 70,
          image: '/img/shoes/shoe1-bg.png',
          description: 'Lightweight sneakers built for performance.',
        },
        {
          id: 'sh2',
          title: 'Leather Boots',
          price: 90,
          image: '/img/shoes/shoe4-bg.png',
          description: 'Durable leather boots for rugged use.',
        },
      ],
    },
    {
      id: 'accessories',
      name: 'Accessories',
      slug: 'accessories',
      products: [
        {
          id: 'a1',
          title: 'Analog Wrist Watch',
          price: 120,
          image: '/img/accessories/accessories1-bg.png',
          description: 'Elegant wristwatch with leather strap.',
        },
        {
          id: 'a2',
          title: 'Bracelet Set',
          price: 25,
          image: '/img/accessories/accessories2-bg.png',
          description: 'Minimalist bracelet combo set.',
        },
      ],
    },
    {
      id: 'bags',
      name: 'Bags',
      slug: 'bags',
      products: [
        {
          id: 'b1',
          title: 'Backpack',
          price: 65,
          image: '/img/bags/bags2-bg.png',
          description: 'Spacious backpack ideal for daily carry.',
        },
        {
          id: 'b2',
          title: 'Leather Messenger Bag',
          price: 85,
          image: '/img/bags/bags1-bg.png',
          description: 'Sleek leather bag for office and casual outings.',
        },
      ],
    },
    {
      id: 'gadgets',
      name: 'Gadgets',
      slug: 'gadgets',
      products: [
        {
          id: 'g1',
          title: 'Wireless Earbuds',
          price: 45,
          image: '/img/gadgets/gadgets3-bg.png',
          description: 'Bluetooth-enabled noise-canceling earbuds.',
        },
        {
          id: 'g2',
          title: 'Smartwatch',
          price: 150,
          image: '/img/gadgets/gadgets2-bg.png',
          description: 'Track your fitness and receive notifications on the go.',
        },
      ],
    },
  ];
  
  export const getCollections = async (): Promise<Collection[]> => {
    return collections
  }
  
  export const getCollectionWithProducts = async (slug: string): Promise<CollectionResponse> => {
    return collections.find(collection => collection.slug === slug) || null
  }
  
  export const getProductById = async (id: string): Promise<ProductResponse> => {
    for (const collection of collections) {
      const product = collection.products.find(product => product.id === id)
      if (product) return product
    }
    return null
  }