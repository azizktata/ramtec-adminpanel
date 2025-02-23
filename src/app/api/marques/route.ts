// app/api/categories/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const marques = await prisma.marque.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(marques);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch marques" },
      { status: 500 }
    );
  }
}
