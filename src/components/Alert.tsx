import { Dispatch, SetStateAction } from "react";

interface IAlert {
  setAlert: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void; // Função para lidar com a confirmação de exclusão
}

export default function Alert({ setAlert, onConfirm }: IAlert) {
  const handleClose = () => {
    setAlert(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setAlert(false);
  };

  return (
    <>
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose} // Fecha o popup ao clicar fora
      ></div>

      {/* Popup de exclusão */}
      <div
        id="alert-additional-content-2"
        className="p-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-md"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            className="shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">Confirmar exclusão</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Tem certeza de que deseja excluir este item?
        </div>
        <div className="flex">
          <button
            type="button"
            className="text-white gap-1 bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleConfirm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Excluir
          </button>
          <button
            type="button"
            className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
