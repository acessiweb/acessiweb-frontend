import { useSession } from "@/context/auth";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import { usePathname } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import { useCart } from "@/context/cart";
import SearchIcon from "@mui/icons-material/Search";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { isAdmin, isCommonUser } from "@/common/utils/authorization";

export default function Header() {
  const pathname = usePathname();
  const { accessType } = useSession();
  const { guidelinesTotal } = useCart();

  const setLinkToActive = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const activeLink = document.querySelector(".default-link--active");
    activeLink?.classList.remove("default-link--active");
    e.currentTarget.classList.add("default-link--active");
  };

  if (!pathname.includes("admin") && !isAdmin(accessType)) {
    return (
      <header className="header">
        <span>Acessibiweb</span>
        <ul>
          <li>
            <Link className="default-link" href="/" onClick={setLinkToActive}>
              {isCommonUser(accessType) && "Tela inicial"}
            </Link>
          </li>
          {isCommonUser(accessType) && (
            <>
              <li>
                <Link
                  className={`default-link ${
                    pathname.includes("projetos") && "default-link--active"
                  }`}
                  href="/projetos"
                  onClick={setLinkToActive}
                >
                  Meus projetos
                </Link>
              </li>
              <li>
                <Link
                  className={`default-link ${
                    pathname.includes("solicitacoes") && "default-link--active"
                  }`}
                  href="/solicitacoes"
                  onClick={setLinkToActive}
                >
                  Minhas solicitações
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul>
          <li>
            <form>
              <div className="header__search-input">
                <button className="btn-default" type="button">
                  <MicNoneOutlinedIcon />
                </button>
                <input type="text" placeholder="Pesquisar..." />
                <SearchIcon />
              </div>
            </form>
          </li>
          <li className="cart-icon-wrapper">
            <Link
              className="cart-icon"
              href="/projetos/cadastrar"
              style={{ position: "relative" }}
              title="Carrinho"
            >
              <ShoppingCartOutlinedIcon />
              <span className="header__cart-total">{guidelinesTotal}</span>
            </Link>
          </li>
          {isCommonUser(accessType) && (
            <li className="person-icon-wrapper">
              <Link
                className="person-icon"
                href="/config/perfil"
                title="Conta de usuário"
              >
                <PersonOutlined />
              </Link>
            </li>
          )}
          <li style={{ columnGap: "10px" }}>
            <button className="btn-default">Logar</button>
            <button className="btn-default">Criar conta</button>
          </li>
          <li>
            <button className="btn-default">Ajuda</button>
          </li>
          <li>
            <button className="btn-default">Leitor de tela</button>
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
