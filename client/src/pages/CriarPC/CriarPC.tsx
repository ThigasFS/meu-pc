import { Link, Outlet } from "react-router-dom"
import PC from "../../interfaces/pc"
import { useState } from "react"
import { Button } from "@mui/material";

function CriarPC() {
    const [pcMontado, setPcMontado] = useState<Partial<PC>>({})
    console.log(pcMontado);

    function cancelarPc(){
        setPcMontado({})
    }
    
    return (
        <>
            <Link to='/'>
                <Button onClick={cancelarPc} sx={{background: '#52F2B8', color: 'black'}}>Cancelar Montagem</Button>
            </Link>
            <Outlet context={{pcMontado, setPcMontado}}/>
        </>
    )
}

export default CriarPC