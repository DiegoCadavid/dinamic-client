import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TableContent from "./tableContent/TableContent";
import TableHeader from "./tableHeader/TableHeader";
import TablePaginate from "./tablePaginate/TablePaginate";

import routesData from "../../routesData.json";
import tableContext from "./tableContext";

const Table = ({}) => {
  const [table, setTable] = useState({});
  const [querys, setQuerys] = useState("");
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isNoFound, setIsNoFound] = useState(false);
  const { id = "" } = useParams();


  useEffect(() => {
    setIsLoading(true);
    setIsNoFound(false);

    axios
      .get(`${routesData.defaultLink}/${id}?page=${page}&${querys}`)
      .then(({ data }) => {
        setTable(data);
      })
      .catch((err) => {
        if (err.response.status) {
          return setIsNoFound(true);
        }

        console.log(err);
      })
      .finally((res) => {
        setIsLoading(false);
      });
  }, [querys, page, id]);

  //
  useEffect(() => {
    setTable({});
    setQuerys("");
    setPage(1);
  }, [id]);

  return (
    <div className="h-screen w-full pt-3 px-7 flex-grow  flex flex-col justify-center gap-8 overflow-y-auto">
      {isLoading && (
        <>
          <div className="flex items-center justify-center gap-3">
            <div className="border-8 border-transparent border-t-rose-400 rounded-full animate-spin h-8 w-8"></div>
          </div>
        </>
      )}

      {!isLoading && isNoFound && (
        <>
          <p className="text-center p-3 text-rose-500">
            <span className="font-bold">"{id}"</span> no encontrado 😶‍🌫️
          </p>
        </>
      )}

      {!isLoading && table?.data && (
        <>
          <tableContext.Provider value={{
            data: table,
            setData: setTable,
            setQuerys: setQuerys,
            id: id
          }}>

            <TableHeader />

            {table.data.length > 0 && (
              <>
                <TableContent/>
                <TablePaginate setPage={setPage} />
              </>
            )}
          </tableContext.Provider>

          {table.data.length <= 0 && (
            <div className="flex-grow flex flex-col justify-center items-center font-bold text-rose-400">
              <p>No data</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                />
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  );
  1;
};

export default Table;
