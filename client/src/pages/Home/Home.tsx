import Cabecalho from "../../components/Cabecalho/Cabecalho"
import Salvos from "../../components/Salvos/Salvos"
import style from './Home.module.css'

function Home() {
    return (
        <div className={style.bodyContainer}>
            <header>
                <Cabecalho />
            </header>
            <main>
                <Salvos />
            </main>
        </div>
    )
}

export default Home