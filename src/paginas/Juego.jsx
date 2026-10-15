import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { esquemaAdivinanza } from '../esquemas/adivinanza.js'
import { idAlAzar, normalizar, obtenerPokemon } from '../servicios/pokeapi.js'

function Juego() {
  // 🚧 PASO 1 · a. Leé el número del Pokémon de la URL (/jugar/25 → '25')
  const id = 1 // ← reemplazá esto
  const navigate = useNavigate()

  // Los tres estados de siempre para pedir datos (clase 12)
  const [pokemon, setPokemon] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Estado del juego
  const [resultado, setResultado] = useState(null) // null | 'acierto' | 'fallo' | 'rendido'
  const [puntos, setPuntos] = useState(0)
  const [racha, setRacha] = useState(0)

  // 🚧 PASO 1 · b. Pedí el Pokémon con obtenerPokemon(id) en un useEffect:
  //   - al empezar: cargando en true, error en null y resultado en null
  //   - try / catch / finally con los tres estados
  //   - ¿qué va en el array de dependencias? (pista: la URL cambia, el componente NO se desmonta)
  //   - (bien de la clase 12) la limpieza con "ignorar", para que una respuesta vieja no pise a la nueva
  useEffect(() => {
  }, [])

  // 🚧 PASO 3 · Conectá el esquema: resolver con yupResolver(esquemaAdivinanza)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { adivinanza: '' },
  })

  // 🚧 PASO 4 · Solo se llama si el esquema dio OK.
  //   Compará normalizar(datos.adivinanza) con normalizar(pokemon.nombre):
  //   - acierto → resultado 'acierto', puntos + 10 + racha * 5, racha + 1
  //   - fallo   → resultado 'fallo', racha a 0
  function adivinar(datos) {
    console.log('Adivinó:', datos)
  }

  function meRindo() {
    setResultado('rendido')
    setRacha(0)
  }

  // 🚧 PASO 5 · Siguiente: vaciá el formulario (reset) y navegá a /jugar/<otro id>.
  //   Pista: idAlAzar(id) devuelve un número al azar distinto del actual.
  //   ¿Hace falta llamar a obtenerPokemon acá? (No: pensá qué hace el useEffect cuando cambia la URL.)
  function siguiente() {
  }

  if (cargando) return <p className="estado">🔍 Buscando un Pokémon salvaje…</p>

  if (error) {
    return (
      <section className="panel">
        <p className="estado error">😵 {error}</p>
        <button className="boton" onClick={siguiente}>Probar con otro</button>
      </section>
    )
  }

  const termino = resultado !== null

  return (
    <section className="panel">
      <div className="marcador">
        <span className="chip">⭐ {puntos} puntos</span>
        <span className="chip">🔥 Racha: {racha}</span>
        <span className="chip">#{String(pokemon.id).padStart(3, '0')}</span>
      </div>

      <h1 className="titulo-tv">¿QUIÉN ES ESE POKÉMON?</h1>

      <img
        className={termino ? 'imagen' : 'imagen silueta'}
        src={pokemon.imagen}
        alt={termino ? pokemon.nombre : 'Silueta de un Pokémon'}
        width="240"
        height="240"
      />

      {!termino && (
        <form className="adivinanza" onSubmit={handleSubmit(adivinar)} noValidate>
          {/* 🚧 PASO 3 · Registrá este input como "adivinanza" */}
          <input placeholder="Escribí el nombre…" autoComplete="off" autoFocus />
          <button className="boton">¡Es…!</button>
          <button type="button" className="boton secundario" onClick={meRindo}>Me rindo</button>
        </form>
      )}
      {/* 🚧 PASO 3 · Mostrá acá el error de "adivinanza" en un <p className="error-campo"> */}

      {termino && (
        <>
          <p className={`resultado ${resultado}`}>
            {resultado === 'acierto' && '¡Correcto! 🎉 '}
            {resultado === 'fallo' && '¡Nooo! Era… '}
            {resultado === 'rendido' && 'Era… '}
            <span className="nombre-pokemon">{pokemon.nombre}</span>
          </p>
          <p className="tipos">Tipo: {pokemon.tipos.join(' / ')}</p>
          <button className="boton grande" onClick={siguiente}>Siguiente →</button>
        </>
      )}
    </section>
  )
}

export default Juego
