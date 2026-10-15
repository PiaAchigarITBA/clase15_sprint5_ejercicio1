import { useNavigate } from 'react-router'
import { idAlAzar } from '../servicios/pokeapi.js'

// Ya está hecha.
function Inicio() {
  const navigate = useNavigate()

  return (
    <section className="panel">
      <h1 className="titulo-tv">¿QUIÉN ES ESE POKÉMON?</h1>
      <p>Aparece una silueta. Escribí el nombre. Cada acierto seguido suma más puntos. 🔥</p>
      {/* El id al azar se calcula en el CLICK (un evento), no en el render. */}
      <button className="boton grande" onClick={() => navigate(`/jugar/${idAlAzar()}`)}>
        ¡Jugar!
      </button>
    </section>
  )
}

export default Inicio
