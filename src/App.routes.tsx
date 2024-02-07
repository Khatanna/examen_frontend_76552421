import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyComponent } from "./components/LazyComponent";
import { MainLayout } from "./components/MainLayout";

const AutoresPage = lazy(() => import("./pages/AutoresPage/AutoresPage"));
const LibrosPage = lazy(() => import("./pages/LibrosPage/LibrosPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={MainLayout}>
          <Route index element={<LazyComponent Component={HomePage} />}></Route>
          <Route
            path="/autores"
            element={<LazyComponent Component={AutoresPage} />}
          />
          <Route
            path="/libros"
            element={<LazyComponent Component={LibrosPage} />}
          />
        </Route>
        <Route path="*" element={<div>Ruta inexitente</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
