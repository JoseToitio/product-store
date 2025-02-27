"use client";

import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/services/types";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const { createProductMutation } = useProducts();

  const handleSubmit = (newProduct: IProduct) => {
    console.log('cai aqui')
    createProductMutation(newProduct);
    router.push("/");
  };
  return (
    <ProductForm
      onSubmit={handleSubmit}
      isPending={false}
      title="Adicionar Novo Produto"
    />
  );
}
