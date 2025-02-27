"use client";

import ProductForm, { ProductFormData } from "@/components/ProductForm";
import { createProduct } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (newProduct: ProductFormData) => createProduct(newProduct),
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
