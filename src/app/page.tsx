import { fetchProducts } from "@/services/api";
import { Product } from "@/services/types";
import Image from "next/image";

export default async function Home() {
  const products = await fetchProducts();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="mx-auto object-contain"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
