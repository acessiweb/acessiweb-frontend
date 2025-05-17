import CardDelete from "./delete";
import Link from "next/link";
import { useSecPage } from "@/context/sec-page";
import { SlPencil } from "react-icons/sl";

type CardUpdateAndDeleteProps = {
  registerId: string;
  registerName: string;
  onDelete: (id: string) => void;
  updateRoute: string;
};

export default function CardUpdateAndDelete({
  updateRoute,
  onDelete,
  registerId,
  registerName,
}: CardUpdateAndDeleteProps) {
  const { setIsOpen } = useSecPage();

  const handleSecPage = () => {
    setIsOpen(true);
    document.body.classList.add("two-pages");
  };

  return (
    <div style={{ display: "flex" }}>
      <Link
        className="btn-transparent"
        href={`${updateRoute.replace("[id]", registerId)}`}
        onClick={handleSecPage}
        title="Editar"
      >
        <SlPencil />
      </Link>
      <CardDelete
        onDelete={onDelete}
        registerId={registerId}
        registerName={registerName}
      />
    </div>
  );
}
