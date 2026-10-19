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
import SobreNos from './pages/About'
import SelecaoCriacao from './pages/Criacao/Criacao'
import { useEffect } from 'react'
import { initializePreBuilds } from './services/PreBuildStorage'
import PreBuildPage from './pages/PreMontagem/PreMontagem'
import Intencao from './pages/Orientacao/Intencao'
import OrientacaoLayout from './components/Orientacao/Layout'
import Licao from './pages/Orientacao/Licao'
import Quiz from './pages/Orientacao/Quiz'
import ResultadoQuiz from './pages/Orientacao/ResultadoQuiz'
import Recomendacao from './pages/Orientacao/Recomendacao'
import ResumoOrientacao from './pages/Orientacao/ResumoOrientacao'
import CriarOrientacao from './pages/Orientacao/CriarOrientacao'
import OrientacaoProviderLayout from './components/ProviderLayout/Orientacao'

function App() {

  useEffect(() => {
    initializePreBuilds();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/orientacao' element={<OrientacaoProviderLayout />}>
          <Route index element={<CriarOrientacao />} />
          <Route path=':id' element={<OrientacaoLayout />}>
            <Route path='intencao' element={<Intencao />} />
            <Route path="licao" element={<Licao />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="quiz/resultado" element={<ResultadoQuiz />} />
            <Route path="recomendacao" element={<Recomendacao />} />
            <Route index element={<ResumoOrientacao />} />
          </Route>
        </Route>
        <Route path='/criacao' element={<SelecaoCriacao />} />
        <Route path='/criar-novo-pc' element={<CriarPC />}>
          <Route path='processador' element={<EscolherProcessador />} />
          <Route path='placamae' element={<EscolherPlacaMae />} />
          <Route path='placavideo' element={<EscolherPlacaVideo />} />
          <Route path='memoriaram' element={<EscolherMemoriaRAM />} />
          <Route path='armazenamento' element={<EscolherArmazenamento />} />
          <Route path='fonte' element={<EscolherFonte />} />
          <Route path='gabinete' element={<EscolherGabinete />} />
          <Route path='finalizacao' element={<Finalizacao />} />
        </Route>
        <Route path='/sobre-nos' element={<SobreNos />}/>
        <Route path='/pre-montagem' element={<PreBuildPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
