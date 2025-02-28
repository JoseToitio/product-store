import { mockItems } from "@/mock/products";
import "@testing-library/jest-dom";

// jest.setup.ts

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(mockItems),
      ok: true,
      status: 200,
      statusText: "OK",
      headers: {
        get: jest.fn(),
      },
      redirected: false,
      type: "default",
      url: "https://fakestoreapi.com/products",
    } as unknown as Response) 
);
