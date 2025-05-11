import { isAdmin, isCommonUser, isVisitor } from "@/common/utils/authorization";
import { useSession } from "@/context/auth";
import { usePathname } from "next/navigation";
import { IoPersonOutline, IoHelp } from "react-icons/io5";
import {
  SlHome,
  SlBasket,
  SlLogin,
  SlSettings,
  SlLogout,
} from "react-icons/sl";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { useCart } from "@/context/cart";
import { useState } from "react";

export default function HeaderMobile() {
  const pathname = usePathname();
  const { accessType } = useSession();
  const { guidelinesTotal } = useCart();
  const [showUserOptions, setShowUserOptions] = useState(false);

  if (pathname.includes("admin") && isAdmin(accessType)) {
    return (
      <header className="header-mobile">
        <div>
          <button>
            <SlHome />
          </button>
          <button className="add-guideline">
            <PiPersonArmsSpreadLight />
            <span>&#43;</span>
          </button>
          <button>
            <IoHelp />
          </button>
          <button>
            <SlSettings />
          </button>
          <button>
            <SlLogout />
          </button>
        </div>
      </header>
    );
  }

  if (!pathname.includes("admin") && isCommonUser(accessType)) {
    return (
      <header className="header-mobile">
        <div>
          <button>
            <SlHome />
          </button>
          <button className="cart-count">
            <SlBasket />
            <span>{guidelinesTotal}</span>
          </button>
          <button>
            <IoHelp />
          </button>
          <button>
            <SlSettings />
          </button>
          <button>
            <SlLogout />
          </button>
        </div>
      </header>
    );
  }

  if (!pathname.includes("admin") && isVisitor(accessType)) {
    return (
      <header className="header-mobile">
        <div>
          <button>
            <SlHome />
          </button>
          <button className="cart-count">
            <SlBasket />
            <span>{guidelinesTotal}</span>
          </button>
          <button>
            <IoHelp />
          </button>
          <button
            style={{ position: "relative" }}
            onClick={() => setShowUserOptions((prev) => !prev)}
          >
            <IoPersonOutline />
            {showUserOptions && (
              <div className="icon-modal">
                <button>
                  <SlLogin />
                </button>
                <button className="add-account">
                  <IoPersonOutline />
                  <span>&#43;</span>
                </button>
              </div>
            )}
          </button>
          <button>
            <SlSettings />
          </button>
        </div>
      </header>
    );
  }
}
