import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AutoresPage } from "./pages/AutoresPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/autores">
          <Route index Component={AutoresPage} />
        </Route>
        <Route path="*" element={<div>Ruta inexitente</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
