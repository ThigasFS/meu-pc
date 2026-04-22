import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

function SobreNos(){
    return (
        <>
            <Link to={'/'}><Typography sx={{color: 'white'}}>Voltar</Typography></Link>
            <Typography sx={{textAlign: 'center', color: 'white', fontWeight: 600, fontSize: 24}}>Sobre nós</Typography>
        </>
    )
}

export default SobreNos