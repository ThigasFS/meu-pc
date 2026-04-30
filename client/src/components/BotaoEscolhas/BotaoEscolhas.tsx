import { Button } from "@mui/material";

type Props = {
    last?: boolean
}

function BotaoEscolhas({last = false}: Props){
    return (
        <Button sx={{background: '#52F2B8', color: 'black'}}>{last ? 'Finalizar' : 'Próximo'}</Button>
    )
}

export default BotaoEscolhas