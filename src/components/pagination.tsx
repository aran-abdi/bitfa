import React from 'react';

const Pagination: React.FC<{
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 7;

        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let leftSide = currentPage - 2;
            let rightSide = currentPage + 2;

            if (leftSide <= 2) {
                rightSide = 5;
                leftSide = 1;
            }

            if (rightSide >= totalPages - 1) {
                rightSide = totalPages;
                leftSide = totalPages - 4;
            }

            for (let i = leftSide; i <= rightSide; i++) {
                pageNumbers.push(i);
            }

            if (leftSide > 2) {
                pageNumbers.unshift('...');
                pageNumbers.unshift(1);
            }

            if (rightSide < totalPages - 1) {
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex align-middle justify-center mt-12">
            <div className="flex justify-center items-center mt-4">
                <button
                    className={`px-4 py-2 mx-1 font-semibold rounded-md ${currentPage === 1 ? 'bg-gray-600 text-gray-400' : 'bg-[#ff9800] text-white'}`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pageNumbers.map((page, index) =>
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 font-semibold rounded-md ${currentPage === page ? 'bg-[#ff9800] text-white' : 'bg-gray-600 text-white'}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-3 py-1 mx-1 text-white">
                            {page}
                        </span>
                    )
                )}
                <button
                    className={`px-4 py-2 mx-1 font-semibold rounded-md ${currentPage === totalPages ? 'bg-gray-600 text-gray-400' : 'bg-[#ff9800] text-white'}`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;