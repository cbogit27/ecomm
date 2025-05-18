import Link from 'next/link';
import React from 'react';

const VidHero = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-[-1]"
      >
        <source src="/vid/VidHero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-4xl font-bold space-y-8">
        <div className='flex gap-4'>
        <h5 className='uppercase text-sm font-light'>Free shipping</h5>
        <h1 className='uppercase text-2xl font-bold'>Discover new products, there is a range of Variety</h1>
        <p className='text-lg font-normal'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div className='flex gap-8'>
        <h5 className='uppercase text-lg font-light mb-8'>Fast delivery</h5>
        <h1 className='uppercase text-2xl font-bold my-4'>Get Items within a week</h1>
        <p className='text-lg font-normal mt-12'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <Link href={'/shop'} className='border border-gray-200 rounded-full px-6 py-2 tracking-wider text-lg font-light'>Discover now</Link>
      </div>
    </div>
  );
};

export default VidHero;
