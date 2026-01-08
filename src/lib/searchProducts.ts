import { client } from "@/lib/sanity";

interface SearchProductsParams {
    q?: string | null;
    category?: string | null;
    min?: number | null;
    max?: number | null;
}

export async function searchProducts({
    q,
    category,
    min,
    max,
}: SearchProductsParams) {
    return client.fetch(
        `
    *[
      _type == "product"
      && ($q == null || pt::text(name + " " + description) match $q)
      && ($category == null || category->slug.current == $category)
      && ($min == null || price >= $min)
      && ($max == null || price <= $max)
    ]
    | order(name asc)
    {
      _id,
      name,
      description,
      price,
      "slug": slug.current,
      "category": category->name,
      "categorySlug": category->slug.current,
      images
    }
    `,
        {
            q: q ?? null,
            category: category ?? null,
            min: min ?? null,
            max: max ?? null,
        }
    );
}
