const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  if (!response.ok) throw new Error("Failed to fetch products by category");
  return response.json();
};
