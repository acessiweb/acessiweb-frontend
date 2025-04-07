import { useSession } from "@/context/auth";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person from "@mui/icons-material/Person";
import { usePathname } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import { useCart } from "@/context/cart";

export default function Header() {
  const pathname = usePathname();
  const { username } = useSession();
  const { guidelinesTotal } = useCart();

  const setLinkToActive = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const activeLink = document.querySelector(".default-link--active");

    activeLink?.classList.remove("default-link--active");

    e.currentTarget.classList.add("default-link--active");
  };

  if (!pathname.includes("admin")) {
    return (
      <header className="header">
        <span>Olá {username}</span>
        <ul>
          <li>
            <Link className="default-link" href="/" onClick={setLinkToActive}>
              Tela inicial
            </Link>
          </li>
          <li>
            <Link
              className="default-link"
              href="/projetos"
              onClick={setLinkToActive}
            >
              Meus projetos
            </Link>
          </li>
          <li>
            <Link
              className="default-link"
              href="/solicitacoes"
              onClick={setLinkToActive}
            >
              Minhas solicitações
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              className="default-link"
              href="/projetos/cadastrar"
              style={{ position: "relative" }}
            >
              <ShoppingCartIcon />
              <span className="header__cart-total">{guidelinesTotal}</span>
            </Link>
          </li>
          <li>
            <Link className="default-link" href="/config/perfil">
              <Person />
            </Link>
          </li>
        </ul>
      </header>
    );
  }

  return (
    <header className="header">
      <ul>
        <li>
          <Link
            className="default-link"
            href="/admin"
            onClick={setLinkToActive}
          >
            Tela inicial
          </Link>
        </li>
        <li>
          <Link
            className="default-link"
            href="/admin/solicitacoes"
            onClick={setLinkToActive}
          >
            Solicitações
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link className="default-link" href="/admin/config">
            <SettingsIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
}
