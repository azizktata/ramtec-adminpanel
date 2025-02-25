import CategoriesCarousel from "@/components/frontstore/categoriesCarousel";

import FeaturedProducts from "@/components/frontstore/featuredProducts";
import HeroSlider from "@/components/frontstore/heroSlider";
import { PartnersCarousel } from "@/components/frontstore/partnersCarousel";
import ProductCarousel from "@/components/frontstore/productCarousel";
import PromotionalAd from "@/components/frontstore/promotionalAd";
import PromotionsCarousel from "@/components/frontstore/promotionsCarousel";
import ServicesContainer from "@/components/frontstore/servicesContainer";

import prisma from "@/lib/db";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page() {
  // const ShowHeroSlider = async () => {
  //   const sliderImages = await getCollectionProducts({
  //     collection: collections.hero_slider,
  //   });
  //   const { products } = sliderImages;
  //   return <HeroSlider products={products} />;
  // };

  const ShowCategoriesSilder = async () => {
    const categories = await prisma.category.findMany({
      include: {
        parent: {
          select: {
            name: true,
          },
        },
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            slug: true,

            images: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });
    return <CategoriesCarousel categories={categories} />;
  };
  // const ShowCategoriesGrid = async () => {
  //   const categories = await prisma.category.findMany({
  //     include: {
  //       products: {
  //         select: {
  //           id: true,
  //           name: true,
  //           slug: true,
  //           description: true,
  //           images: {
  //             select: {
  //               url: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  //   return <CategoriesGrid categories={categories} />;
  // };
  const ShowFeaturedProducts = async () => {
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: true,
        category: true,
        prices: true,
        marque: true,
      },
    });

    return <FeaturedProducts products={products} />;
  };
  const ShowNewProducts = async () => {
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: true,
        category: true,
        prices: true,
        marque: true,
      },
    });

    return <ProductCarousel products={products} />;
  };

  const ShowPartnersCarousel = async () => {
    const marques = await prisma.marque.findMany({
      include: {
        image: {
          select: {
            url: true,
          },
        },
      },
    });

    return <PartnersCarousel marques={marques} />;
  };

  const ShowBestOffers = async () => {
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: true,
        category: true,
        prices: true,
        marque: true,
      },
    });

    return <ProductCarousel products={products} />;
  };

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
        marque: true,
      },
    });
    return (
      <div className=" flex flex-col lg:flex-row gap-6">
        {promoProducts.length >= 2 && (
          <PromotionsCarousel products={promoProducts} />
        )}
        {/* <ProductCarousel products={promoProducts.slice(1)} /> */}
      </div>
    );
  };
  return (
    <>
      <section>
        <div className="w-full mb-16">
          <div className="bg-[#F5F5F5]  rounded-md">
            <HeroSlider />
          </div>
        </div>
      </section>

      <section className="container my-16">
        <ServicesContainer />
      </section>
      {/* 
      <section>
        <div className="container my-16">
    
          <ShowCategoriesGrid />
        </div>
      </section> */}
      <section className="container ">
        <ShowPartnersCarousel />
      </section>

      <section>
        <div className="container my-16  border-b border-gray-200 pb-8">
          <div className="border-l-[12px]  border-storeSecondary pl-4 mb-4">
            <p className="text-storeSecondary font-medium">Today&apos;s</p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold ">
              New Arrivals
            </h2>
            <div className=" border-b border-gray-500  flex items-center gap-1 text-[#141718]">
              <p className="font-medium text-sm md:text-base">More products</p>
              <ArrowRight className="size-3" />
            </div>
          </div>
          <ShowNewProducts />
        </div>
      </section>
      <section className="">
        <div className="container my-16">
          <div className="border-l-[12px]  border-storeSecondary pl-4 mb-4">
            <p className="text-storeSecondary font-medium">Categories</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-16">
            Browse by Category
          </h2>
          <ShowCategoriesSilder />
        </div>
      </section>
      <section className="container my-16">
        <div className=" ">
          <div className="border-l-[12px]  border-storeSecondary pl-4 mb-4">
            <p className="text-storeSecondary font-medium">Featured</p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold ">
              Featured picks
            </h2>
            <div className=" border-b border-gray-500  flex items-center gap-1 text-[#141718]">
              <p className="font-medium text-sm md:text-base">More products</p>
              <ArrowRight className="size-3" />
            </div>
          </div>

          <ShowFeaturedProducts />
        </div>
        <div className="flex justify-center">
          <Link className=" font-medium" href={"/products"}>
            {/* <Button className="px-8 py-6 text-base rounded-sm bg-storeSecondary hover:bg-storePrimary ">
              View all
            </Button> */}
            <button className="px-8 py-2 rounded-md bg-storeSecondary self-center text-white font-base transition duration-200 hover:bg-white hover:text-storeSecondary border-2 border-transparent hover:border-storeSecondary">
              View All
            </button>
          </Link>
        </div>
      </section>
      <section className="bg-[#182333] py-8">
        <div className="container  my-16">
          <div className="border-l-[12px]  border-storeSecondary pl-4 mb-4">
            <p className="text-storeSecondary font-medium">Promotions</p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Best Deals
            </h2>
            <div className=" border-b border-gray-500  flex items-center gap-1 text-[#141718]">
              <p className="font-medium text-sm md:text-base text-white">
                More products
              </p>
              <ArrowRight className="size-3 text-white" />
            </div>
          </div>

          <ShowPromoProducts />
        </div>
      </section>
      {/* <section>
        <div className="container my-16">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xlt-3xl">Last Products</h2>
            <p className="text-xl">Explore our categories!</p>
          </div>
          <ProductsByCategory />
        </div>
      </section> */}

      <section className="">
        <div className="container my-16">
          <div className="border-l-[12px]  border-storeSecondary pl-4 mb-4">
            <p className="text-storeSecondary font-medium">Our Offers</p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold ">Best Offers</h2>
            <div className=" border-b border-gray-500  flex items-center gap-1 text-[#141718]">
              <p className="font-medium text-sm md:text-base">More products</p>
              <ArrowRight className="size-3" />
            </div>
          </div>

          <ShowBestOffers />
        </div>
      </section>

      <section className="my-16 pt-16">
        <PromotionalAd />
      </section>
    </>
  );
}
