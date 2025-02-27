"use client";

import {  useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/services/types";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const router = useRouter();
  const { updateProductMutation, getProductById } = useProducts();
  const product = getProductById(productId);
  const handleSubmit = (updatedProduct: IProduct) => {
    updateProductMutation( productId, updatedProduct);
      router.push('/')
  };
  console.log(product);
  if (!product) return <p>Carregando...</p>;
  if (product === null) return <p>Erro ao carregar produto.</p>;
  return (
    <ProductForm
      title="Editar Produto"
      mutate={handleSubmit}
      isPending={false} 
      initialData={product}
    />
  );
}
