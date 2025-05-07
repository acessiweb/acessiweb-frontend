import { isAdmin, isCommonUser, isVisitor } from "@/common/utils/authorization";
import { useSession } from "@/context/auth";
import { VscHome, VscTerminal, VscListUnordered } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import {
  IoCartOutline,
  IoPersonOutline,
  IoHelp,
  IoPersonAddOutline,
  IoLogInOutline,
} from "react-icons/io5";
import { useCart } from "@/context/cart";

export default function HeaderMobile() {
  const pathname = usePathname();
  const { accessType } = useSession();
  const { guidelinesTotal } = useCart();

  if (!pathname.includes("admin") && !isAdmin(accessType)) {
    return (
      <header className="header-mobile">
        <div>
          <div>
            <VscHome />
          </div>
          {isCommonUser(accessType) && (
            <>
              <div>
                <VscTerminal />
              </div>
              <div>
                <IoHelp />
              </div>
              <div>
                <VscListUnordered />
              </div>
            </>
          )}
          <div style={{ position: "relative" }}>
            <IoCartOutline />
            <span className="header__cart-total">{guidelinesTotal}</span>
          </div>
          {isVisitor(accessType) && (
            <>
              <div>
                <IoHelp />
              </div>
              <div>
                <IoLogInOutline />
              </div>
              <div>
                <IoPersonAddOutline />
              </div>
            </>
          )}
          {isCommonUser(accessType) && (
            <div>
              <IoPersonOutline />
            </div>
          )}
        </div>
      </header>
    );
  }

  return <header></header>;
}
