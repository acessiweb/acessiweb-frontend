"use client";

import { isCommonUser } from "@/utils/authorization";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

function UserAside() {
  return (
    <BaseAside>
      <li>
        <Link href="/config/perfil">Meu perfil</Link>
      </li>
      <li>
        <Link href="/config/conta">Minha conta</Link>
      </li>
    </BaseAside>
  );
}

function DefaultAside() {
  return <BaseAside />;
}

function BaseAside({ children }: { children?: ReactNode }) {
  return (
    <ul className="aside__menu">
      {children}
      <li>
        <Link href="/config/preferencias">Preferências</Link>
      </li>
    </ul>
  );
}

export default function ConfigLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <div>
      <aside>
        {session && isCommonUser(session.user.role) ? (
          <UserAside />
        ) : (
          <DefaultAside />
        )}
      </aside>
      {children}
    </div>
  );
}
