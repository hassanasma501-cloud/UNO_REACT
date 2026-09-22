
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Games from "./pages/Games";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/regles"
            element={<Rules />}
          />

          <Route
            path="/parties"
            element={<Games />}
          />

          <Route
            path="/parties/:id"
            element={<Game />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;