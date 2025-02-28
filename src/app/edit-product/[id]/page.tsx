"use client";

import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/services/types";
import BackButton from "@/components/BackButton";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const router = useRouter();
  const { updateProductMutation, getProductById } = useProducts();
  const product = getProductById(productId);
  const handleSubmit = (updatedProduct: IProduct) => {
    updateProductMutation(productId, updatedProduct);
    router.push("/");
  };

  if (!product) return <p>Carregando...</p>;
  if (product === null) return <p>Erro ao carregar produto.</p>;
  return (
    <div className="max-w-xl mx-auto p-6">
      <BackButton />
      <ProductForm
        title="Editar Produto"
        onSubmit={handleSubmit}
        isPending={false}
        buttonTitle="Atualizar Produto"
        initialData={product}
      />
    </div>
  );
}
