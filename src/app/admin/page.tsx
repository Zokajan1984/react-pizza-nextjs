"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { Product, Category, Order } from "@/types/pizza";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClipboardList, FolderOpen, Pizza } from "lucide-react";
import { AdminOrders } from "@/components/AdminOrders";
import { AdminCategories } from "@/components/AdminCategories";
import { AdminProducts } from "@/components/AdminProducts";

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [newCatName, setNewCatName] = useState("");
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCat, setNewProdCat] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");

  const loadAdminData = async () => {
    try {
      const resCats = await api.get("/manage?type=categories");
      const resProds = await api.get("/manage?type=products");
      const resOrders = await api.get("/manage?type=orders");
      setCategories(resCats.data.data || []);
      setProducts(resProds.data.data || []);
      setOrders(resOrders.data.data || []);
    } catch (error) {
      toast.error("Ошибка загрузки данных");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    try {
      await api.post("/manage", {
        type: "category",
        data: { name: newCatName },
      });
      toast.success("Категория добавлена!");
      setNewCatName("");
      loadAdminData();
    } catch {
      toast.error("Ошибка добавления");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdCat) {
      toast.error("Заполните поля");
      return;
    }
    try {
      await api.post("/manage", {
        type: "product",
        data: {
          name: newProdName,
          price: Number(newProdPrice),
          categoryId: newProdCat,
          description: newProdDesc,
        },
      });
      toast.success("Пицца добавлена!");
      setNewProdName("");
      setNewProdPrice("");
      setNewProdCat("");
      setNewProdDesc("");
      loadAdminData();
    } catch {
      toast.error("Ошибка добавления");
    }
  };

  return (
    <div className="max-w-250 mx-auto py-10">
      <h1 className="text-4xl font-black text-gray-900 mb-8">
        Панель администратора
      </h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-gray-100 p-1 rounded-xl mb-8 flex w-max gap-1">
          <TabsTrigger
            value="orders"
            className="flex items-center gap-2 px-5 py-2 font-bold rounded-lg cursor-pointer"
          >
            <ClipboardList className="w-4 h-4" />
            Заказы ({orders.length})
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="flex items-center gap-2 px-5 py-2 font-bold rounded-lg cursor-pointer"
          >
            <FolderOpen className="w-4 h-4" />
            Категории
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="flex items-center gap-2 px-5 py-2 font-bold rounded-lg cursor-pointer"
          >
            <Pizza className="w-4 h-4" />
            Продукты
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <AdminOrders orders={orders} />
        </TabsContent>
        <TabsContent value="categories">
          <AdminCategories
            categories={categories}
            newName={newCatName}
            setNewName={setNewCatName}
            onSubmit={handleAddCategory}
          />
        </TabsContent>
        <TabsContent value="products">
          <AdminProducts
            products={products}
            categories={categories}
            name={newProdName}
            setName={setNewProdName}
            price={newProdPrice}
            setPrice={setNewProdPrice}
            catId={newProdCat}
            setCatId={setNewProdCat}
            desc={newProdDesc}
            setDesc={setNewProdDesc}
            onSubmit={handleAddProduct}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
