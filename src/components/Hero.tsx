export default function Hero() {
    return (
      <div className="bg-[url('/img/hero1.jpg')] bg-center bg-cover bg-no-repeat w-full h-screen relative flex items-center justify-center">
        <div className="flex flex-col items-center text-center text-white px-4 space-y-8">
          <div className="space-y-8">
            <p className="text-sm uppercase font-medium">Lorem ipsum</p>
            <h1 className="text-2xl md:text-4xl uppercase font-bold tracking-wider">Lorem ipsum dolor sit amet.</h1>
            <p className="text-lg font-normal">Lorem ipsum dolor sit.</p>
          </div>
  
          <div className="flex gap-4 justify-center">
            <button className="bg-transparent border border-white rounded-full px-4 py-2 tracking-widest text-white text-lg uppercase">
              Shop now
            </button>
            <button className="bg-white rounded-full px-4 py-2 text-lg text-gray-800/40 tracking-widest uppercase">
              5% off
            </button>
          </div>
        </div>
      </div>
    );
  }
  