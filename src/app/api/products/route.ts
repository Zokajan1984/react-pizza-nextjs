// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import db from "@/data/db.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");

  let filteredProducts = db.products;

  // Если передан ID категории, фильтруем массив продуктов
  if (categoryId && categoryId !== "all") {
    filteredProducts = db.products.filter((p) => p.categoryId === categoryId);
  }

  return NextResponse.json({ data: filteredProducts });
}
