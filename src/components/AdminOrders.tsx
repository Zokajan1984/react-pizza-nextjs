"use client";

import { Order, CartItem } from "@/types/pizza";

export const AdminOrders = ({ orders }: { orders: Order[] }) => {
  if (orders.length === 0) {
    return (
      <p className="text-gray-400 py-6 text-center">Новых заказов пока нет.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {[...orders].reverse().map((order) => (
        <div
          key={order.id || Math.random().toString()}
          className="border border-gray-100 shadow-sm rounded-2xl p-6 bg-white flex flex-col md:flex-row justify-between gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-extrabold text-lg text-gray-900">
                Заказ #{order.id?.slice(-4) || "001"}
              </span>
              <span className="bg-orange-50 text-[#fe5f1e] text-xs font-bold px-2.5 py-1 rounded-full">
                Новый
              </span>
            </div>
            <p className="text-gray-700 text-sm font-medium">
              Клиент: {order.customerName} ({order.phone})
            </p>
            <p className="text-gray-500 text-sm mt-0.5">
              Адрес: {order.address}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 border-t pt-3">
              {order.items?.map((item: CartItem, idx: number) => (
                <span
                  key={idx}
                  className="bg-gray-50 border text-gray-600 text-xs px-3 py-1.5 rounded-xl font-medium"
                >
                  {item.name} ({item.size} см, {item.count} шт.)
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between items-end min-w-30">
            <span className="text-2xl font-black text-[#fe5f1e]">
              {order.totalPrice} ₽
            </span>
            <span className="text-xs text-gray-400">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
