// app/api/categories/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const sort = searchParams.get("sort") || "desc";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const searchValue = searchParams.get("q");
    const categoryParam = searchParams.getAll("c");
    const marqueParam = searchParams.getAll("m");
    const coef = parseInt(searchParams.get("coef") || "1");

    const categorySlugs = Array.isArray(categoryParam)
      ? categoryParam
      : categoryParam
      ? [categoryParam]
      : [];

    const marqueNames = Array.isArray(marqueParam)
      ? marqueParam
      : marqueParam
      ? [marqueParam]
      : [];
    const products = await prisma.product.findMany({
      take: 8 * coef,
      where: {
        name: {
          contains: searchValue || undefined,
        },
        prices: {
          price: {
            gte: minPrice ? parseFloat(minPrice) : undefined,
            lte: maxPrice ? parseFloat(maxPrice) : undefined,
          },
        },
        category: {
          some: {
            OR: [
              {
                slug: {
                  in: categorySlugs.length > 0 ? categorySlugs : undefined, // Parent categories
                },
              },
              {
                parent: {
                  slug: {
                    in: categorySlugs.length > 0 ? categorySlugs : undefined,
                  },
                },
              },
            ],
          },
        },
        marque: {
          name: {
            in: marqueNames.length > 0 ? marqueNames : undefined,
          },
        },
      },

      include: {
        category: true,
        prices: true,
        marque: true,
        images: {
          select: {
            url: true,
            id: true,
          },
        },
      },
      orderBy: {
        prices: {
          price: sort === "asc" ? "asc" : "desc",
        },
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
