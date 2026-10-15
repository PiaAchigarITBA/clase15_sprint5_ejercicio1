import { Link, NavLink, Outlet } from 'react-router'

// Ya está hecho: la cabecera se repite en todas las páginas y la ruta hija va en el Outlet.
function Layout() {
  return (
    <>
      <header className="cabecera">
        <Link to="/" className="logo">¿Quién es ese Pokémon?</Link>
        <nav className="nav">
          <NavLink to="/" end>Inicio</NavLink>
        </nav>
      </header>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
