import React from 'react'
import {Routes, Route} from "react-router-dom"
import MainLayout from './layout/MainLayout'
import Anuarios from './pages/Anuarios'
import Plantilla from './pages/Plantilla'
import Configuracion from './pages/Configuracion'
import Home from './pages/Home'
import Indicadores from './pages/Indicadores'
import EditorIndicadores from './pages/EditorIndicadores'

function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}>
        </Route>
        <Route path='/indicadores' element={<Indicadores/>}/>
           <Route path='/anuarios' element={<Anuarios/>}/>
            <Route path='/plantilla' element={<Plantilla/>}/>
            <Route path='/anuarios' element={<Configuracion/>}/>
            <Route path='/indicadores/editar' element={<EditorIndicadores/>}/>
    </Routes>
    </>
  )
}

export default App