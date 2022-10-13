import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TableModalCreate from "./TableModalCreate";
import routesData from "../../../../routesData.json";
import tableContext from "../../tableContext";

const TableFormCreate = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [schema, setSchema] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id, setData: setTable } = useContext(tableContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`${routesData.defaultLink}/${id}/route`)
      .then(({ data }) => {
        setSchema(data.schema);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const openModalCreate = () => {
    setShowModalCreate(true);
  };

  const closeModalCreate = () => {
    setShowModalCreate(false);
  };

  return (
    <div className="h-full py-2">
      {!isLoading ? (
        <button
          onClick={openModalCreate}
          className="h-full aspect-square flex items-center justify-center gap-0.5 text-zinc-100 bg-rose-400 hover:bg-rose-600 transition-colors ease-in p-1 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      ) : (
        <div className="w-6 h-6 border-4 border-transparent border-t-rose-500 rounded-full animate-spin"></div>
      )}

      {showModalCreate && (
        <TableModalCreate
          closeModal={closeModalCreate}
          setTable={setTable}
          id={id}
          schema={schema}
        />
      )}
    </div>
  );
};

export default TableFormCreate;
