"use client";

import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  activeSort: string;
  onChange: (sort: string) => void;
}

const sortOptions = [
  { id: "popular", name: "популярности" },
  { id: "price", name: "цене" },
  { id: "alphabet", name: "алфавиту" },
];

export const Sort = ({ activeSort, onChange }: Props) => {
  const currentLabel =
    sortOptions.find((o) => o.id === activeSort)?.name || "популярности";
  return (
    <div className={`flex items-center gap-1 text-sm`}>
      <ArrowUpDown className={`w-4 h-4 text-[#fe5f1e]`} />
      <span className="text-gray-700 font-bold">Сортировка: по</span>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={`text-[#fe5f1e] font-bold border-b border-dashed border-[#fe5f1e] cursor-pointer outline-none`}
        >
          {currentLabel}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              className={`font-medium cursor-pointer focus:text-[#fe5f1e]`}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
