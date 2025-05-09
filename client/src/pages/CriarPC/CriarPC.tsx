import { Link, Outlet } from "react-router-dom"
import PC from "../../interfaces/pc"
import { useState } from "react"

function CriarPC() {
    const [pcMontado, setPcMontado] = useState<Partial<PC>>({})
    console.log(pcMontado);

    function cancelarPc(){
        setPcMontado({})
    }
    
    return (
        <>
            <Link to='/'>
                <div onClick={cancelarPc}>Cancelar Montagem</div>
            </Link>
            <Outlet context={{pcMontado, setPcMontado}}/>
        </>
    )
}

export default CriarPC