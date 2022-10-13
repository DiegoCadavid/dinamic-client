import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import tableContext from "../tableContext";
import TableContentItem from "./TableContentItem";
import routesData from "../../../routesData.json";
import TableForm from "../tableForm/TableForm";
import { useForm } from "react-hook-form";

const TableContent = () => {
  const { setData: setTable, data: table, id } = useContext(tableContext);

  // Edit element
  const [elementId, setElementId] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [errorMessageEdit, setErrorMessageEdit] = useState("");

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [schemaEdit, setSchemaEdit] = useState([]);

  const [isLoadingPutEdit, setIsLoadingPutEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const editItem = (itemId) => {
    return () => {
      if (schemaEdit.length == 0) {
        return console.log("Cargando schema");
      }

      setElementId(itemId);
      setShowModalEdit(true);
    };
  };

  useEffect(() => {
    setIsLoadingEdit(true);
    axios
      .post(`${routesData.defaultLink}/${id}/route`)
      .then(({ data }) => {
        setSchemaEdit(data.schema);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingEdit(false);
      });
  }, []);

  const onSubmitEdit = (data) => {
    setIsLoadingPutEdit(true);
    let formatData = {};
    Object.keys(data)
      .filter((itemName) => {
        if ( typeof data[itemName] != "boolean" &&  data[itemName] == "") {
          return false;
        }

        return true;
      })
      .forEach((itemName) => {
        const itemSchema =
          schemaEdit[schemaEdit.map(({ name }) => name).indexOf(itemName)];

        if (itemSchema.type == "Number") {
          return (formatData[itemName] = Number(data[itemName]));
        }

        formatData[itemName] = data[itemName];
      });

    axios
      .put(`${routesData.defaultLink}/${id}/${elementId}`, formatData)
      .then(({ data: { _id: id, ...rest } }) => {
        setTable(({ data = [], ...restTable }) => {
          const newTable = {
            data: data.map((e) => {
              if (e._id == id) {
                return {
                  _id: id,
                  ...rest,
                };
              }

              return e;
            }),
            ...restTable,
          };

          console.log(newTable);

          return newTable;
        });

        reset();
        setShowModalEdit(false);
        setElementId("");
      })
      .catch((err) => {
        if (err.response.status == 400) {
          let msgAlert = "";
          err.response.data
            .map(({ msg }) => msg)
            .forEach((e, i) => {
              msgAlert += `${e} ${i > 0 ? "\n" : ""}`;
            });

          setErrorMessageEdit(msgAlert);
        }
      })
      .finally(() => {
        setIsLoadingPutEdit(false);
      });
  };

  return (
    <div className="flex-grow flex items-start justify-center overflow-y-auto ">
      <div className="w-full">
        <table className="w-full table-auto bg-zinc-50">
          <thead>
            <tr className="bg-zinc-100">
              <td className="p-2 pb-3 pt-6 font-medium text-rose-400 border border-zinc-300">
                #
              </td>
              {/* Titulo */}
              {Object.keys(table.data[0])
                .map((name) => {
                  if (name == "_id") return "id";
                  return name;
                })
                .map((name) => {
                  return (
                    <td
                      className="p-2 pb-3 pt-6 font-medium text-rose-400 border border-zinc-300"
                      key={name}>
                      {name}
                    </td>
                  );
                })}

              <td className="p-2 pb-3 pt-6 font-medium text-rose-400 border border-zinc-300">
                Acciones
              </td>
            </tr>
          </thead>
          <tbody>
            {/* Elementos  */}
            {table.data.map((item, i) => {
              return (
                <TableContentItem
                  key={item._id}
                  item={item}
                  index={i}
                  editItem={editItem(item._id)}
                  isLoadingEdit={isLoadingEdit}
                />
              );
            })}
          </tbody>
        </table>

        {/* Modal edit */}
        {showModalEdit && (
          <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="absolute inset-x-80 rounded-lg p-3 bg-zinc-100">
              <form
                onSubmit={handleSubmit(onSubmitEdit)}
                className="h-full flex flex-col justify-between">
                <TableForm
                  schema={schemaEdit}
                  register={register}
                  errors={errors}
                  errorMessage={errorMessageEdit}
                  requiredValidation={false}
                />
                <div className="flex gap-3 mt-10">
                  {!isLoadingPutEdit ? (
                    <input
                      type="submit"
                      value="Editar"
                      className="w-full bg-rose-400 hover:bg-rose-600 transition-colors ease-in hover:cursor-pointer p-2 rounded-md text-zinc-100"
                    />
                  ) : (
                    <button
                      type="button"
                      className="w-full bg-rose-400 cursor-default p-2 rounded-md text-zinc-100 flex justify-center items-center">
                      <div className="w-4 h-4 border-4 border-transparent border-t-zinc-100 animate-spin rounded-full">
                        {" "}
                      </div>
                    </button>
                  )}
                  <button
                    onClick={() => setShowModalEdit(false)}
                    disabled={isLoadingPutEdit}
                    className=" p-2 px-3 border-2 border-zinc-400 hover:bg-zinc-400 hover:disabled:bg-transparent rounded-md text-zinc-500 hover:text-zinc-100 hover:disabled:text-zinc-500 transition-colors ease-in">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableContent;
