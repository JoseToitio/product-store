import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductForm from "@/components/ProductForm";

// Mock para a função onSubmit
const mockOnSubmit = jest.fn();

describe("ProductForm Component", () => {
  it("renders the form fields correctly", () => {
    render(
      <ProductForm
        onSubmit={mockOnSubmit}
        isPending={false}
        title="Roupa de corrida"
      />
    );

    // Verifica se os campos estão sendo renderizados
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imagem \(url\)/i)).toBeInTheDocument();
    expect(screen.getByText(/adicionar produto/i)).toBeInTheDocument();
    expect(screen.getByText(/Roupa de corrida/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting invalid data", async () => {
    render(
      <ProductForm
        onSubmit={mockOnSubmit}
        isPending={false}
        title="Roupa de corrida"
      />
    );

    fireEvent.click(screen.getByText(/adicionar produto/i));
    await waitFor(() =>
      expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument()
    );
    expect(
      screen.getByText(/o preço deve ser um número válido/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a descrição deve ter pelo menos 10 caracteres/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Campo obrigatório/i)
    ).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted with valid data", async () => {
    render(
      <ProductForm
        onSubmit={mockOnSubmit}
        isPending={false}
        title="Roupa de corrida"
      />
    );

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "Produto Teste" },
    });
    fireEvent.change(screen.getByLabelText(/preço/i), {
      target: { value: 100 },
    });
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: "Descrição do produto" },
    });
    fireEvent.change(screen.getByLabelText(/categoria/i), {
      target: { value: "Categoria Teste" },
    });
    fireEvent.change(screen.getByLabelText(/imagem \(url\)/i), {
      target: { value: "https://example.com/image.jpg" },
    });

    fireEvent.click(screen.getByText(/adicionar produto/i));

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Produto Teste",
        price: 100,
        description: "Descrição do produto",
        category: "Categoria Teste",
        image: "https://example.com/image.jpg",
      })
    );
  });

  it("disables the submit button while pending", () => {
    render(
      <ProductForm
        onSubmit={mockOnSubmit}
        isPending={true}
        title="Roupa de corrida"
      />
    );
    expect(screen.getByText(/adicionando.../i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("resets the form when initialData is provided", () => {
    const initialData = {
      title: "Produto Inicial",
      price: 50,
      description: "Descrição inicial",
      category: "Categoria Inicial",
      image: "https://example.com/initial-image.jpg",
    };

    render(
      <ProductForm
        onSubmit={mockOnSubmit}
        isPending={false}
        title="Editar Produto"
        initialData={initialData}
      />
    );

    expect((screen.getByLabelText(/título/i) as HTMLInputElement).value).toBe(
      "Produto Inicial"
    );
    expect((screen.getByLabelText(/preço/i) as HTMLInputElement).value).toBe(
      "50"
    );
    expect(
      (screen.getByLabelText(/descrição/i) as HTMLTextAreaElement).value
    ).toBe("Descrição inicial");
    expect(
      (screen.getByLabelText(/categoria/i) as HTMLInputElement).value
    ).toBe("Categoria Inicial");
    expect(
      (screen.getByLabelText(/imagem \(url\)/i) as HTMLInputElement).value
    ).toBe("https://example.com/initial-image.jpg");
  });
});
