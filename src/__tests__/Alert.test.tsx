import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "@/components/Alert";

// Mock para a função onConfirm
const mockOnConfirm = jest.fn();

afterEach(cleanup); // Limpa o DOM após cada teste

describe("Alert component", () => {
  it("renders the alert modal correctly", () => {
    // Mock para setAlert
    const mockSetAlert = jest.fn();

    render(<Alert setAlert={mockSetAlert} onConfirm={mockOnConfirm} />);

    // Verifica se o modal de confirmação foi renderizado
    expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
    expect(
      screen.getByText(/tem certeza de que deseja excluir/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Excluir/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
  });

  it("calls onConfirm when the 'Excluir' button is clicked", async () => {
    const mockSetAlert = jest.fn();
    
    render(<Alert setAlert={mockSetAlert} onConfirm={mockOnConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: /excluir/i }));
    await waitFor(() => expect(mockOnConfirm).toHaveBeenCalledTimes(1));
  });

  it("closes the modal when the 'Cancelar' button is clicked", async () => {
    const mockSetAlert = jest.fn();

    render(<Alert setAlert={mockSetAlert} onConfirm={mockOnConfirm} />);
    fireEvent.click(screen.getByText(/cancelar/i));
    await waitFor(() => expect(mockSetAlert).toHaveBeenCalledWith(false));
  });
});
