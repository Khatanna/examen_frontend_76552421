import { lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { LazyComponent } from "./components/LazyComponent";
import { MainLayout } from "./components/MainLayout";
import { DialogModalProvider } from "./pages/EncargadoPage/providers/DialogModalProvider";

const AutoresPage = lazy(() => import("./pages/AutoresPage/AutoresPage"));
const LibrosPage = lazy(() => import("./pages/LibrosPage/LibrosPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const EncargadoPage = lazy(() => import("./pages/EncargadoPage/EncargadoPage"));

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
          <Route
            element={
              <DialogModalProvider>
                <Outlet />
              </DialogModalProvider>
            }
          >
            <Route
              path="/encargado"
              element={<LazyComponent Component={EncargadoPage} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<div>Ruta inexitente</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
