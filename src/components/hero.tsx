// components/Hero.tsx (SERVER COMPONENT)
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "../lib/sanity";
import HeroText from "./heroText";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";
  return await client.fetch(query);
}

export default async function Hero() {
  const data = await getData();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8 mt-4 bg-background transition-colors">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        {/* GSAP TEXT */}
        <HeroText />

        {/* Images */}
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-muted shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()}
              alt="Great Photo"
              className="h-full w-full object-cover"
              width={500}
              height={500}
              priority
            />
          </div>

          <div className="overflow-hidden rounded-lg bg-muted shadow-lg">
            <Image
              src={urlFor(data.image2).url()}
              alt="Great Photo"
              className="h-full w-full object-cover"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>

      {/* Category bubbles */}
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex gap-6 flex-wrap justify-center">
          <Link
            href="/Men"
            className="relative flex h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden shadow-md group"
          >
            <Image
              src="/maleitem.png"
              alt="Men"
              fill
              className="object-cover transition group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white bg-black/40 dark:bg-black/60">
              Men
            </span>
          </Link>

          <Link
            href="/Women"
            className="relative flex h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden shadow-md group"
          >
            <Image
              src="/model.jpeg"
              alt="Women"
              fill
              className="object-cover transition group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white bg-black/40 dark:bg-black/60">
              Women
            </span>
          </Link>

          <Link
            href="/Accessories"
            className="relative flex h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden shadow-md group"
          >
            <Image
              src="/bracelets.jpeg"
              alt="Accessories"
              fill
              className="object-cover transition group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white bg-black/40 dark:bg-black/60">
              Accessories
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
