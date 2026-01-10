// app/search/page.tsx
import { searchProducts } from "@/lib/searchProducts";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default async function SearchPage({ searchParams }: any) {
  const cedisSign = "\u20B5";
  const { products, categories } = await searchProducts({
    q: searchParams.q,
    category: searchParams.cat,
    min: searchParams.min && Number(searchParams.min),
    max: searchParams.max && Number(searchParams.max),
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-xl font-semibold mb-6">
        Search results for “{searchParams.q || "All"}”
      </h1>

      {/* ================= CATEGORIES ================= */}
      {categories.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ================= PRODUCTS ================= */}
      {products.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <Link
                key={p._id}
                href={`/product/${p.slug}`}
                className="group border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  {p.images?.[0] && (
                    <Image
                      src={urlFor(p.images[0]).width(500).height(500).url()}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium group-hover:blue-400 mb-2 line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-blue-4600">
                    {cedisSign}
                    {p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        categories.length === 0 && (
          <p className="text-gray-500">No results found.</p>
        )
      )}

      {/* ================= QUICK CATEGORY LINKS (OPTIONAL) ================= */}
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row mt-16">
        <div className="flex gap-6 flex-wrap justify-center">
          <Link
            href="/Men"
            className="relative flex h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden shadow-md"
          >
            <Image
              src="/maleitem.png"
              alt="Men"
              fill
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white bg-black/40">
              Men
            </span>
          </Link>

          <Link
            href="/Women"
            className="relative flex h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden shadow-md"
          >
            <Image
              src="/model.jpeg"
              alt="Women"
              fill
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white bg-black/40">
              Women
            </span>
          </Link>

          <Link
            href="/Accessories"
            className="relative flex h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden shadow-md"
          >
            <Image
              src="/bracelets.jpeg"
              alt="Accessories"
              fill
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white bg-black/40">
              Accessories
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
