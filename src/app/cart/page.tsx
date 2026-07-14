"use client";

import Link from "next/link";
import { Trash2, ChevronLeft, Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const {
    items,
    totalPrice,
    totalCount,
    plusPizza,
    minusPizza,
    removePizza,
    clearCart,
  } = useCartStore();

  const typeLabels = {
    thin: "тонкое",
    traditional: "традиционное",
  };

  if (items.length === 0) {
    return (
      <div
        className={`
        flex flex-col items-center 
        justify-center py-24 
        max-w-150 mx-auto text-center
      `}
      >
        <h1
          className={`
          text-3xl font-extrabold 
          mb-2 flex items-center gap-2
        `}
        >
          Корзина пустая <span className="text-2xl">😕</span>
        </h1>
        <p
          className={`
          text-gray-400 text-sm 
          leading-relaxed mb-10
        `}
        >
          Вероятней всего, вы не заказывали ещё пиццу. <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <span className="text-8xl mb-10 block select-none">🛒</span>
        <Link href="/">
          <Button
            className={`
            bg-[#282828] hover:bg-black 
            text-white font-bold px-8 py-6 
            rounded-full transition-colors
          `}
          >
            Вернуться назад
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-200 mx-auto py-14 pb-24">
      <div className="flex items-center justify-between border-b pb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-gray-800" />
          Корзина
        </h1>
        <button
          onClick={clearCart}
          className={`
            text-gray-400 hover:text-red-500 
            text-sm flex items-center gap-1.5 
            transition-colors cursor-pointer
          `}
        >
          <Trash2 className="w-4 h-4" />
          Очистить корзину
        </button>
      </div>

      <div className="flex flex-col">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-6 gap-4"
          >
            <div className="flex items-center gap-4 flex-1">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <p className="text-gray-400 text-sm">
                  {typeLabels[item.type]} тесто, {item.size} см.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => minusPizza(item.id)}
                className={`
                  border-2 border-[#fe5f1e] text-[#fe5f1e] 
                  hover:bg-[#fe5f1e] hover:text-white 
                  w-7 h-7 rounded-full flex items-center 
                  justify-center transition-colors cursor-pointer
                `}
              >
                <Minus className="w-3 h-3 stroke-3" />
              </button>
              <span className="font-bold text-base w-4 text-center">
                {item.count}
              </span>
              <button
                onClick={() => plusPizza(item.id)}
                className={`
                  border-2 border-[#fe5f1e] text-[#fe5f1e] 
                  hover:bg-[#fe5f1e] hover:text-white 
                  w-7 h-7 rounded-full flex items-center 
                  justify-center transition-colors cursor-pointer
                `}
              >
                <Plus className="w-3 h-3 stroke-3" />
              </button>
            </div>

            {/* Итоговая стоимость позиции */}
            <div className="text-xl font-bold text-gray-900 min-w-20 text-right">
              {item.price * item.count} ₽
            </div>

            <button
              onClick={() => removePizza(item.id)}
              className={`
                border border-gray-200 text-gray-300 
                hover:border-red-500 hover:text-red-500 
                w-7 h-7 rounded-full flex items-center 
                justify-center transition-colors cursor-pointer
              `}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 mt-10">
        <div className="flex items-center justify-between text-lg">
          <p className="text-gray-600">
            Всего пицц:{" "}
            <span className="font-bold text-gray-900">{totalCount} шт.</span>
          </p>
          <p className="text-gray-600">
            Сумма заказа:{" "}
            <span className="font-bold text-[#fe5f1e] text-2xl">
              {totalPrice} ₽
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link href="/">
            <Button
              variant="outline"
              className={`
                border-gray-200 text-gray-400 
                hover:bg-gray-50 font-bold 
                px-6 py-6 rounded-full flex 
                items-center gap-2 transition-colors
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Вернуться назад
            </Button>
          </Link>

          <Button
            className={`
            bg-[#fe5f1e] hover:bg-[#b53a07] 
            text-white font-bold px-8 py-6 
            rounded-full transition-colors
          `}
          >
            Оплатить сейчас
          </Button>
        </div>
      </div>
    </div>
  );
}
