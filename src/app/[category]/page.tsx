import { client } from "@/lib/sanity";
import { simplifiedProduct } from "../interface";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"]{
    _id,
    "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
  }`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);
  const cedisSign = "\u20B5";

  return (
    <div className="bg-background ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center items-center h-full">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {params.category}
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
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
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>

                  {/* ⭐ Rating Stars */}
                  <div className="flex items-center space-x-1 mt-1 text-gray-300 dark:text-yellow-400">
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
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex gap-6 flex-wrap justify-center">
          {/* Men */}
          <Link
            href="/Men"
            className="relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full overflow-hidden shadow-md group"
          >
            <Image
              src="/maleitem.png" // ✅ replace with actual image path
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
