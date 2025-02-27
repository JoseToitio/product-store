import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Dispatch, SetStateAction } from "react";

interface IPagination {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  totalPages: number;
}
export default function Pagination({setPage, page, totalPages}: IPagination) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <button
            onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeftIcon className="size-5" />
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Próximo
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
  );
}
