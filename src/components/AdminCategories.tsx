"use client";

import { Category } from "@/types/pizza";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Props {
  categories: Category[];
  newName: string;
  setNewName: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AdminCategories = ({
  categories,
  newName,
  setNewName,
  onSubmit,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <form
        onSubmit={onSubmit}
        className="border p-6 rounded-2xl bg-white shadow-sm flex flex-col gap-4 h-max"
      >
        <h3 className="font-bold text-lg">Создать категорию</h3>
        <Input
          type="text"
          placeholder="Название"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="rounded-xl"
        />
        <Button
          type="submit"
          className="bg-[#fe5f1e] hover:bg-[#b53a07] text-white font-bold w-full rounded-xl gap-2"
        >
          <Plus className="w-4 h-4" /> Добавить
        </Button>
      </form>
      <div className="md:col-span-2 border rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="bg-gray-50 p-4 border-b font-bold text-gray-700">
          Список категорий
        </div>
        <div className="divide-y">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50/50"
            >
              <span className="font-semibold text-gray-800">{cat.name}</span>
              <span className="text-xs text-gray-400">ID: {cat.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
