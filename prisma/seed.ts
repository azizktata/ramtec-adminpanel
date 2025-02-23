import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a seller
  // await prisma.user.create({
  //   data: {
  //     name: "John Doe",
  //     email: "seller@gmail.com",
  //     role: "SELLER",
  //     password: "seller123",
  //     phone: "+21698765432",
  //     address: "123 Street, Tunis",
  //   },
  // });
  // await prisma.user.create({
  //   data: {
  //     name: "Ramzi",
  //     email: "ramzi@gmail.com",
  //     role: "ADMIN",
  //     password: "admin123",
  //     phone: "+21698765432",
  //     address: "123 Street, Tunis",
  //   },
  // });

  const category = await prisma.category.create({
    data: {
      name: "Printing & Copying Equipment",
      slug: "printing-copying-equipment",
      description: "Printing & Copying Equipment",
      published: true,
    },
  });
  const category2 = await prisma.category.create({
    data: {
      name: "Printer Consumables",
      slug: "printer-consumables",
      description: "Printer Consumables category",
      published: true,
    },
  });
  const category3 = await prisma.category.create({
    data: {
      name: "Paper & Printing Supplies",
      slug: "paper-printing-supplies",
      description: "Paper & Printing Supplies category",

      published: true,
    },
  });

  const marque1 = await prisma.marque.create({
    data: {
      name: "HP",
      image: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740308588/file_fnp3we.png",
        },
      },
    },
  });
  const marque2 = await prisma.marque.create({
    data: {
      name: "Canon",
      image: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740307244/file_o5bldk.png",
        },
      },
    },
  });
  const marque3 = await prisma.marque.create({
    data: {
      name: "ColorJet",
      image: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740316398/file_fdguow.png",
        },
      },
    },
  });

  // Create a Product
  const product1 = await prisma.product.create({
    data: {
      name: "MultiFunction Copier MX-800",
      description:
        "A high-speed multifunction copier with scanning, duplex printing, and cloud connectivity, perfect for office environments.",
      published: true,
      stock: 40,
      sales: 18,
      sku: "COPIER-800MX",
      status: "SELLING",
      slug: "multifunction-copier-mx-800",
      marque: { connect: { id: marque1.id } },
      category: { connect: { id: category.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740130231/file_dzaavy.png",
        },
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "LaserJet Pro L500",
      description:
        "A compact yet powerful laser printer delivering fast and high-resolution printing, ideal for small and medium offices.",
      published: true,
      stock: 35,
      sales: 22,
      sku: "LASER-500L",
      status: "SELLING",
      slug: "laserjet-pro-l500",
      marque: { connect: { id: marque2.id } },
      category: { connect: { id: category.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740129983/file_vsmmzl.png",
        },
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Photocopier",
      description:
        "An advanced document scanner with high-speed duplex scanning, OCR capabilities, and wireless connectivity for seamless integration.",
      published: true,
      stock: 25,
      sales: 10,
      sku: "SCAN-3DPRO",
      status: "SELLING",
      slug: "smartscan-3d-pro",
      marque: { connect: { id: marque1.id } },
      category: { connect: { id: category.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740130103/file_aky3dg.png",
        },
      },
    },
  });
  const product4 = await prisma.product.create({
    data: {
      name: "UltraBlack Toner Cartridge X200",
      description:
        "A high-yield black toner cartridge designed for sharp, professional-quality prints with long-lasting performance.",
      published: true,
      stock: 50,
      sales: 20,
      sku: "TONER-X200",
      status: "SELLING",
      slug: "ultrablack-toner-x200",
      marque: { connect: { id: marque1.id } },
      category: { connect: { id: category2.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1739891504/file_ryfqnd.png",
        },
      },
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "ColorMax Laser Toner Set",
      description:
        "A premium set of cyan, magenta, yellow, and black toners, delivering vibrant and consistent color prints for laser printers.",
      published: true,
      stock: 40,
      sales: 15,
      sku: "TONER-COLORSET",
      status: "SELLING",
      slug: "colormax-laser-toner-set",
      marque: { connect: { id: marque2.id } },
      category: { connect: { id: category2.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1739891470/file_r5mbpj.png",
        },
      },
    },
  });
  const product6 = await prisma.product.create({
    data: {
      name: "InkFlow Black Refill Bottle 500ml",
      description:
        "A high-quality black ink refill bottle designed for continuous ink tank printers, ensuring smooth and smudge-free printing.",
      published: true,
      stock: 60,
      sales: 25,
      sku: "INK-BLACK500",
      status: "SELLING",
      slug: "inkflow-black-refill-bottle-500ml",
      marque: { connect: { id: marque3.id } },
      category: { connect: { id: category2.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740130258/file_e2vzdr.png",
        },
      },
    },
  });

  const product7 = await prisma.product.create({
    data: {
      name: "ColorJet Ink Bottle Set (CMYK)",
      description:
        "A set of cyan, magenta, yellow, and black ink bottles, perfect for vibrant color printing with high yield and sharp results.",
      published: true,
      stock: 45,
      sales: 18,
      sku: "INK-COLORSET",
      status: "SELLING",
      slug: "colorjet-ink-bottle-set-cmyk",
      marque: { connect: { id: marque3.id } },
      category: { connect: { id: category2.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1739891537/file_kko9fu.png",
        },
      },
    },
  });
  const product8 = await prisma.product.create({
    data: {
      name: "Premium A4 Multipurpose Paper - 80gsm",
      description:
        "High-quality A4 paper with a smooth finish, perfect for laser and inkjet printing, photocopying, and everyday office use.",
      published: true,
      stock: 100,
      sales: 30,
      sku: "PAPER-A4-80GSM",
      status: "SELLING",
      slug: "premium-a4-multipurpose-paper-80gsm",
      marque: { connect: { id: marque3.id } },
      category: { connect: { id: category3.id } },
      images: {
        create: {
          url: "https://res.cloudinary.com/dflhokygl/image/upload/v1740130243/file_z9ipa9.png",
        },
      },
    },
  });

  // Create a Price for the Product
  await prisma.price.create({
    data: {
      price: 800,
      discount: 10.0,
      discountSeller: 20.0,
      product: { connect: { id: product1.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 1500,
      discount: 10.0,
      discountSeller: 30.0,
      product: { connect: { id: product2.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 600,
      discount: 0,
      discountSeller: 0,
      product: { connect: { id: product3.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 100,
      discount: 0,
      discountSeller: 50,
      product: { connect: { id: product4.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 80,
      discount: 0,
      discountSeller: 20,
      product: { connect: { id: product5.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 30,
      discount: 5,
      discountSeller: 10,
      product: { connect: { id: product6.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 20,
      discount: 0,
      discountSeller: 5,
      product: { connect: { id: product7.id } },
    },
  });
  await prisma.price.create({
    data: {
      price: 25,
      discount: 0,
      discountSeller: 5,
      product: { connect: { id: product8.id } },
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
  const customer = await prisma.user.create({
    data: {
      name: "ABC",
      email: "abc@example.com",
      phone: "1234567890",
      address: "123 Main St, City, Country",
    },
  });
  const customer2 = await prisma.user.create({
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
      user: { connect: { id: customer.id } },
    },
  });
  const order2 = await prisma.order.create({
    data: {
      invoiceNo: "INV-0002",
      orderTime: new Date(),
      method: "CASH",
      amount: 1500,
      status: "PENDING",
      user: { connect: { id: customer2.id } },
    },
  });

  // Create an OrderItem
  await prisma.orderItem.create({
    data: {
      quantity: 1,
      price: 800,
      order: { connect: { id: order.id } },
      product: { connect: { id: product1.id } },
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
