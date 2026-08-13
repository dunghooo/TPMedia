import "./Pagination.css";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">

            {/* Trang trước */}
            <button
                type="button"
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                ‹
            </button>

            {/* Các trang */}
            {pages.map((page) => (
                <button
                    type="button"
                    key={page}
                    className={
                        currentPage === page
                            ? "pagination-page active"
                            : "pagination-page"
                    }
                    onClick={() =>
                        onPageChange(page)
                    }
                >
                    {page}
                </button>
            ))}

            {/* Trang sau */}
            <button
                type="button"
                className="pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                ›
            </button>

        </div>
    );
};

export default Pagination;