import React, { useContext, useEffect, useState } from "react";
import tableContext from "../tableContext";

const TablePaginate = () => {
  const { data: table, setPage:setIndexPage } = useContext(tableContext);
  
  const pageInfo = {
    page: table.page || 0,
    pagesCount: table.pagesCount || 0,
  }

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
            } hover:bg-rose-600 transition-colors ease-in text-sm text-zinc-100`}>
            {" "}
            {page}{" "}
          </button>
        );
      })}
    </div>
  );
};

export default TablePaginate;
