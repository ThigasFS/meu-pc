import { Box, Container, createTheme, Stack, ThemeProvider } from "@mui/material"
import Cabecalho from "../../components/Cabecalho/Cabecalho"
import Salvos from "../../components/Salvos/Salvos"

const theme = createTheme({
    palette: {
        primary: {
            main: '#0FFCBE'
        }
    }
})

function Home() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(180deg, #111 0%, #1a1a1a 100%)",
                    py: 4
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={5}>
                        <Cabecalho />
                        <Salvos />
                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Home