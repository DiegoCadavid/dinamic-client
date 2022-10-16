import React, { useState } from "react";

const TableForm = ({
  schema = [],
  register,
  errors,
  errorMessage = "",
  requiredValidation = true,
}) => {
  return (
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
          if (requiredValidation) {
            if (v.name == "required") {
              options.required = {
                value: true,
                message: `${name} es obligatorio`,
              };
            }
          }

          if (v.name == "minlength") {
            options.minLength = {
              value: v.value,
              message: `${name} debe tener mas letras que ${v.value}`,
            };
          }

          if (v.name == "maxlength") {
            options.maxLength = {
              value: v.value,
              message: `${name} debe tener menos letras que ${v.value}`,
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
  );
};

export default TableForm;
