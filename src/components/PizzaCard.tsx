"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export const PizzaCard = ({
  id,
  name,
  price,
  imageUrl,
  description,
}: Props) => {
  const { addPizza, items } = useCartStore();
  const [selectedType, setSelectedType] = useState<"thin" | "traditional">(
    "thin",
  );
  const [selectedSize, setSelectedSize] = useState<26 | 30 | 40>(26);
  const sizePriceModifier = { 26: 0, 30: 100, 40: 200 };
  const currentPrice = price + sizePriceModifier[selectedSize];
  const cartItemId = `${id}-${selectedType}-${selectedSize}`;
  const cartItem = items.find((item) => item.id === cartItemId);
  const count = cartItem ? cartItem.count : 0;

  const handleAdd = () => {
    addPizza({
      id: cartItemId,
      productId: id,
      name,
      imageUrl,
      type: selectedType,
      size: selectedSize,
      price: currentPrice,
    });
  };

  return (
    <div className="flex flex-col w-full max-w-70 mx-auto mb-10">
      <div className="flex justify-center p-4 border rounded-2xl bg-accent">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain rounded-2xl shadow-xl"
        />
      </div>

      <h3 className="text-xl font-extrabold text-gray-900 mt-3">{name}</h3>
      <p className="text-gray-400 text-sm mt-1 min-h-10 line-clamp-2">
        {description || "Классический вкус"}
      </p>

      <div className="bg-gray-100/80 p-1.5 rounded-xl mt-4 flex flex-col gap-1.5">
        <div className="flex bg-gray-200/50 p-0.5 rounded-lg">
          <button
            onClick={() => setSelectedType("thin")}
            className={`flex-1 py-1 text-xs font-bold rounded-md cursor-pointer transition-all ${selectedType === "thin" ? "bg-white shadow-sm" : "text-gray-500"}`}
          >
            тонкое
          </button>
          <button
            onClick={() => setSelectedType("traditional")}
            className={`flex-1 py-1 text-xs font-bold rounded-md cursor-pointer transition-all ${
              selectedType === "traditional"
                ? "bg-white shadow-sm"
                : "text-gray-500"
            }`}
          >
            традиционное
          </button>
        </div>
        <div className="flex gap-1">
          {([26, 30, 40] as const).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex-1 py-1 text-xs font-bold rounded-md cursor-pointer transition-all ${
                selectedSize === size ? "bg-white shadow-sm" : "text-gray-500"
              }`}
            >
              {size} см.
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <span className="text-xl font-bold text-gray-900">
          от {currentPrice} ₽
        </span>

        <Button
          onClick={handleAdd}
          variant="outline"
          className="border-[#fe5f1e] text-[#fe5f1e] hover:bg-[#fe5f1e] hover:text-white font-bold rounded-full px-4 gap-1.5 group transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-3" />
          <span>Добавить</span>
          {count > 0 && (
            <span className="bg-[#fe5f1e] text-white group-hover:bg-white group-hover:text-[#fe5f1e] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-colors">
              {count}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
