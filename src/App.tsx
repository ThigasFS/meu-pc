import Cabecalho from "./components/Cabecalho/Cabecalho"
import style from './App.module.css'
import Salvos from "./components/Salvos/Salvos"

function App() {
  return (
    <>
      <div className={style.bodyContainer}>
      <header>
        <Cabecalho />
      </header>
      <main>
        <Salvos />
      </main>
      </div>
    </>
  )
}

export default App
