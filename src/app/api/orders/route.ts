import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Получен новый заказ на сервер:", body);
    return NextResponse.json({
      success: true,
      message: "Заказ успешно создан!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера при создания заказа" },
      { status: 500 },
    );
  }
}
