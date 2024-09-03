const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="flex items-center justify-center">
      <button
        className={`border h-[36px] p-[11px] flex items-center justify-center rounded-md mr-1 hover:bg-gray-200 ${
          currentPage === 1 && "cursor-not-allowed"
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        previous
      </button>
      <div className="flex items-center justify-center">
        {generatedPages.map((page) => (
          <div
            key={page}
            className={`w-[35px] h-[35px] flex items-center justify-center rounded-md 
            cursor-pointer border hover:bg-[var(--main-color)] hover:text-white ${
              currentPage === page && "bg-[var(--main-color)] text-white"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </div>
        ))}
      </div>
      <button
        className={`border h-[36px] p-[11px] flex items-center justify-center rounded-md ml-1 hover:bg-gray-200 ${
          currentPage === pages && "cursor-not-allowed"
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
