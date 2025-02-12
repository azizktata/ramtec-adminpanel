import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a Customer
  await prisma.seller.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+21698765432",
      address: "123 Street, Tunis",
    },
  });

 

  const category = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      description: "Electronics category",
      published: true,
    },
  });

  // Create a Product
  const product = await prisma.product.create({
    data: {
      name: "photocopie GR7",
      description: "A high-end product",
      published: true,
      stock: 50,
      sales: 10,
      sku: "SMART-12345",
      status: "SELLING",
      slug: "photocopie-gr7",
      category: { connect: { id: category.id } },
    },
  });
  const product2 = await prisma.product.create({
    data: {
      name: "photocopie GR146",
      description: "A high-end photociped device",
      published: true,
      stock: 30,
      sales: 10,
      sku: "SMART-12346",
      status: "SELLING",
      slug: "photocopie-gr146",
      category: { connect: { id: category.id } },
    },
  });

  // Create a Price for the Product
  await prisma.price.create({
    data: {
      price: 800,
      discount: 10.0,
      discountSeller: 25.0,
      product: { connect: { id: product.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 1500,
      discount: 10.0,
      discountSeller: 25.0,
      product: { connect: { id: product2.id } },
    },
  });

  // Create an Image for the Product
  // await prisma.image.create({
  //   data: {
  //     url: "https://example.com/product-image.jpg",
  //     filename: "product-image.jpg",
  //     product: { connect: { id: product.id } },
  //   },
  // });

  // Create a Variant for the Product
  // const variant = await prisma.variant.create({
  //   data: {
  //     name: "Smartphone - Blue",
  //     slug: "smartphone-blue",
  //     price: 999.99,
  //     discount: 5.0,
  //     status: "SELLING",
  //     stock: 20,
  //     sku: "SMART-BLUE-12345",
  //     product: { connect: { id: product.id } },
  //   },
  // });

//order scenario

  // Create a Customer
  const customer = await prisma.customer.create({
    data: {
      name: "ABC",
      email: "abc@example.com",
      phone: "1234567890",
      address: "123 Main St, City, Country",
    },
  });
  const customer2 = await prisma.customer.create({
    data: {
      name: "Zen",
      email: "zen@example.com",
      phone: "1234567890",
      address: "Ezzahra",
    },
  });

  // Create an Order
  const order = await prisma.order.create({
    data: {
      invoiceNo: "INV-0001",
      orderTime: new Date(),
      method: "CASH",
      amount: 800,
      status: "PENDING",
      customer: { connect: { id: customer.id } },
    },
  });
  const order2 = await prisma.order.create({
    data: {
      invoiceNo: "INV-0002",
      orderTime: new Date(),
      method: "CASH",
      amount: 1500,
      status: "PENDING",
      customer: { connect: { id: customer2.id } },
    },
  });

  // Create an OrderItem
  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 800,
      order: { connect: { id: order.id } },
      product: { connect: { id: product.id } },
    },
  });
  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 1500,
      order: { connect: { id: order2.id } },
      product: { connect: { id: product2.id } },
    },
  });


  // console.log("Product Created:", product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
