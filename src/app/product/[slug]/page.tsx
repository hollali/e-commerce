import { client } from "@/lib/sanity";
import CheckoutNow from "@/components/CheckoutNow";
import { fullProduct } from "@/app/interface";
import ImageGallery from "@/components/imageGallery";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import AddToBag from "@/components/AddToBag";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
    }`;

  const data = await client.fetch(query, { slug });
  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);
  const cedisSign = "\u20B5";

  return (
    <div className="bg-background text-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500 dark:text-gray-400">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 dark:dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:bg-clip-text dark:text-transparent lg:text-3xl">
                {data.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-400 dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:hover:from-purple-500 dark:hover:via-pink-500 dark:hover:to-blue-500 gap-x-2">
                <span className="text-sm text-white dark:text-gray-100">
                  4.5
                </span>
                <Star className="h-5 w-5 text-white dark:text-yellow-400" />
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 dark:text-gray-100 md:text-2xl">
                  {cedisSign} {data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  {cedisSign} {data.price + 20}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Incl. VAT. Shipping is different
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Truck className="h-6 w-6" />
              <span className="text-sm">4-6 Days delivery</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="GHS"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
              <CheckoutNow
                currency="GHS"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
            </div>

            <p className="mt-12 text-gray-500 dark:text-gray-400 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
