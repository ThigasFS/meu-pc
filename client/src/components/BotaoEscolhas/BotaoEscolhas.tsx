import { Button } from "@mui/material";

type Props = {
    prev?: boolean
}

function BotaoEscolhas({prev = false}: Props){
    return (
        <Button sx={{background: '#52F2B8', color: 'black'}}>{prev ? 'Anterior' : 'Próximo'}</Button>
    )
}

export default BotaoEscolhas