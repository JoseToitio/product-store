import { fetchProducts } from "@/services/api";
import { Product } from "@/services/types";
import Image from "next/image";

export default async function Home() {
  const products = await fetchProducts();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Lista de Produtos</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <a key={product.id} href={"/"} className="group p-3 rounded-lg bg-gray-200">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="aspect-square w-auto h-auto rounded-lg bg-gray-200 object-fill group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                R$ {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
