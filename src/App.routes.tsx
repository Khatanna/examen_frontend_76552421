import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { SkeletonPage } from "./components/SkeletonPage";
const AutoresPage = lazy(() => import("./pages/AutoresPage/AutoresPage"));
const LibrosPage = lazy(() => import("./pages/LibrosPage/LibrosPage"));

const LazyComponent = ({
  Component,
}: {
  Component: React.ComponentType<NonNullable<unknown>>;
}) => {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <Component />
    </Suspense>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={MainLayout}>
          <Route index element={<div>Home</div>}></Route>
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
