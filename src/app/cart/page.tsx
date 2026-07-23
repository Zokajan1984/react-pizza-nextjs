"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { useCartStore } from "@/store/useCartStore";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronLeft, Minus, Plus, X, ShoppingBag } from "lucide-react";

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

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSending, setIsSending] = useState(false);

  const typeLabels = {
    thin: "тонкое",
    traditional: "традиционное",
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      toast.error("Заполните все поля формы");
      return;
    }

    setIsSending(true);
    try {
      await api.post("/orders", {
        customerName: name,
        phone,
        address,
        items,
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      toast.success("Заказ успешно оформлен! 🍕");
      clearCart();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Не удалось оформить заказ");
    } finally {
      setIsSending(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 max-w-150 mx-auto text-center">
        <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
          🛒 Корзина пустая <span className="text-2xl">😕</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Вероятней всего, вы не заказывали ещё пиццу. <br />
          Для того, чтобы заказать, перейди на главную страницу.
        </p>
        <Link href="/">
          <Button className="bg-[#282828] hover:bg-black text-white font-bold px-8 py-6 rounded-full transition-colors">
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
          <ShoppingBag className="w-7 h-7" />
          Корзина
        </h1>
        <button
          onClick={clearCart}
          className="text-gray-400 hover:text-red-500 text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Очистить корзину
        </button>
      </div>

      {/* Список товаров */}
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
                className="border-2 border-[#fe5f1e] text-[#fe5f1e] hover:bg-[#fe5f1e] hover:text-white w-7 h-7 rounded-full flex items-center justify-center cursor-pointer font-bold"
              >
                -
              </button>
              <span className="font-bold text-base w-4 text-center">
                {item.count}
              </span>
              <button
                onClick={() => plusPizza(item.id)}
                className="border-2 border-[#fe5f1e] text-[#fe5f1e] hover:bg-[#fe5f1e] hover:text-white w-7 h-7 rounded-full flex items-center justify-center cursor-pointer font-bold"
              >
                +
              </button>
            </div>

            <div className="text-xl font-bold text-gray-900 min-w-21.25 text-right">
              {item.price * item.count} ₽
            </div>

            <button
              onClick={() => removePizza(item.id)}
              className="border border-gray-200 text-gray-300 hover:border-red-500 hover:text-red-500 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Подвал корзины */}
      <div className="flex flex-col gap-6 mt-10">
        <div className="flex items-center justify-between text-lg">
          <p className="text-gray-600">
            Всего пицц:{" "}
            <span className="font-bold text-gray-900">{totalCount} шт.</span>
          </p>
          <p className="text-gray-600">
            Сумма заказа:{" "}
            <span className="font-bold text-2xl text-[#fe5f1e]">
              {totalPrice} ₽
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-200 text-gray-400 hover:bg-gray-50 font-bold px-6 py-6 rounded-full flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Назад
            </Button>
          </Link>

          {/* МОДАЛЬНОЕ ОКНО */}
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <Button className="bg-[#fe5f1e] hover:bg-[#b53a07] text-white font-bold px-8 py-6 rounded-full transition-colors">
                Оплатить сейчас
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl w-full max-w-105 z-50 focus:outline-none">
                <Dialog.Title className="text-2xl font-extrabold text-gray-900 mb-4">
                  Оформление заказа
                </Dialog.Title>

                <form
                  onSubmit={handleSubmitOrder}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">
                      Ваше имя
                    </label>
                    <Input
                      type="text"
                      placeholder="Иван"
                      value={name}
                      className="rounded-xl border-gray-200"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      placeholder="+998..."
                      value={phone}
                      className="rounded-xl border-gray-200"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">
                      Адрес доставки
                    </label>
                    <Input
                      type="text"
                      placeholder="Улица, дом, квартира"
                      value={address}
                      className="rounded-xl border-gray-200"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="border-t pt-4 mt-2 flex items-center justify-between">
                    <span className="text-gray-500 font-medium">К оплате:</span>
                    <span className="text-xl font-black text-[#fe5f1e]">
                      {totalPrice} ₽
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="bg-[#fe5f1e] hover:bg-[#b53a07] text-white font-bold py-6 rounded-xl w-full mt-2 transition-colors"
                  >
                    {isSending ? "Отправка..." : "Оформить заказ"}
                  </Button>
                </form>

                <Dialog.Close asChild>
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
