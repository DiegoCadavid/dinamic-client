import React, { useEffect, useState } from "react";

const TablePaginate = ({ table = {}, setPage: setIndexPage }) => {
  // CAMBIAR TODA ESTA PAGINACION Y HACER ESTA :
  // https://bezkoder.com/wp-content/uploads/2020/08/vue-pagination-axios-api-bootstrap-vue-default.png

  const [pageInfo, setPageInfo] = useState({
    page: table.page || 0,
    pagesCount: table.pagesCount || 0,
  });

  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages([]);
    for (let i = 0; i < pageInfo.pagesCount; i++) {
      setPages((prev) => [...prev, i + 1]);
    }
  }, []);

  const handleGoPage = (page) => {
    return () => {
      setIndexPage(page);
    };
  };

  return (
    <div className="mb-8 p-3 flex items-center justify-center gap-1">
      {pages.map((page) => {
        return (
          <button
            onClick={handleGoPage(page)}
            key={page}
            className={`h-8 w-8 rounded-full ${
              page != pageInfo.page ? "bg-rose-400" : "bg-rose-700"
            } hover:bg-rose-600 transition-colors ease-in text-sm text-zinc-100`}
          >
            {" "}
            {page}{" "}
          </button>
        );
      })}
    </div>
  );
};

export default TablePaginate;
