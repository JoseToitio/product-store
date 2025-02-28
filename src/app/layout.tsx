"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
        </body>
      </Provider>
    </html>
  );
}