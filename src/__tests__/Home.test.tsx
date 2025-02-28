import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { store } from "@/store";

describe("Página inicial", () => {
  it("deve renderizar os Produtos", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    await waitFor(() => expect(screen.getByText("Produto A")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Produto B")).toBeInTheDocument());
  });

  it("It must contain the categories tab", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const category = screen.getByText('Todas as Categorias')
    expect(category).toBeInTheDocument();
  });

  it("It must contain the min/max tab", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const category = screen.getByText('Selecionar filtro')
    expect(category).toBeInTheDocument();
  });
});
