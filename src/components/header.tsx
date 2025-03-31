import { useSession } from "@/context/auth";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person from "@mui/icons-material/Person";
import styled from "styled-components";

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

  a {
    padding: ${(props) => props.theme.spacing.sm};
    border-radius: ${(props) => props.theme.borderRadius.small};
  }

  a:hover {
    background-color: ${(props) => props.theme.colors.lightPurpleDefault};
  }
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  column-gap: ${(props) => props.theme.spacing.lg};
`;

export default function Header() {
  const { accessType, username } = useSession();

  if (accessType === "USER") {
    return (
      <HeaderWrapper>
        <span>Olá {username}</span>
        <List>
          <li>
            <Link href="/">Tela inicial</Link>
          </li>
          <li>
            <Link href="/projetos">Meus projetos</Link>
          </li>
          <li>
            <Link href="/solicitacoes">Minhas solicitações</Link>
          </li>
        </List>
        <List>
          <li>
            <ShoppingCartIcon />
          </li>
          <li>
            <Person />
          </li>
        </List>
      </HeaderWrapper>
    );
  }

  return <HeaderWrapper></HeaderWrapper>;
}
