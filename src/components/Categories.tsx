"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Category, ApiResponseCategories } from "@/types/pizza";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  activeId: string;
  onChange: (id: string) => void;
}

export const Categories = ({ activeId, onChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get<ApiResponseCategories>("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  return (
    <Tabs
      value={activeId}
      onValueChange={onChange}
      className="w-full md:w-auto"
    >
      <TabsList
        className={`
        bg-gray-100/80 p-1 
        rounded-2xl gap-1
        flex flex-wrap h-auto
      `}
      >
        <TabsTrigger
          value="all"
          className={`
            rounded-xl px-5 py-2 
            text-sm font-bold 
            data-[state=active]:bg-white 
            data-[state=active]:text-[#fe5f1e] 
            data-[state=active]:shadow-sm
            transition-all cursor-pointer
          `}
        >
          Все
        </TabsTrigger>

        {categories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.id}
            className={`
              rounded-xl px-5 py-2 
              text-sm font-bold 
              data-[state=active]:bg-white 
              data-[state=active]:text-[#fe5f1e] 
              data-[state=active]:shadow-sm
              transition-all cursor-pointer
            `}
          >
            {cat.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
