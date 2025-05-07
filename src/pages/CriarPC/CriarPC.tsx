import { Link, Outlet } from "react-router-dom"
import PC from "../../interfaces/pc"

function CriarPC() {
    const PC: PC = {

    }
    return (
        <>
            <Link to='/'>
                <div>Voltar</div>
            </Link>
            <Outlet />
        </>
    )
}

export default CriarPC