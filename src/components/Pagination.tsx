type PaginationProps = {
  onLoadMore: () => void;
  onLoadLess: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
};

export default function Pagination({
  hasNext = true,
  hasPrev = false,
  onLoadLess,
  onLoadMore,
}: PaginationProps) {
  return (
    <div className="pagination">
      {hasNext && (
        <button className="btn-default cursor-pointer" onClick={onLoadMore}>
          Carregar mais
        </button>
      )}
      {hasPrev && (
        <button className="btn-default cursor-pointer" onClick={onLoadLess}>
          Carregar menos
        </button>
      )}
    </div>
  );
}
