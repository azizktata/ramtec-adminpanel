import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a Customer
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+21698765432",
      address: "123 Street, Tunis",
    },
  });

  console.log("Customer Created:", customer);

  // Create a Product with a Price
  const product = await prisma.product.create({
    data: {
      name: "Sample Product",
      description: "This is a sample product.",
      published: true,
      stock: 100,
      sales: 0,
      sku: "PROD123",
      status: "SELLING",
      slug: "sample-product",
      category: {
        create: {
          name: "Electronics",
          slug: "electronics",
          image: "📱",
          description: "Electronic products",
          published: true,
        },
      },
      prices: {
        create: {
          price: 99.99,
          discount: 10.0,
        },
      },
      images: {
        create: [
       
            {url: "https://via.placeholder.com/150"}
        
        ],
      },
    },
  });

  console.log("Product Created:", product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
