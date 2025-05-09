import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import CriarPC from './pages/CriarPC/CriarPC'
import EscolherProcessador from './components/Escolhas/EscolherProcessador'
import EscolherPlacaMae from './components/Escolhas/EscolherPlacaMae'
import EscolherPlacaVideo from './components/Escolhas/EscolherPlacaVideo'
import EscolherMemoriaRAM from './components/Escolhas/EscolherMemoriaRam'
import EscolherArmazenamento from './components/Escolhas/EscolherArmazenamento'
import EscolherFonte from './components/Escolhas/EscolherFonte'
import EscolherGabinete from './components/Escolhas/EscolherGabinete'
import Finalizacao from './components/Finalizacao/Finalizacao'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/criar-novo-pc' element={<CriarPC />}>
          <Route path='placamae' element={<EscolherPlacaMae />} />
          <Route path='processador' element={<EscolherProcessador />} />
          <Route path='placavideo' element={<EscolherPlacaVideo />} />
          <Route path='memoriaram' element={<EscolherMemoriaRAM />} />
          <Route path='armazenamento' element={<EscolherArmazenamento />} />
          <Route path='fonte' element={<EscolherFonte />} />
          <Route path='gabinete' element={<EscolherGabinete />} />
          <Route path='finalizacao' element={<Finalizacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
