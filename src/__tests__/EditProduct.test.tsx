import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/services/types";
import EditProductPage from "@/app/edit-product/[id]/page";

// Mock do hook useParams para fornecer o id
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock do hook useProducts
jest.mock("@/hooks/useProducts", () => ({
  useProducts: jest.fn(),
}));

// Mock de um produto
const mockProduct: IProduct = {
  id: 1,
  title: "Tênis Nike",
  price: 299.99,
  description: "Tênis confortável para corridas",
  category: "Esporte",
  image: "http://example.com/image.jpg",
};

describe("EditProductPage", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    // Mock do useRouter para simular navegação
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    // Mock do useParams para retornar um id válido
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    // Mock do hook useProducts
    (useProducts as jest.Mock).mockReturnValue({
      getProductById: jest.fn().mockReturnValue(mockProduct),
      updateProductMutation: jest.fn(),
      isLoading: false,
      isError: false,
    });
  });

  test("should render the form with the product's data", () => {
    render(<EditProductPage />);

    // Verificar se o título do produto está no formulário
    expect(screen.getByLabelText(/título/i)).toHaveValue(mockProduct.title);
    // Verificar se o preço está correto
    expect(screen.getByLabelText(/preço/i)).toHaveValue(mockProduct.price);
    // Verificar se a descrição está preenchida
    expect(screen.getByLabelText(/descrição/i)).toHaveValue(mockProduct.description);
    // Verificar se a categoria está preenchida
    expect(screen.getByLabelText(/categoria/i)).toHaveValue(mockProduct.category);
    // Verificar se a URL da imagem está preenchida
    expect(screen.getByLabelText(/imagem/i)).toHaveValue(mockProduct.image);
  });

  test("should submit the updated product data", async () => {
    const updateProductMutationMock = jest.fn();
    (useProducts as jest.Mock).mockReturnValue({
      getProductById: jest.fn().mockReturnValue(mockProduct),
      updateProductMutation: updateProductMutationMock,
      isLoading: false,
      isError: false,
    });

    render(<EditProductPage />);

    // Preencher os campos do formulário com novos dados
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: "Novo Título" } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: "350" } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: "Descrição atualizada." } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: "Moda" } });
    fireEvent.change(screen.getByLabelText(/imagem/i), { target: { value: "http://newimage.com/image.jpg" } });

    // Simular o envio do formulário
    fireEvent.click(screen.getByRole("button", { name: /atualizar produto/i }));

    // Esperar que a função de atualização tenha sido chamada
    await waitFor(() => {
      expect(updateProductMutationMock).toHaveBeenCalledWith(1, {
        id: 1,
        title: "Novo Título",
        price: 350,
        description: "Descrição atualizada.",
        category: "Moda",
        image: "http://newimage.com/image.jpg",
      });
    });

    // Verificar se o redirecionamento ocorreu
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  test("should display 'Loading...' while the product is loading", () => {
    // Mock de carregamento
    (useProducts as jest.Mock).mockReturnValue({
      getProductById: jest.fn().mockReturnValue(null),
      updateProductMutation: jest.fn(),
      isLoading: true,
      isError: false,
    });

    render(<EditProductPage />);

    // Verificar se a mensagem de carregamento é exibida
    expect(screen.getByText(/carregando.../i)).toBeInTheDocument();
  });
});
