"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { IProduct } from "@/services/types";
import { fetchProductById, updateProductsById } from "@/services/api";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (updatedProduct: IProduct) =>
      updateProductsById(productId, updatedProduct),
    onSuccess: () => {
      alert("Produto atualizado com sucesso!");
      router.push("/");
    },
    onError: (error) => {
      alert(`Erro ao atualizar: ${error}`);
    },
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produto.</p>;

  return (
    <ProductForm
      title="Editar Produto"
      mutate={mutate}
      isPending={isPending}
      initialData={product}
    />
  );
}
