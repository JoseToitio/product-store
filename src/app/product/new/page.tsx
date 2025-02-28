"use client";

import BackButton from "@/components/BackButton";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/services/types";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const { createProductMutation } = useProducts();

  const handleSubmit = (newProduct: IProduct) => {
    console.log("cai aqui");
    createProductMutation(newProduct);
    router.push("/");
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <BackButton />
      <ProductForm
        onSubmit={handleSubmit}
        isPending={false}
        title="Adicionar Novo Produto"
      />
    </div>
  );
}
