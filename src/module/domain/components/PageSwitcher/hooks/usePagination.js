export const usePagination = ({ currentPage, totalPages }) => {

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;
    if (startPage < 1) {
        endPage += 1 - startPage;
        startPage = 1;
    }
    if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
    }
    if (startPage < 1) {
        startPage = 1;
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return {
        prevPage,
        nextPage,
        pageNumbers
    };
};