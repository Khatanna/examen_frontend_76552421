import React from "react";

import { LibroSection } from "./components/LibroSection";

const LibrosPage: React.FC = () => {
  return (
    <div className="">
      <LibroSection
        title={
          <div className="flex items-center gap-2">
            <i
              className="pi pi-star text-yellow-500"
              style={{
                fontSize: "1.4rem",
              }}
            ></i>
            <div>Mas destacadados</div>
          </div>
        }
      />
      <LibroSection
        title={
          <div className="flex items-center gap-2">
            <i
              className="pi pi-book text-red-500"
              style={{
                fontSize: "1.4rem",
              }}
            ></i>
            <div>Nuevos</div>
          </div>
        }
      />
      <LibroSection
        title={
          <div className="flex items-center gap-2">
            <i
              className="pi pi-bookmark text-green-500"
              style={{
                fontSize: "1.4rem",
              }}
            ></i>
            <div>Recomendados</div>
          </div>
        }
      />
    </div>
  );
};

export default LibrosPage;
