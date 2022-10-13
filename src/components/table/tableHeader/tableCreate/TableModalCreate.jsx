import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import routesData from "../../../../routesData.json";
import tableContext from "../../tableContext";
import TableForm from "../../tableForm/TableForm";

const TableModalCreate = ({ closeModal, schema = [] }) => {
  const { id, setData: setTable } = useContext(tableContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    let formatData = {};
    Object.keys(data)
      .filter((itemName) => {
        if (data[itemName] == "") {
          return false;
        }

        return true;
      })
      .forEach((itemName) => {
        const itemSchema =
          schema[schema.map(({ name }) => name).indexOf(itemName)];

        if (itemSchema.type == "Number") {
          return (formatData[itemName] = Number(data[itemName]));
        }

        formatData[itemName] = data[itemName];
      });

    setIsLoading(true);
    axios
      .post(`${routesData.defaultLink}/${id}`, formatData)
      .then(({ data: { _id, ...rest } }) => {
        setTable(({ data:dataPrevTable, ...restPrevTable  }) => {
          const newTable = {
            ...restPrevTable,
            data: [
              {
                _id,
                ...rest,
              },
              ...dataPrevTable,
            ],
          };

          return newTable;
        });
        reset()
        closeModal();
      })
      .catch((err) => {
        if (err.response.status == 400) {
          let msgAlert = "";
          err.response.data
            .map(({ msg }) => msg)
            .forEach((e, i) => {
              msgAlert += `${e} ${i > 0 ? "\n" : ""}`;
            });

          setErrorMessage(msgAlert);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="z-10 absolute flex items-center justify-center inset-0 bg-black/60 backdrop-blur-sm ">
      <div className="absolute inset-x-80 rounded-lg p-3 bg-zinc-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between ">
          <TableForm
            schema={schema}
            register={register}
            errors={errors}
            errorMessage={errorMessage}
          />

          <div className="flex gap-3 mt-10">
            {!isLoading ? (
              <input
                type="submit"
                value="Crear"
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
              onClick={closeModal}
              className=" p-2 px-3 border-2 border-zinc-400 hover:bg-zinc-400 hover:disabled:bg-transparent rounded-md text-zinc-500 hover:text-zinc-100 hover:disabled:text-zinc-500 transition-colors ease-in"
              disabled={isLoading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableModalCreate;
