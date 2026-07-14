"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Categories } from "@/components/Categories";
import { Sort } from "@/components/Sort";
import { PizzaCard } from "@/components/PizzaCard";

// Временные данные для проверки верстки карточек
const mockProducts = [
  {
    id: "1",
    name: "Чизбургер-пицца",
    price: 395,
    imageUrl: "https://dodostatic.net",
    description:
      "Мясной соус болоньезе, моцарелла, маринованные огурчики, томаты, красный лук, соус бургер",
  },
  {
    id: "2",
    name: "Сырная пицца",
    price: 295,
    imageUrl: "https://dodostatic.net",
    description:
      "Увеличенная порция моцареллы, сыры чеддер и пармезан, соус альфредо",
  },
  {
    id: "3",
    name: "Пепперони-фреш",
    price: 325,
    imageUrl: "https://dodostatic.net",
    description:
      "Пикантная пепперони, увеличенная порция моцареллы, томаты, томатный соус",
  },
  {
    id: "4",
    name: "Азиатская пицца",
    price: 445,
    imageUrl: "https://dodostatic.net",
    description:
      "Цыпленок, соус сладкий чили, болгарский перец, моцарелла, томатный соус",
  },
];

export default function Home() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");

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
        <Categories activeId={category} onChange={setCategory} />
        <Sort activeSort={sort} onChange={setSort} />
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-extrabold mb-8">Все пиццы</h2>
        <div
          className={`
          grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 
          gap-x-6 gap-y-10
        `}
        >
          {mockProducts.map((pizza) => (
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
      </div>
    </div>
  );
}
