import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/dbServer";

export async function GET() {
  const db = readDb();
  return NextResponse.json({ data: db.categories });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDb();

    const newCategory = {
      id: String(Date.now()),
      name: body.name,
    };

    db.categories.push(newCategory);
    writeDb(db);

    return NextResponse.json({ success: true, data: newCategory });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера при создании категории" },
      { status: 500 },
    );
  }
}
