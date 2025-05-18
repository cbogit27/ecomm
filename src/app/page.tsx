import Collections from "@/components/Collections";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import VidHero from "@/components/VidHero";

const products = [
  "Product One", "Product Two", "Product Three",
  "Product Four", "Product Five", "Product Six",
];

const services = [
  "Web Development", "UI/UX Design", "Mobile Apps",
  "SEO Optimization", "Hosting", "Support",
];

export default function Home() {
  return (
    <main>
      <Hero/>
      <Marquee items={products} className="bg-white border-b border-gray-400/30" speed={15}/>
      <Collections/>
      <Marquee
        items={services}
        speed={15}
        className="bg-emerald-800/30 py-8"
        textClassName="text-md tracking-wider text-gray-200"
      />
      <VidHero/>
    </main>
  );
}
