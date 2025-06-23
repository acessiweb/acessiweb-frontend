import { LuListFilter } from "react-icons/lu";
import { SlList } from "react-icons/sl";
import { SlGrid } from "react-icons/sl";
import useModal from "@/hooks/useModal";
import { useScreenType } from "@/hooks/useScreenType";
import { Breadcrumb, BreadcrumbProps } from "./breadcrumb";

type ControlBarProps = Partial<BreadcrumbProps> & {
  handleView: () => void;
  view: string;
  filtersOptions?: {
    id: string;
    desc: string;
  }[];
  handleFilters: (_filter: string) => void;
};

export default function ControlBar({
  handleView,
  view,
  crumbs,
  filtersOptions,
  handleFilters,
}: ControlBarProps) {
  const { isDesktop } = useScreenType();
  const {
    showModal: showFilterModal,
    isModalOpen: isFilterModalOpen,
    modalRef: filterModalRef,
  } = useModal();

  return (
    <div className="control-bar">
      {crumbs && crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}
      <div className="control-bar__options">
        {filtersOptions && filtersOptions.length > 0 && (
          <button
            className="btn-icon"
            aria-label="Abrir opções de filtro"
            title="Filtros"
            aria-pressed={isFilterModalOpen}
            style={{ position: "relative" }}
            onClick={showFilterModal}
          >
            <LuListFilter />
            <dialog
              className="modal"
              ref={filterModalRef}
              aria-modal={true}
              aria-label="Opções de filtro"
            >
              <ul>
                {filtersOptions.map((val, i) => (
                  <li
                    key={i}
                    id={val.id}
                    onClick={(e) => handleFilters(e.currentTarget.id)}
                  >
                    {val.desc}
                  </li>
                ))}
              </ul>
            </dialog>
          </button>
        )}
        {isDesktop && (
          <button className="btn-icon" onClick={handleView}>
            {view === "grid" && <SlList />} {view === "list" && <SlGrid />}
          </button>
        )}
      </div>
    </div>
  );
}
