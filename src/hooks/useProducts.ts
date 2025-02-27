import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/store/productsSlice";
import { IProduct } from "@/services/types";
import {
  createProduct,
  deleteProductById,
  getProducts,
  updateProductsById,
} from "@/services/api";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const [loadingGetProducts, setLoadingGetProducts] = useState(false);
  const [errorGetProducts, setErrorGetProducts] = useState<string | null>(null);

  useEffect(() => {
    if (products.length === 0) {
      setLoadingGetProducts(true);
      getProducts()
        .then((fetchedProducts) => {
          dispatch(setProducts(fetchedProducts));
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
          setErrorGetProducts("Erro ao buscar produtos");
        })
        .finally(() => setLoadingGetProducts(false));
    }
  }, [products, dispatch]);

  const createProductMutation = async (product: IProduct) => {
    try {
      const newProduct = await createProduct(product);
      console.log('cai aqui')
      dispatch(addProduct(newProduct));
    } catch (error) {
      console.log('cai aqui')
      console.error("Erro ao criar produto:", error);
    }
  };

  const updateProductMutation = async (id: number, updatedData: IProduct) => {
    try {
      const updatedProduct = await updateProductsById(id, updatedData);
      const currentProduct = products.find((p) => p.id === updatedProduct.id);

      const productToUpdate = currentProduct
        ? { ...currentProduct, ...updatedProduct }
        : updatedProduct;

      dispatch(updateProduct({ product: productToUpdate }));
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const deleteProductMutation = async (id: number) => {
    try {
      await deleteProductById(id);
      dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const getProductById = (id: number): IProduct | null => {
    if (products.length > 0) {
      return products.find((product) => product.id === id) || null;
    }
    return null;
  };

  return {
    products,
    loadingGetProducts,
    errorGetProducts,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
    getProductById,
  };
};
