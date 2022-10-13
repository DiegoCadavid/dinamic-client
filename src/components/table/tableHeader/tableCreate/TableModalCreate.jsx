import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import routesData from "../../../../routesData.json";

const TableModalCreate = ({ closeModal, schema = [], id = "", setTable }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        console.log(data);
        setTable((prevTable) => {
          const newTable = {
            page: prevTable.page,
            pagesCount: prevTable.pagesCount,
            perPage: prevTable.perPage,
            data: [ {
              _id,
              ...rest
            }, ...prevTable.data] 
          };

          return newTable;
        });
        setIsLoading(false);
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
          className="h-full flex flex-col justify-between "
        >
          <div className="flex flex-col gap-3">
            {errorMessage != "" && (
              <div>
                <p className="text-center text-red-700 font-bold">ERROR</p>
                <p className="text-center text-red-700"> {errorMessage} </p>
              </div>
            )}
            {schema.map(({ name, type, validators = [] }) => {
              // STRING - NUMBER - BOOL
              // Creamos las validaciones de los inputs
              const options = {};

              validators.forEach((v) => {
                if (v.name == "required") {
                  options.required = {
                    value: true,
                    message: `${name} es obligatorio`,
                  };
                }

                if (v.name == "min") {
                  options.min = {
                    value: v.value,
                    message: `El valor minimo de ${name} es de ${v.value}`,
                  };
                }

                if (v.name == "max") {
                  options.max = {
                    value: v.value,
                    message: `El valor maximo de ${name} es de ${v.value}`,
                  };
                }

                if (v.name == "regexp") {
                  const vRegex = new RegExp(v.value.source, v.value.flags);

                  options.pattern = {
                    value: vRegex,
                    message: "Datos invalidos",
                  };
                }
              });

              // Renderizamos elementos

              if (type == "String") {
                return (
                  <div key={name} className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder={name}
                      className={`p-3 w-full focus-visible:outline-none rounded-md ${
                        errors[name] && "ring-2 ring-red-700"
                      }`}
                      {...register(name, options)}
                    />
                    {errors[name] && (
                      <p className="pl-3 text-sm text-red-700">
                        {" "}
                        {errors[name].message}{" "}
                      </p>
                    )}
                  </div>
                );
              }

              if (type == "Number") {
                return (
                  <div key={name} className="flex flex-col gap-2">
                    <input
                      type="number"
                      placeholder={name}
                      className={`p-3 w-full focus-visible:outline-none rounded-md ${
                        errors[name] && "ring-2 ring-red-700"
                      }`}
                      {...register(name, options)}
                    />
                    {errors[name] && (
                      <p className="pl-3 text-sm text-red-700">
                        {" "}
                        {errors[name].message}{" "}
                      </p>
                    )}
                  </div>
                );
              }

              if (type == "Boolean") {
                return (
                  <div key={name} className="flex flex-col gap-2 rounded-md">
                    <div className="flex justify-start gap-2 p-3  bg-white">
                      <p> {name} </p>
                      <input
                        type="checkbox"
                        placeholder={name}
                        className={`focus-visible:outline-none rounded-md ${
                          errors[name] && "ring-2 ring-red-700"
                        }`}
                        {...register(name, options)}
                      />
                    </div>
                    {errors[name] && (
                      <p className="pl-3 text-sm text-red-700">
                        {" "}
                        {errors[name].message}{" "}
                      </p>
                    )}
                  </div>
                );
              }

              return (
                <div className="text-zinc-400">
                  <p>
                    {" "}
                    Tipo de dato {`<${type}>`} no soportado ( {name} ){" "}
                  </p>
                </div>
              );
            })}
          </div>

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
                className="w-full bg-rose-400 cursor-default p-2 rounded-md text-zinc-100 flex justify-center items-center"
              >
                <div className="w-4 h-4 border-4 border-transparent border-t-zinc-100 animate-spin rounded-full">
                  {" "}
                </div>
              </button>
            )}

            <button
              onClick={closeModal}
              className=" p-2 px-3 border-2 border-zinc-400 hover:bg-zinc-400 hover:disabled:bg-transparent rounded-md text-zinc-500 hover:text-zinc-100 hover:disabled:text-zinc-500 transition-colors ease-in"
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableModalCreate;
