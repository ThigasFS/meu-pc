import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import CriarPC from './pages/CriarPC/CriarPC'
import EscolherProcessador from './components/Escolhas/EscolherProcessador'
import EscolherPlacaMae from './components/Escolhas/EscolherPlacaMae'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/criar-novo-pc' element={<CriarPC />}>
          <Route path='placamae' element={<EscolherPlacaMae />} />
          <Route path='processador' element={<EscolherProcessador />} />
          <Route path='placadevideo' element={<EscolherProcessador />} />
          <Route path='armazenamento' element={<EscolherProcessador />} />
          <Route path='memoriaram' element={<EscolherProcessador />} />
          <Route path='fonte' element={<EscolherProcessador />} />
          <Route path='gabinete' element={<EscolherProcessador />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
