// app/search/page.tsx
import { searchProducts } from "@/lib/searchProducts";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

export default async function SearchPage({ searchParams }: any) {
  const cedisSign = "\u20B5";

  const { products, categories } = await searchProducts({
    q: searchParams.q,
    category: searchParams.cat,
    min: searchParams.min && Number(searchParams.min),
    max: searchParams.max && Number(searchParams.max),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 mt-24 lg:mt-32">
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
                href={`/search?cat=${encodeURIComponent(cat.name)}`}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
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

          <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: any) => (
              <div key={product._id} className="group relative">
                <Link href={`/product/${product.slug}`}>
                  <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                    {product.images?.[0] && (
                      <Image
                        src={urlFor(product.images[0])
                          .width(500)
                          .height(500)
                          .url()}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </div>
                </Link>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h6 className="text-sm text-blue-600 font-semibold">
                      <Link
                        href={`/product/${product.slug}`}
                        className="line-clamp-1"
                      >
                        {product.name}
                      </Link>
                    </h6>

                    {product.category && (
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                    )}

                    <div className="flex items-center space-x-1 mt-1 text-gray-300">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>

                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {cedisSign} {product.price}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 flex flex-col space-y-2 lg:hidden group-hover:flex">
                    <button className="p-2 rounded-full bg-white hover:bg-gray-100">
                      <FaHeart className="text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full bg-white hover:bg-gray-100">
                      <FaShoppingCart className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        categories.length === 0 && (
          <p className="text-gray-500">No results found.</p>
        )
      )}

      {/* ================= QUICK CATEGORY LINKS ================= */}
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
