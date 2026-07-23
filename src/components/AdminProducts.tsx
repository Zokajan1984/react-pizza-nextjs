"use client";

import { Product, Category } from "@/types/pizza";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Props {
  products: Product[];
  categories: Category[];
  name: string;
  setName: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  catId: string;
  setCatId: (v: string) => void;
  desc: string;
  setDesc: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AdminProducts = ({
  products,
  categories,
  name,
  setName,
  price,
  setPrice,
  catId,
  setCatId,
  desc,
  setDesc,
  onSubmit,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <form
        onSubmit={onSubmit}
        className="border p-6 rounded-2xl bg-white shadow-sm flex flex-col gap-4"
      >
        <h3 className="font-bold text-lg">Добавить пиццу</h3>
        <Input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl"
        />
        <Input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-xl"
        />
        <select
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm bg-white outline-none h-10.5 cursor-pointer"
        >
          <option value="">Выберите категорию...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <Input
          type="text"
          placeholder="Ингредиенты"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="rounded-xl"
        />
        <Button
          type="submit"
          className="bg-[#fe5f1e] hover:bg-[#b53a07] text-white font-bold w-full rounded-xl"
        >
          <Plus className="w-4 h-4" /> Создать пиццу
        </Button>
      </form>
      <div className="md:col-span-2 border rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="bg-gray-50 p-4 border-b font-bold text-gray-700">
          Все пиццы в базе
        </div>
        <div className="divide-y max-h-100 overflow-y-auto">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{prod.name}</p>
                  <p className="text-xs text-gray-400">{prod.price} ₽</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
