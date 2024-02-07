"use client";
import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";

export type HomePageProps = {
  // types...
};

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div className="flex gap-2 h-screen items-center justify-center">
      <Link to={"/libros"}>
        <Button
          label="Soy cliente"
          severity="danger"
          icon="pi pi-user"
        ></Button>
      </Link>
      <Link to={"/autores"}>
        <Button
          label="Soy encargado"
          severity="info"
          icon="pi pi-briefcase"
        ></Button>
      </Link>
    </div>
  );
};

export default HomePage;
