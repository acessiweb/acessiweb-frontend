import { useSession } from "@/context/auth";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person from "@mui/icons-material/Person";
import { usePathname } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Header() {
  const pathname = usePathname();
  const { username } = useSession();

  if (!pathname.includes("admin")) {
    return (
      <header className="header">
        <span>Olá {username}</span>
        <ul>
          <li>
            <Link className="default-link" href="/">
              Tela inicial
            </Link>
          </li>
          <li>
            <Link className="default-link" href="/projetos">
              Meus projetos
            </Link>
          </li>
          <li>
            <Link className="default-link" href="/solicitacoes">
              Minhas solicitações
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link className="default-link" href="/projetos/cadastrar">
              <ShoppingCartIcon />
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
          <Link className="default-link" href="/admin">
            Tela inicial
          </Link>
        </li>
        <li>
          <Link className="default-link" href="/admin/solicitacoes">
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
