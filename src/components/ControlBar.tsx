import { LuListFilter } from "react-icons/lu";
import { SlList } from "react-icons/sl";
import { SlGrid } from "react-icons/sl";
import useModal from "@/hooks/useModal";
import { useScreenType } from "@/hooks/useScreenType";
import { Breadcrumb, BreadcrumbProps } from "./Breadcrumb";
import { useHotkeys } from "react-hotkeys-hook";
import { FilterHandler, FilterOptions, FiltersAvailable } from "@/types/filter";
import { MouseEvent, KeyboardEvent } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

type ControlBarProps = FilterHandler &
  Partial<BreadcrumbProps> & {
    handleView: () => void;
    view: string;
    filtersOptions?: FilterOptions;
    handleFilters: (_filter: FiltersAvailable) => void;
    showMoreOptions?: boolean;
    moreOptions?: string[];
  };

export default function ControlBar({
  handleView,
  view,
  crumbs,
  filtersOptions,
  handleFilters,
  handleFiltering,
  showMoreOptions = false,
  moreOptions,
}: ControlBarProps) {
  const { isDesktop } = useScreenType();
  const {
    showModal: showFiltersModal,
    isModalOpen: isFiltersModalOpen,
    modalRef: filtersModalRef,
    toggleModal: toggleFiltersModal,
  } = useModal();
  const {
    showModal: showOptionsModal,
    isModalOpen: isOptionsModalOpen,
    modalRef: optionsModalRef,
    toggleModal: toggleOptionsModal,
  } = useModal();
  useHotkeys("F", toggleFiltersModal);
  useHotkeys("O", toggleOptionsModal);

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
            className="btn-icon cursor-pointer"
            aria-label="Abrir opções de filtro"
            title="Pressione a tecla F"
            aria-expanded={isFiltersModalOpen}
            style={{ position: "relative" }}
            onClick={showFiltersModal}
            aria-haspopup="dialog"
            aria-keyshortcuts="F"
          >
            <LuListFilter
              className="cursor-pointer"
              aria-hidden={true}
              focusable={false}
            />
            {isFiltersModalOpen && (
              <dialog
                className="modal"
                ref={filtersModalRef}
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
                      className="cursor-pointer"
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
            className="btn-icon cursor-pointer"
            onClick={handleView}
            aria-label="Alternar layout dos cards"
            aria-pressed={view === "grid" ? false : true}
          >
            {view === "grid" && (
              <SlList
                className="cursor-pointer"
                aria-hidden={true}
                focusable={false}
              />
            )}
            {view === "list" && (
              <SlGrid
                className="cursor-pointer"
                aria-hidden={true}
                focusable={false}
              />
            )}
            <span role="status" className="sr-only">
              {view === "grid"
                ? "Layout grid ativado"
                : "Layout de lista ativado"}
            </span>
          </button>
        )}
        {showMoreOptions && moreOptions && (
          <button
            className="btn-icon cursor-pointer"
            aria-label="Abrir opções de filtro"
            title="Pressione a tecla F"
            aria-expanded={isOptionsModalOpen}
            style={{ position: "relative" }}
            onClick={showOptionsModal}
            aria-haspopup="dialog"
            aria-keyshortcuts="F"
          >
            <PiDotsThreeOutlineFill
              className="cursor-pointer"
              aria-hidden={true}
              focusable={false}
            />
            {isOptionsModalOpen && (
              <dialog
                className="modal"
                ref={optionsModalRef}
                aria-modal={true}
                aria-label="Opções de filtro"
              >
                <ul>
                  {moreOptions.map((option) => (
                    <li
                      key={option}
                      id={option}
                      onClick={handleClick}
                      onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
                      tabIndex={0}
                      className="cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </dialog>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
