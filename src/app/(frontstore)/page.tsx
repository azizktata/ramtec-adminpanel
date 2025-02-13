import CategoriesCarousel from "@/components/frontstore/categoriesCarousel";
import FeaturedProducts from "@/components/frontstore/featuredProducts";
import HeroSlider from "@/components/frontstore/heroSlider";
import SkeletonFeaturedProducts from "@/components/skeleton/skeletonFeaturedProducts";
import prisma from "@/lib/db";
import { Ticket } from "lucide-react";
import React, { Suspense } from "react";

export default function page() {
  // const ShowHeroSlider = async () => {
  //   const sliderImages = await getCollectionProducts({
  //     collection: collections.hero_slider,
  //   });
  //   const { products } = sliderImages;
  //   return <HeroSlider products={products} />;
  // };
  const ShowFeaturedProducts = async () => {
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: true,
        category: true,
        prices: true,
      },
    });

    return <FeaturedProducts products={products} />;
  };

  return (
    <>
      <section>
        <div className="container my-6">
          <div className="bg-[#F5F5F5] py-10 rounded-md">
            <HeroSlider />
          </div>
        </div>
      </section>
      <section>
        <div className="container my-8">
          <div className="flex items-center gap-2 mb-3">
            <Ticket size={24} className="text-blue-500" />
            <p className="text-sm ">Categories</p>
          </div>
          <h2 className="text-2xl font-semibold mb-16">Browse by Category</h2>
          <CategoriesCarousel />
        </div>
      </section>
      <section>
        <div className="container my-16">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="mb-2 text-3xl">Featured Products</h2>
            <p className="text-xl">Explore Today's Featured Picks!</p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowFeaturedProducts />
          </Suspense>
        </div>
      </section>
    </>
  );
}
