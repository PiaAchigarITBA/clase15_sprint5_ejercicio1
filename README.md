# 🎮 Ejercicio 1 · ¿Quién es ese Pokémon?

⏱ **25 minutos** · 🛠 Vite + React · React Router + react-hook-form + yup · Node 22.22+

```bash
npm install
npm run dev     # → http://localhost:5173
```

## El juego

Como en el programa de TV: aparece la **silueta** de un Pokémon de Kanto (del 1 al 151) y tenés que escribir su nombre. Cada acierto seguido suma más puntos (🔥 racha). "Siguiente" trae otro Pokémon al azar, y la URL dice cuál es: `/jugar/25`.

Ya está hecho: las rutas (`App.jsx`), el layout, la página de inicio, el servicio `servicios/pokeapi.js` (con `obtenerPokemon(id)`, `idAlAzar()` y `normalizar()`) y todo el CSS. **Vos completás `src/paginas/Juego.jsx` y `src/esquemas/adivinanza.js`.**

## Pasos

**1 · Traer el Pokémon (`Juego.jsx`).**
- a. Leé el `id` de la URL con `useParams`.
- b. En un `useEffect`, pedí el Pokémon con `obtenerPokemon(id)` y manejá los tres estados (`cargando`, `error`, `pokemon`). Al empezar, poné `resultado` en `null`. ¿Qué va en el array de dependencias? Sumá la limpieza con `ignorar` de la clase 12.

**2 · El esquema (`esquemas/adivinanza.js`).** Un campo, `adivinanza`:

| Regla | Mensaje |
|---|---|
| sin espacios a los costados | — |
| obligatorio | `¡Decí un nombre!` |
| mínimo 3 caracteres | `Muy corto: ningún Pokémon de Kanto tiene menos de 3 letras` |
| solo letras (con tildes), espacios, `.`, `'` y `-` | `Solo letras: los Pokémon no tienen números en el nombre` |

Pista para la última: `matches(/^[a-záéíóúüñ .'-]+$/i, '…')`.

**3 · Conectar el formulario (`Juego.jsx`).** `resolver: yupResolver(esquemaAdivinanza)`, registrá el input como `adivinanza` y mostrá el error en un `<p className="error-campo">`.

**4 · ¿Acertó? (`adivinar`).** Compará `normalizar(datos.adivinanza)` con `normalizar(pokemon.nombre)` (así "Mr. Mime" = "mr-mime").
- Acierto → `resultado` = `'acierto'`, `puntos` + 10 + `racha` × 5, `racha` + 1.
- Fallo → `resultado` = `'fallo'`, `racha` = 0.

**5 · Siguiente (`siguiente`).** `reset()` del formulario y `navigate` a `/jugar/<otro id>` con `idAlAzar(id)`. ¿Hace falta llamar a `obtenerPokemon` acá?

## ✅ Listo cuando…

- Aparece una silueta, y al adivinar (o rendirte) se ve el Pokémon a color con su nombre.
- Enviar vacío, "ab" o "pika2" muestra el mensaje que corresponde.
- "Siguiente" cambia la URL y trae otro Pokémon… **y los puntos no se borran**. (¿Por qué no se borran, si cambiaste de página?)
- `/jugar/9999` muestra el error de la API, y `/jugar/asd` también.

## ➕ Plus

1. Que `/jugar` (sin número) te lleve a un Pokémon al azar. Pista: una ruta más en `App.jsx` con `<Navigate replace />`.
2. Un botón **💡 Pista** que muestre el tipo del Pokémon y cueste 5 puntos.

## 🧠 Para pensar

1. Si sacás `id` del array de dependencias, ¿qué pasa al tocar "Siguiente"?
2. ¿Por qué los puntos sobreviven al cambio de URL? ¿Qué pasaría si "Siguiente" fuera a `/` y después a `/jugar/7`?
3. ¿Por qué el `id` al azar se calcula en el click y no en el render?
