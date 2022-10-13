import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-3">
      <h1 className="text-rose-500 font-bold text-4xl text-center">
        {" "}
        Dinamic{" "}
      </h1>
      <p className="max-w-sm text-center">
        {" "}
        crea un <span className="text-rose-500"> API </span> y una{" "}
        <span className="text-rose-500"> interfaz </span> con sus respectivas
        validaciones en el lado del servidor y cliente de tu modelo de MongoDB
        facilmente ✨{" "}
      </p>

      <div className="p-5 bg-zinc-200 flex flex-col gap-5 items-center rounded-md">
        {[
          {
            categoryName: "Servidor",
            repositoryLink: "https://github.com/DiegoCadavid/dinamic-server",
            textContent:
              "Crear el API Rest ( CRUD ) con sus validaciones es tan sencillo comousar el metodo de una clase.",
            imageUrlContent:
              "https://res.cloudinary.com/dd4p0ksdu/image/upload/v1665678447/file_upload_app/soage9mtavab4negylxe.png",
          },
          {
            categoryName: "Cliente",
            repositoryLink: "https://github.com/DiegoCadavid/dinamic-client",
            textContent:
              "Si bien puedes emplear la API como quieras, Dinamic te ofrece una interfaz para probar tu API. (Puedes ver algunos ejemplos en esta pagina)",
            imageUrlContent:
              "https://res.cloudinary.com/dd4p0ksdu/image/upload/v1665678775/file_upload_app/bqte4h3f1rp9m9qeb2by.png",
          },
        ].map((doc) => {
          return (
            <div key={doc.categoryName} className="w-full flex flex-col gap-1 items-center">
              <div className="mb-2 text-center">
                <h3 className="text-xl text-rose-500 font-medium">{ doc.categoryName } </h3>
                <a
                  href={ doc.repositoryLink }
                  className="text-rose-500 underline"
                  target='_blank'>
                  Repositorio Github
                </a>
              </div>
              <p className="max-w-sm text-center">
                { doc.textContent }
              </p>
              <img
                className="w-[500px] rounded-md"
                src={ doc.imageUrlContent }
                alt="Captura"
              />
            </div>
          );
        })}
      </div>
      <p className="text-zinc-500 text-sm">Creado por <a href="https://diegocadavid.vercel.app/" className="underline text-rose-500" target='_blank' > DiegoCadavid </a> </p>
    </div>
  );
};

export default Home;
