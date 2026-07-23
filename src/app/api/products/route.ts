import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");
  const db = readDb();

  let filteredProducts = db.products;

  if (categoryId && categoryId !== "all") {
    filteredProducts = db.products.filter(
      (p: any) => p.categoryId === categoryId,
    );
  }

  return NextResponse.json({ data: filteredProducts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDb();

    const newProduct = {
      id: String(Date.now()),
      name: body.name,
      price: Number(body.price),
      categoryId: body.categoryId,
      imageUrl: body.imageUrl || "https://dodostatic.net",
      description: body.description || "",
    };

    db.products.push(newProduct);
    writeDb(db);

    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера при создании продукта" },
      { status: 500 },
    );
  }
}
