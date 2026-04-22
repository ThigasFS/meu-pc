import { Box, Stack } from "@mui/material"
import Cabecalho from "../../components/Cabecalho/Cabecalho"
import Salvos from "../../components/Salvos/Salvos"
import style from './Home.module.css'

function Home() {
    return (
        <Box className={style.bodyContainer}>
            <Stack>
                <Cabecalho />
            </Stack>
            <main>
                <Salvos />
            </main>
        </Box>
    )
}

export default Home