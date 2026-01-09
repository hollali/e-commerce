// app/search/page.tsx
import { searchProducts } from "@/lib/searchProducts";
import Link from "next/link";
import Image from "next/image";

export default async function SearchPage({ searchParams }: any) {
  const products = await searchProducts({
    q: searchParams.q,
    category: searchParams.cat,
    min: searchParams.min && Number(searchParams.min),
    max: searchParams.max && Number(searchParams.max),
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-xl font-semibold mb-4">
        Search results for “{searchParams.q}”
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex gap-6 flex-wrap justify-center">
          {/* Men */}
          <Link
            href="/Men"
            className="relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full overflow-hidden shadow-md group"
          >
            <Image
              src="/maleitem.png"
              alt="Men"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm md:text-lg bg-black/40 group-hover:bg-black/50 transition">
              Men
            </span>
          </Link>

          {/* Women */}
          <Link
            href="/Women"
            className="relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full overflow-hidden shadow-md group"
          >
            <Image
              src="/model.jpeg"
              alt="Women"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm md:text-lg bg-black/40 group-hover:bg-black/50 transition">
              Women
            </span>
          </Link>

          {/* Trimmings */}
          <Link
            href="/Accessories"
            className="relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full overflow-hidden shadow-md group"
          >
            <Image
              src="/bracelets.jpeg"
              alt="Trimmings"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm md:text-lg bg-black/40 group-hover:bg-black/50 transition">
              Accessories
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
