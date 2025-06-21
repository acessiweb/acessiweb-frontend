import { LuListFilter } from "react-icons/lu";
import { SlList } from "react-icons/sl";
import { SlGrid } from "react-icons/sl";
import useModal from "@/hooks/useModal";
import { ReactNode } from "react";
import { useScreenType } from "@/hooks/useScreenType";
import { Breadcrumb, BreadcrumbProps } from "./breadcrumb";

type ControlBarOptionsProps = BreadcrumbProps & {
  handleView: () => void;
  view: string;
  children: ReactNode;
};

export default function ControlBarOptions({
  handleView,
  view,
  children,
  crumbs,
}: ControlBarOptionsProps) {
  const { isTablet, isDesktop, isMobile } = useScreenType();
  const {
    showModal: showFilterModal,
    isModalOpen: isFilterModalOpen,
    modalRef: filterModalRef,
  } = useModal();

  return (
    <div className="control-bar-options">
      {(isMobile || isTablet) && <Breadcrumb crumbs={crumbs} />}
      <div className="control-bar-options__filters">
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
            <h4>Mais opções de filtro</h4>
            <div className="control-bar-options__options">
              <div>
                <span>Filtrar por data de criação</span>
                <form className="control-bar-options__options__form-dates">
                  <div>
                    <label htmlFor="creation-initial-date">
                      Data de início
                    </label>
                    <input
                      className="input-text-wrapper"
                      type="date"
                      id="creation-initial-date"
                    />
                  </div>
                  <div>
                    <label htmlFor="creation-end-date">Data final</label>
                    <input
                      className="input-text-wrapper"
                      type="date"
                      id="creation-end-date"
                    />
                  </div>
                </form>
              </div>

              {children}
            </div>
          </dialog>
        </button>
        {isDesktop && (
          <button className="btn-icon" onClick={handleView}>
            {view === "grid" && <SlList />} {view === "list" && <SlGrid />}
          </button>
        )}
      </div>
    </div>
  );
}
