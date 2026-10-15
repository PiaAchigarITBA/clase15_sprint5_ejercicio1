import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Inicio from './paginas/Inicio.jsx'
import Juego from './paginas/Juego.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'

// Ya está hecho. (El ➕ Plus 1 se hace acá.)
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="jugar/:id" element={<Juego />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
