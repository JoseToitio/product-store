"use client";

import Pagination from "@/components/Pagination";
import { fetchProducts } from "@/services/api";
import { IProduct } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [page, setPage] = useState(1);
  const limit = 8;
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produtos</p>;
  const totalPages = Math.ceil(products.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedData = products.slice(startIndex, startIndex + limit);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Lista de Produtos</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {paginatedData?.map((product: IProduct) => (
            <a key={product.id} href={`/product/${product.id}`} className="group relative">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="aspect-square rounded-lg object-contain group-hover:opacity-75 xl:aspect-7/8 mix-blend-multiply"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                R$ {product.price}
              </p>
              {product.rating.rate > 4.5 && (
                <span className="mt-1 text-lg font-medium text-gray-900">
                  ⭐ Destaque
                </span>
              )}
            </a>
          ))}
        </div>
        <Pagination setPage={setPage} totalPages={totalPages} page={page}/>
      </div>
    </div>
  );
}
