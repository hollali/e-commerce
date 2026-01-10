import { client } from "@/lib/sanity";

export async function searchProducts({
    q,
    category,
    min,
    max,
}: {
    q?: string;
    category?: string;
    min?: number;
    max?: number;
}) {
    return client.fetch(
        `
    {
      "products": *[
        _type == "product"
        && ($q == null || name match $q || description match $q)
        && ($category == null || category->name == $category)
        && ($min == null || price >= $min)
        && ($max == null || price <= $max)
      ] | order(name asc) {
        _id,
        name,
        price,
        images,
        "slug": slug.current,
        "category": category->name
      },

      "categories": *[
        _type == "category"
        && ($q == null || name match $q)
      ] | order(name asc) {
        _id,
        name
      }
    }
    `,
        {
            q: q ? `*${q}*` : null,
            category: category ?? null,
            min: min ?? null,
            max: max ?? null,
        }
    );
}
