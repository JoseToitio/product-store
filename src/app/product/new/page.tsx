"use client";

import ProductForm, { ProductFormData } from "@/components/ProductForm";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (newProduct: ProductFormData) => {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: { "Content-Type": "application/json" },
      });
      return res.json();
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <ProductForm
      mutate={mutate}
      isPending={isPending}
      title="Adicionar Novo Produto"
    />
  );
}
