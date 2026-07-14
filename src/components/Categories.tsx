"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  activeId: string;
  onChange: (id: string) => void;
}

const mockCategories = [
  { id: "all", name: "Все" },
  { id: "1", name: "Мясной" },
  { id: "2", name: "Вегетарианский" },
  { id: "3", name: "Гриль" },
  { id: "4", name: "Острые" },
];

export const Categories = ({ activeId, onChange }: Props) => {
  return (
    <Tabs
      value={activeId}
      onValueChange={onChange}
      className="w-full md:w-auto"
    >
      <TabsList className={`bg-gray-100/80 p-1 rounded-2xl gap-1`}>
        {mockCategories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.id}
            className={`rounded-xl px-5 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-[#fe5f1e] data-[state=active]:shadow-sm transition-all`}
          >
            {cat.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
