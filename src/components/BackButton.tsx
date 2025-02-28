import { useRouter } from "next/navigation";
interface IBackButtton {
  className?: string; // Permite personalização de classes CSS
  texto?: string; // Permite alterar o texto do botão
}

export default function BackButton({ className, texto }: IBackButtton) {
  const router = useRouter()

  const handleBack = () => {
    router.back(); // Volta para a página anterior
  };

  return (
    <button
      onClick={handleBack}
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
    >
      {texto || "Voltar"}
    </button>
  );
}
