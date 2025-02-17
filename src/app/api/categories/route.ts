// app/api/categories/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch  {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
