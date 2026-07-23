import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbServer";

// Метод GET: отдаёт списки в зависимости от параметра ?type=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const db = readDb();

    if (type === "categories") {
      return NextResponse.json({ data: db.categories || [] });
    }

    if (type === "products") {
      return NextResponse.json({ data: db.products || [] });
    }

    if (type === "orders") {
      return NextResponse.json({ data: db.orders || [] });
    }

    return NextResponse.json({ error: "Неверный тип" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// Метод POST: создаёт категории и продукты
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;
    const db = readDb();

    if (type === "order") {
      if (!db.orders) db.orders = [];
      const newOrder = {
        id: String(Date.now()),
        ...data,
      };
      db.orders.push(newOrder);
      writeDb(db);
      return NextResponse.json({ success: true, data: newOrder });
    }

    if (type === "category") {
      const newCategory = { id: String(Date.now()), name: data.name };
      if (!db.categories) db.categories = [];
      db.categories.push(newCategory);
      writeDb(db);
      return NextResponse.json({ success: true, data: newCategory });
    }

    if (type === "product") {
      const newProduct = {
        id: String(Date.now()),
        name: data.name,
        price: Number(data.price),
        categoryId: data.categoryId,
        imageUrl: data.imageUrl || "https://dodostatic.net",
        description: data.description || "",
      };
      if (!db.products) db.products = [];
      db.products.push(newProduct);
      writeDb(db);
      return NextResponse.json({ success: true, data: newProduct });
    }

    return NextResponse.json(
      { error: "Неверный тип операции" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
