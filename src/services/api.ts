import { IProduct } from "./types";

const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id: number): Promise<IProduct> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  if (!response.ok) throw new Error("Failed to fetch products by category");
  return response.json();
};

export const createProduct = async (data: IProduct) => {
  const response = await fetch(`${API_URL}/products`,  {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to create products by data");
  return response.json();
};

export const updateProductsById = async (id: number, data: IProduct) => {
  const response = await fetch(`${API_URL}/products/${id}`,  {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to update products by data or id");
  return response.json();
};

export const deleteProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete products by id");
  return response.json();
}