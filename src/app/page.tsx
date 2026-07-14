"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { Product, ApiResponseProducts } from "@/types/pizza";
import { Header } from "@/components/Header";
import { Categories } from "@/components/Categories";
import { Sort } from "@/components/Sort";
import { PizzaCard } from "@/components/PizzaCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);

  // Один чистый хук для загрузки продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = "/products";
        if (activeCategory !== "all") {
          url = `/products?category=${activeCategory}`;
        }

        const response = await api.get<ApiResponseProducts>(url);
        let items = response.data.data;

        // Локальная сортировка
        if (activeSort === "price") {
          items = [...items].sort((a, b) => a.price - b.price);
        } else if (activeSort === "alphabet") {
          items = [...items].sort((a, b) => a.name.localeCompare(b.name));
        }

        setProducts(items);
      } catch (error) {
        console.error("Ошибка загрузки продуктов:", error);
        toast.error("Не удалось загрузить пиццы");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, activeSort]);

  return (
    <div className="pb-20">
      <Header />
      <div
        className={`
  flex flex-col md:flex-row 
  md:items-center 
  justify-between gap-4 py-8 pt-6
`}
      >
        <Categories activeId={activeCategory} onChange={setActiveCategory} />
        <Sort activeSort={activeSort} onChange={setActiveSort} />
      </div>
      <div className="mt-6">
        <h2 className="text-3xl font-extrabold mb-8">Все пиццы</h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div
              className={`
              animate-spin rounded-full 
              h-12 w-12 border-t-2 
              border-b-2 border-[#fe5f1e]
            `}
            ></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-center py-10">Пиццы не найдены.</p>
        ) : (
          <div
            className={`
            grid grid-cols-1 sm:grid-cols-2 
            md:grid-cols-3 lg:grid-cols-4 
            gap-x-6 gap-y-10
          `}
          >
            {products.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                id={pizza.id}
                name={pizza.name}
                price={pizza.price}
                imageUrl={pizza.imageUrl}
                description={pizza.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
