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
import Recomendacao from './pages/Orientacao/Recomendacao'
import ResumoOrientacao from './pages/Orientacao/ResumoOrientacao'
import CriarOrientacao from './pages/Orientacao/CriarOrientacao'
import OrientacaoProviderLayout from './components/ProviderLayout/Orientacao'
import { Dataset, recommendComputers } from './recommendation/recomendacao'
import Questionario from './pages/Orientacao/Questionario'

function App() {

  useEffect(() => {
    initializePreBuilds();
  }, [])

  const testDataset: Dataset = {
  cpus: [
    {
      id: "cpu-1",
      name: "CPU A - 6 núcleos",
      price: 180,
      cores: 6,
      threads: 12,
      maxClockGHz: 4.5,
      cpuMark: 18000,
      singleThread: 3200,
      supportedMemoryTypes: ["DDR4"],
      integratedGraphics: true,
    },
    {
      id: "cpu-2",
      name: "CPU B - 8 núcleos",
      price: 280,
      cores: 8,
      threads: 16,
      maxClockGHz: 5.0,
      cpuMark: 28000,
      singleThread: 3500,
      supportedMemoryTypes: ["DDR5"],
      integratedGraphics: false,
    },
  ],

  gpus: [
    {
      id: "gpu-1",
      name: "GPU A - 8 GB",
      price: 250,
      vramGB: 8,
      baseClockMHz: 1500,
      boostClockMHz: 2400,
      gameFps: 90,
      onePercentLow: 65,
      blenderScore: 1800,
    },
    {
      id: "gpu-2",
      name: "GPU B - 12 GB",
      price: 400,
      vramGB: 12,
      baseClockMHz: 1800,
      boostClockMHz: 2600,
      gameFps: 130,
      onePercentLow: 95,
      blenderScore: 3000,
    },
  ],

  rams: [
    {
      id: "ram-1",
      name: "RAM A - 16 GB DDR4",
      price: 50,
      capacityGB: 16,
      frequencyMHz: 3200,
      latencyNs: 10,
      memoryType: "DDR4",
    },
    {
      id: "ram-2",
      name: "RAM B - 32 GB DDR5",
      price: 100,
      capacityGB: 32,
      frequencyMHz: 5600,
      latencyNs: 10,
      memoryType: "DDR5",
    },
  ],

  storages: [
    {
      id: "storage-1",
      name: "SSD SATA - 512 GB",
      price: 45,
      capacityGB: 512,
      technology: "ssd-sata",
    },
    {
      id: "storage-2",
      name: "SSD NVMe - 2 TB",
      price: 120,
      capacityGB: 2000,
      technology: "ssd-nvme",
    },
  ],
};


const tests = [
  {
    name: "Jogos - Desempenho",
    purpose: "jogos",
    profile: "desempenho",
  },
  {
    name: "Profissional - Desempenho",
    purpose: "profissional",
    profile: "desempenho",
  },
  {
    name: "Estudos - Custo-benefício",
    purpose: "estudos",
    profile: "custo-beneficio",
  },
  {
    name: "Casual - Híbrido",
    purpose: "casual",
    profile: "hibrido",
  },
] as const;

for (const test of tests) {
  const recommendations = recommendComputers(
    testDataset,
    test.purpose,
    test.profile,
  );

  console.log(`\n${test.name}`);

  recommendations.forEach((pc, index) => {
    console.log({
      position: index + 1,
      cpu: pc.cpu.name,
      gpu: pc.gpu?.name ?? "Vídeo integrado",
      ram: pc.ram.name,
      storage: pc.storage.name,
      price: pc.price,
      score: pc.score.toFixed(2),
    });
  });
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/orientacao' element={<OrientacaoProviderLayout />}>
          <Route index element={<CriarOrientacao />} />
          <Route path=':id' element={<OrientacaoLayout />}>
            <Route path='intencao' element={<Intencao />} />
            <Route path="questionario" element={<Questionario />} />
            <Route path="recomendacao" element={<Recomendacao />} />
            <Route path="licao" element={<Licao />} />
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
