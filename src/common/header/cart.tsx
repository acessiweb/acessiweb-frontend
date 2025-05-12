import Link from "next/link";
import { SlBasket } from "react-icons/sl";

export default function Cart({ guidelinesTotal }: { guidelinesTotal: number }) {
  return (
    <Link
      href="/projetos/cadastrar"
      title="Carrinho"
      aria-label="Ir para tela de cadastro de projeto"
      className="cart-count"
    >
      <SlBasket aria-hidden={true} focusable={false} />
      <span role="status" aria-atomic={true}>
        {guidelinesTotal}
      </span>
    </Link>
  );
}
