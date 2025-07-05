import { LuListFilter } from "react-icons/lu";
import { SlList } from "react-icons/sl";
import { SlGrid } from "react-icons/sl";
import useModal from "@/hooks/useModal";
import { useScreenType } from "@/hooks/useScreenType";
import { Breadcrumb, BreadcrumbProps } from "./Breadcrumb";
import { useHotkeys } from "react-hotkeys-hook";
import { FilterHandler, FilterOptions, FiltersAvailable } from "@/types/filter";
import { MouseEvent, KeyboardEvent } from "react";

type ControlBarProps = FilterHandler &
  Partial<BreadcrumbProps> & {
    handleView: () => void;
    view: string;
    filtersOptions?: FilterOptions;
    handleFilters: (_filter: FiltersAvailable) => void;
  };

export default function ControlBar({
  handleView,
  view,
  crumbs,
  filtersOptions,
  handleFilters,
  handleFiltering,
}: ControlBarProps) {
  const { isDesktop } = useScreenType();
  const { showModal, isModalOpen, modalRef, toggleModal } = useModal();
  useHotkeys("F", toggleModal);

  const handleClick = (
    e: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>
  ) => {
    const event = e.currentTarget.id as FiltersAvailable;
    handleFilters(event);
    handleFiltering(true);
  };

  return (
    <div className="control-bar">
      {crumbs && crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}
      <div className="control-bar__options">
        {filtersOptions && filtersOptions.length > 0 && (
          <button
            className="btn-icon"
            aria-label="Abrir opções de filtro"
            title="Pressione a tecla F"
            aria-expanded={isModalOpen}
            style={{ position: "relative" }}
            onClick={showModal}
            aria-haspopup="dialog"
            aria-keyshortcuts="F"
          >
            <LuListFilter aria-hidden={true} focusable={false} />
            {isModalOpen && (
              <dialog
                className="modal"
                ref={modalRef}
                aria-modal={true}
                aria-label="Opções de filtro"
              >
                <ul>
                  {filtersOptions.map((val) => (
                    <li
                      key={val.id}
                      id={val.id}
                      onClick={handleClick}
                      onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
                      tabIndex={0}
                    >
                      {val.desc}
                    </li>
                  ))}
                </ul>
              </dialog>
            )}
          </button>
        )}
        {isDesktop && (
          <button
            className="btn-icon"
            onClick={handleView}
            aria-label="Alternar layout dos cards"
            aria-pressed={view === "grid" ? false : true}
          >
            {view === "grid" && <SlList aria-hidden={true} focusable={false} />}
            {view === "list" && <SlGrid aria-hidden={true} focusable={false} />}
            <span role="status" className="sr-only">
              {view === "grid"
                ? "Layout grid ativado"
                : "Layout de lista ativado"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
