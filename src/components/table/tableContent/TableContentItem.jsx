import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import routesData from "../../../routesData.json";
import tableContext from "../tableContext";

const TableContentItem = ({ item, index, editItem, isLoadingEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id: routeId, setData: setTable } = useContext(tableContext);

  useEffect(() => {
    setIsLoading(isLoadingEdit);
  }, [isLoadingEdit])
  

  const copyData = (text) => {
    return () => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Copiado en el portapapeles");
        })
        .catch(() => {
          alert("Error al copiar en el portapapeles");
        });
    };
  };


  const deleteItem = () => {
    setIsLoading(true);

    axios
      .delete(`${routesData.defaultLink}/${routeId}/${item._id}`)
      .then(() => {
        setTable(({ data = [], ...rest }) => {
          const newData = data.filter((i) => {
            if (i._id == item._id) {
              return false;
            }

            return true;
          });

          return {
            data: newData,
            ...rest,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Error al eliminar el elemento");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <tr className="group">
      <td className="p-2 border overflow-auto">{index}</td>
      {Object.keys(item).map((itemData) => {
        return (
          <td
            className="p-2 border overflow-auto"
            key={`${itemData}${item._id}`}>
            <div className="flex items-center justify-start gap-2">
              <p> {item[itemData].toString()} </p>
              <button
                className="opacity-40 hover:opacity-100 transition-all ease-in"
                onClick={copyData(item[itemData].toString())}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 stroke-rose-500">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
              </button>
            </div>
          </td>
        );
      })}

      <td className="p-2 border overflow-auto flex items-center gap-2">
        {!isLoading ? (
          <>
            <button onClick={deleteItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-700 hover:bg-red-300 rounded-md p-1 transition-colors ease-in">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>

            <button onClick={editItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-slate-500 hover:bg-slate-300   rounded-md p-1 transition-colors ease-in">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </>
        ) : (
          <div className="border-4 w-6 h-6 border-t-rose-500 rounded-full animate-spin" />
        )}
      </td>
    </tr>
  );
};

export default TableContentItem;
