import { render, screen, } from "@testing-library/react";
import { useParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { IProduct } from "@/services/types";
import ProductPage from "@/app/product/[id]/page";
import React, { ReactElement } from "react";


// Mocking necessary hooks and components
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useProducts", () => ({
  useProducts: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock(
    'next/link',
    () =>
      ({ children, ...rest }: { children: ReactElement }) =>
        React.cloneElement(children, { ...rest }),
  );

// Mock product data
const mockProduct: IProduct = {
  id: 1,
  title: "Nike Shoes",
  price: 299.99,
  description: "Comfortable running shoes",
  category: "Sport",
  image: "http://example.com/image.jpg",
  rating: {
    rate: 4.5,
    count: 150,
  },
};

describe("ProductPage", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    (useProducts as jest.Mock).mockReturnValue({
      getProductById: jest.fn().mockReturnValue(mockProduct),
      deleteProductMutation: jest.fn(),
    });
  });

  test("should render the product details correctly", () => {
    render(<ProductPage />);

    expect(screen.getByText(/nike shoes/i)).toBeInTheDocument();
    expect(screen.getByText(/comfortable running shoes/i)).toBeInTheDocument();
    expect(screen.getByText(/sport/i)).toBeInTheDocument();
    expect(screen.getByText("R$ 299.99")).toBeInTheDocument();
    expect(screen.getByText(/4.5/i)).toBeInTheDocument();
    expect(screen.getByText("(150 reviews)")).toBeInTheDocument();
  });

  test("should show 'Loading...' if the product is loading", () => {
    (useProducts as jest.Mock).mockReturnValue({
      getProductById: jest.fn().mockReturnValue(null),
      deleteProductMutation: jest.fn(),
    });

    render(<ProductPage />);
    expect(screen.getByText(/carregando.../i)).toBeInTheDocument();
  });


  test("should render the 'Edit Product' link", () => {
    render(<ProductPage />);

    expect(
      screen.getByRole("button", { name: /Editar Produto/i })
    ).toBeInTheDocument();
  });
});
