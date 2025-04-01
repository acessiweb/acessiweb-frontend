import { useSession } from "@/context/auth";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person from "@mui/icons-material/Person";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";

const HeaderWrapper = styled.header`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.grayDefault};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.small};
  align-items: center;
  justify-content: space-between;

  > span {
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    font-size: ${(props) => props.theme.fontSize.medium};
  }
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  column-gap: ${(props) => props.theme.spacing.lg};
`;

export default function Header() {
  const pathname = usePathname();
  const { username } = useSession();

  if (!pathname.includes("admin")) {
    return (
      <HeaderWrapper>
        <span>Olá {username}</span>
        <List>
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
        </List>
        <List>
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
        </List>
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <List>
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
      </List>
      <List>
        <li>
          <Link className="default-link" href="/admin/config">
            <SettingsIcon />
          </Link>
        </li>
      </List>
    </HeaderWrapper>
  );
}
