"use client";

import { isCommonUser } from "@/utils/authorization";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function BaseAside({
  children,
  pathname,
}: {
  children?: ReactNode;
  pathname: string;
}) {
  return (
    <ul className="config__menu">
      {children}
      <li
        className={
          pathname.includes("pref") ? "config__tab--active" : undefined
        }
      >
        <Link href="/config/preferencias">Preferências</Link>
      </li>
    </ul>
  );
}

export default function ConfigLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <main className="config">
      <aside>
        {session && isCommonUser(session.user.role) ? (
          <BaseAside pathname={pathname}>
            <li
              className={
                pathname.includes("perfil") ? "config__tab--active" : undefined
              }
            >
              <Link href="/config/perfil">Meu perfil</Link>
            </li>
            <li
              className={
                pathname.includes("conta") ? "config__tab--active" : undefined
              }
            >
              <Link href="/config/conta">Minha conta</Link>
            </li>
          </BaseAside>
        ) : (
          <BaseAside pathname={pathname} />
        )}
      </aside>
      <div className="config__content">{children}</div>
    </main>
  );
}
