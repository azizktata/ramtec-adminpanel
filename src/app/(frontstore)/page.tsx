import Banner from "@/components/frontstore/banner";
import CategoriesCarousel from "@/components/frontstore/categoriesCarousel";
import FeaturedProducts from "@/components/frontstore/featuredProducts";
import HeroSlider from "@/components/frontstore/heroSlider";
import ProductCarousel from "@/components/frontstore/productCarousel";
import ProductsByCategory from "@/components/frontstore/productsByCategory";
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
  const ShowBestOffers = async () => {
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: true,
        category: true,
        prices: true,
      },
    });

    return <ProductCarousel products={products} />;
  };
  // const ShowProductsByCategory = async () => {
  //   const products = await prisma.product.findMany({
  //     where: {
  //       category: {
  //         slug: "category",
  //       },
  //     },
  //     take: 8,
  //     include: {
  //       images: true,
  //       category: true,
  //       prices: true,
  //     },
  //   });

  //   return <FeaturedProducts products={products} />;
  // };
  const ShowPromoProducts = async () => {
    const promoProducts = await prisma.product.findMany({
      where: {
        prices: {
          discount: {
            gt: 0,
          },
        },
      },
      take: 10,
      include: {
        images: true,
        category: true,
        prices: true,
      },
    });
    return (
      <div className=" flex flex-col sm:flex-row gap-6">
        <Banner product={promoProducts[0]} />
        <Banner product={promoProducts[1]} />
        {/* <ProductCarousel products={promoProducts.slice(1)} /> */}
      </div>
    );
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
            <p className="text-xl">Explore Today&apos;s Featured Picks!</p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowFeaturedProducts />
          </Suspense>
        </div>
      </section>
      <section>
        <div className="container my-16">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="mb-2 text-3xl">Last Products</h2>
            <p className="text-xl">Explore our categories!</p>
          </div>
          <ProductsByCategory />
        </div>
      </section>
      <section>
        <div className="container my-16">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="mb-2 text-3xl">Best Offers</h2>
            <p className="text-xl">Explore our best products!</p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowBestOffers />
          </Suspense>
        </div>
      </section>
      <section>
        <div className="container my-16">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="mb-2 text-3xl">Promotions</h2>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowPromoProducts />
          </Suspense>
        </div>
      </section>
    </>
  );
}
