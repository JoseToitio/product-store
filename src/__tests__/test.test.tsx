import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { store } from "@/store";

describe("Página inicial", () => {
  it("deve renderizar um título", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
