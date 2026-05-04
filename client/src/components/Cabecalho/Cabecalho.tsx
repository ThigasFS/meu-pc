import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function Cabecalho() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 3,
                py: 2
            }}
        >
            <Box>
                <Typography
                    sx={{
                        color: "#0FFCBE",
                        fontWeight: 700,
                        fontSize: 36
                    }}
                >
                    Meu PC
                </Typography>

                <Typography
                    sx={{
                        color: "rgba(255,255,255,0.75)",
                        mt: 1
                    }}
                >
                    Monte, compare e salve suas configurações
                </Typography>
            </Box>

            <Link to="/sobre-nos">
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ color: "white" }}
                >
                    Sobre nós
                </Button>
            </Link>
        </Box>
    )
}

export default Cabecalho