/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white px-4 lg:px-6 py-2.5">
      <nav className="mx-auto max-w-screen-xl flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only text-gray-900">Product Store</span>
            <img
              alt=""
              src="https://images.vexels.com/media/users/3/137627/isolated/preview/012f7bd53633f5a6e78e60ea08948c55-logotipo-minimalista-do-infinito.png"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href={"/product/new"}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Criar Novo Produto
          </Link>
        </div>
      </nav>
    </header>
  );
}