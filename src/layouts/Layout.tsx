
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <h1>UNO Online</h1>

        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/regles">Règles</Link>
          <Link to="/parties">Parties</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>UNO Online</p>
      </footer>
    </>
  );
}

export default Layout;