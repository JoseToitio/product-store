"use client";

import { fetchProductById } from "@/services/api";
import { StarIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  if (isNaN(productId)) {
    notFound();
  }

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar o produto.</div>;
  }

  if (!product) {
    notFound();
  }
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="rounded-lg shadow-lg aspect-square object-contain group-hover:opacity-75 xl:aspect-7/8 mix-blend-multiply"
        />
        <div>
          <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-950">{product.title}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold text-gray-950 mt-1">
              R$ {product.price}
            </p>
            <div className="flex items-center justify-center">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <StarIcon
                  key={rating}
                  aria-hidden="true"
                  className={classNames(
                    product.rating.rate > rating
                      ? "text-yellow-400"
                      : "text-gray-200",
                    "size-5 shrink-0"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center mt-1 ">
              <p className="text-gray-950">{product.rating.rate}</p>
              <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                ({product.rating.count} reviews)
              </a>
            </div>
          </div>
          <Link href={`/edit-product/${productId}`}>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Editar Produto
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
