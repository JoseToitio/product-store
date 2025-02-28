import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProduct } from "@/services/types";
import { useEffect } from "react";

const productSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(30, "O título deve ter menos de 30 caracteres")
    .required("Campo obrigatório"),
  price: yup
    .number()
    .typeError("O preço deve ser um número válido")
    .positive("O preço deve ser maior que zero")
    .required("Campo obrigatório"),
  description: yup
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .required("Campo obrigatório"),
  category: yup
    .string()
    .min(3, "A categoria deve ter pelo menos 3 caracteres")
    .required("Campo obrigatório"),
  image: yup
    .string()
    .url("A URL da imagem deve ser válida")
    .required("Campo obrigatório"),
});

interface IProductForm {
  onSubmit: (product: IProduct) => void;
  isPending: boolean;
  title: string;
  buttonTitle?: string;
  initialData?: IProduct;
}
export type ProductFormData = yup.InferType<typeof productSchema>;
export default function ProductForm({
  onSubmit,
  isPending,
  title,
  buttonTitle = "Adicionar Produto",
  initialData,
}: IProductForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <div className="p-6 bg-white rounded shadow-md my-5">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{title}</h1>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="space-y-4"
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-800"
            htmlFor="title"
          >
            Título
          </label>
          <input
            id="title"
            {...register("title")}
            className="w-full p-2 border rounded text-gray-700 "
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-800"
            htmlFor="price"
          >
            Preço
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full p-2 border rounded text-gray-700 "
            id="price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-800"
            htmlFor="description"
          >
            Descrição
          </label>
          <textarea
            {...register("description")}
            className="w-full h-32 p-2 border rounded text-gray-700 "
            id="description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-800"
            htmlFor="category"
          >
            Categoria
          </label>
          <input
            disabled={initialData && true}
            id="category"
            {...register("category")}
            className="w-full p-2 border rounded text-gray-700 "
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800" htmlFor="image">
            Imagem (URL)
          </label>
          <input
            id="image"
            {...register("image")}
            className="w-full p-2 border rounded text-gray-700 "
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isPending ? "Adicionando..." : buttonTitle}
        </button>
      </form>
    </div>
  );
}
