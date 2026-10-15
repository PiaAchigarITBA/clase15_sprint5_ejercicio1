import { Link } from 'react-router'

function NoEncontrada() {
  return (
    <section className="panel">
      <h1 className="titulo-tv">404</h1>
      <p>Un Pokémon salvaje se llevó esta página. 🏃‍♂️💨</p>
      <Link to="/" className="boton">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrada
