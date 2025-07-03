type PaginationProps = {
  onLoadMore: () => void;
  onLoadLess: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  isFiltering: boolean;
};

export default function Pagination({
  hasNext = true,
  hasPrev = false,
  onLoadLess,
  onLoadMore,
  isFiltering,
}: PaginationProps) {
  return (
    <div className="pagination">
      {!isFiltering && hasNext && (
        <button className="btn-default" onClick={onLoadMore}>
          Carregar mais
        </button>
      )}
      {!isFiltering && hasPrev && (
        <button className="btn-default" onClick={onLoadLess}>
          Carregar menos
        </button>
      )}
    </div>
  );
}
