/* eslint-disable @next/next/no-img-element */
"use client";

import Pagination from "@/components/Pagination";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/services/types";
import { StarIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState, useMemo } from "react";
import { classNames } from "./product/[id]/page";

export default function Home() {
  const { products, loadingGetProducts, errorGetProducts } = useProducts();
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("default");

  const limit = 8;

  const categories = useMemo(() => {
    const allCategories = products.map((product) => product.category);
    return Array.from(new Set(allCategories)); // Filtra as categorias duplicadas
  }, [products]);

  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aRating = a.rating?.rate ?? 0;
      const bRating = b.rating?.rate ?? 0;

      if (sortOrder === "default") {
        const aHighRating = aRating > 4.5 ? 1 : 0;
        const bHighRating = bRating > 4.5 ? 1 : 0;

        if (aHighRating !== bHighRating) {
          return bHighRating - aHighRating;
        }
      }

      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;

      return 0;
    });
  }, [filteredProducts, sortOrder]);

  if (loadingGetProducts) return <p>Carregando...</p>;
  if (errorGetProducts) return <p>Erro ao carregar produtos</p>;

  const totalPages = Math.ceil(sortedProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedData = sortedProducts.slice(startIndex, startIndex + limit);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Lista de Produtos</h2>
      <div className="flex justify-between w-full py-8">
        <select
          className="p-2 border rounded text-gray-700"
          onChange={(e) => setCategoryFilter(e.target.value)}
          value={categoryFilter}
        >
          <option value="">Todas as Categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded text-gray-700"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="default">Selecionar filtro</option>
          <option value="asc">Preço: Menor para Maior</option>
          <option value="desc">Preço: Maior para Menor</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
        {paginatedData?.map((product: IProduct) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group relative p-4 rounded-lg group bg-white shadow-[0_0_1px_rgba(40,41,61,0.08),0_0.5px_2px_rgba(96,97,112,0.16)]"
          >
            <img
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="aspect-square rounded-lg object-contain group-hover:opacity-75 xl:aspect-7/8 mix-blend-multiply"
            />
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <div>
              {product.rating?.rate !== undefined &&
                product.rating?.count !== undefined &&
                product.rating!.rate > 4.5 && (
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4, 5].map((r) => (
                      <StarIcon
                        key={r}
                        aria-hidden="true"
                        className={classNames(
                          product.rating!.rate > r
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                    <p className="text-gray-400 pl-3">
                      ({product.rating?.count})
                    </p>
                  </div>
                )}
            </div>
            <p className="mt-1 text-lg font-medium text-gray-900">
              R$ {product.price}
            </p>
          </Link>
        ))}
      </div>
      <Pagination setPage={setPage} totalPages={totalPages} page={page} />
    </div>
  );
}
