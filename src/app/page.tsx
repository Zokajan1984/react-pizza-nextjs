"use client";

import { use, useState } from "react";
import { Header } from "@/components/Header";
import { Categories } from "@/components/Categories";
import { Sort } from "@/components/Sort";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  return (
    <div className="pb-20">
      <Header />
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 py-8`}
      >
        <Categories activeId={category} onChange={setCategory} />
        <Sort activeSort={sort} onChange={setSort} />
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-extrabold mb-8">Все Пиццы</h2>
        <p className="text-gray-500">Тут скоро появится аппетитные пиццы...</p>
      </div>
    </div>
  );
}
