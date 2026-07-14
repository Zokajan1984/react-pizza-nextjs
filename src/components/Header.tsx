"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { totalPrice, totalCount } = useCartStore();

  return (
    <header
      className={`
      sticky top-0 z-50 bg-white
      flex items-center justify-between 
      py-6 border-b border-gray-100
    `}
    >
      <Link
        href="/"
        className={`
          flex items-center gap-4 
          hover:opacity-90 transition-opacity
        `}
      >
        <span className="text-3xl">🍕</span>
        <div>
          <h1
            className={`
            text-2xl font-black uppercase 
            tracking-wide text-gray-800
          `}
          >
            React Pizza
          </h1>
          <p className="text-gray-400 text-sm leading-3">вкусней уже некуда</p>
        </div>
      </Link>

      <Link href="/cart">
        <Button
          className={`
          bg-[#fe5f1e] hover:bg-[#b53a07] 
          text-white font-bold px-6 py-5 
          rounded-full flex items-center 
          gap-4 transition-colors group cursor-pointer
        `}
        >
          <span className="text-base font-bold">{totalPrice} ₽</span>

          <span className="w-px h-5 bg-white/30" />

          <div
            className={`
            flex items-center gap-1.5 
            transition-transform 
            group-hover:translate-x-1
          `}
          >
            <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
            <span className="text-sm font-bold">{totalCount}</span>
          </div>
        </Button>
      </Link>
    </header>
  );
};
