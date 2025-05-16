import Collections from "@/components/Collections";
import Hero from "@/components/Hero";
import Animation from "@/components/InfiniteHorizonAnimation";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Animation/>
      <Collections/>
    </main>
  );
}
