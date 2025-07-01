type PaginationProps = {
  onLoadMore: () => void;
  onLoadLess: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  isFromSearch: boolean;
};

export default function Pagination({
  hasNext = true,
  hasPrev = false,
  onLoadLess,
  onLoadMore,
  isFromSearch,
}: PaginationProps) {
  return (
    <div className="pagination">
      {!isFromSearch && hasNext && (
        <button className="btn-default" onClick={onLoadMore}>
          Carregar mais
        </button>
      )}
      {!isFromSearch && hasPrev && (
        <button className="btn-default" onClick={onLoadLess}>
          Carregar menos
        </button>
      )}
    </div>
  );
}
