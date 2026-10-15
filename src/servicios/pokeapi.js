// ════════════════════════════════════════════════════════════════════════════
// SERVICIO DE LA POKEAPI (ya está hecho: no hace falta tocarlo)
// ════════════════════════════════════════════════════════════════════════════
const URL_POKEAPI = 'https://pokeapi.co/api/v2'
const TOTAL_KANTO = 151

// Un id al azar entre 1 y 151, distinto del actual (para que "Siguiente" siempre cambie).
export function idAlAzar(distintoDe) {
  let id
  do {
    id = Math.floor(Math.random() * TOTAL_KANTO) + 1
  } while (String(id) === String(distintoDe))
  return id
}

// GET /pokemon/:id → { id, nombre, imagen, tipos } (adaptado a la forma de nuestra app)
export async function obtenerPokemon(id) {
  const respuesta = await fetch(`${URL_POKEAPI}/pokemon/${id}`)

  if (!respuesta.ok) {
    throw new Error(
      respuesta.status === 404
        ? `No existe ningún Pokémon con el número ${id}`
        : `La PokeAPI respondió con error (${respuesta.status})`,
    )
  }

  const p = await respuesta.json()
  return {
    id: p.id,
    nombre: p.name, // 'mr-mime', 'pikachu'…
    imagen: p.sprites.other['official-artwork'].front_default,
    tipos: p.types.map((t) => t.type.name),
  }
}

// 'Mr. Mime' → 'mrmime' · 'mr-mime' → 'mrmime' · 'Pikachú' → 'pikachu'
// Saca mayúsculas, tildes, espacios y signos, para comparar "lo que escribió" con el nombre real.
export function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z]/g, '')
}
