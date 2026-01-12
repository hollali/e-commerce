import { simplifiedProduct } from "@/app/interface";
import { client } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();
  const cedisSign = "\u20B5";

  return (
    <div className="bg-background transition-colors">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:bg-clip-text dark:text-transparent">
            Our New Arrivals
          </h2>
          <Link
            className="font-semibold text-blue-600 flex items-center gap-x-1"
            href="/all"
          >
            <button className="relative px-1 py-1 rounded-full font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 overflow-hidden group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <div className="absolute inset-[2px] rounded-full bg-white dark:bg-gray-900 z-10"></div>
              <span className="relative z-20 flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-blue-500 transition-all duration-300">
                View All
                <ArrowRight className="w-5 h-5 text-purple-600 transition-transform duration-300 group-hover:translate-x-1" />
                {/*<svg
                  className="w-5 h-5 text-purple-600 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>*/}
              </span>
            </button>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-muted/20 group-hover:opacity-75 lg:h-80">
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
                  <h3 className="text-sm text-blue-600 font-semibold dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:bg-clip-text dark:text-transparent">
                    <Link
                      href={`/product/${product.slug}`}
                      className="line-clamp-1"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.categoryName}
                  </p>
                  {/* ⭐ Rating Stars */}
                  <div className="flex items-center space-x-1 mt-1 text-gray-300 dark:text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {cedisSign} {product.price}
                  </p>
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2 lg:hidden group-hover:flex">
                  <button className="p-2 rounded-full bg-card hover:bg-muted">
                    <FaHeart className="text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-full bg-card hover:bg-muted">
                    <FaShoppingCart className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
