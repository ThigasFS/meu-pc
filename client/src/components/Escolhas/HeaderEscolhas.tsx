import { Box, Typography, Button } from "@mui/material"

type InfoExtra = {
    label: string
    valor: string
}

type HeaderEscolhasProps = {
    titulo: string
    infosExtras?: InfoExtra[]
    valorTotal?: number
    primeiraEtapa?: boolean
    onAnterior: () => void
    onCancelar: () => void
    acaoDireita?: React.ReactNode
}

function HeaderEscolhas({
    titulo,
    infosExtras = [],
    valorTotal,
    primeiraEtapa = false,
    onAnterior,
    onCancelar,
    acaoDireita
}: HeaderEscolhasProps) {
    return (
        <Box
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(20,20,20,0.85)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                px: 3,
                py: 2,
                mb: 3
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: 24, md: 32 },
                        color: "white"
                    }}
                >
                    {titulo}
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="outlined"
                        disabled={primeiraEtapa}
                        onClick={onAnterior}
                        sx={{
                            background: "#52F2B8",
                            color: "black"
                        }}
                    >
                        Anterior
                    </Button>

                    {acaoDireita}

                    <Button
                        onClick={onCancelar}
                        sx={{
                            background: "#52F2B8",
                            color: "black"
                        }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    flexWrap: "wrap",
                    gap: 2
                }}
            >
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {infosExtras.map((info) => (
                        <Typography
                            key={info.label}
                            sx={{
                                color: "white",
                                opacity: 0.9
                            }}
                        >
                            {info.label}:{" "}
                            <strong>{info.valor}</strong>
                        </Typography>
                    ))}
                </Box>

                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 600
                    }}
                >
                    Total:{" "}
                    {valorTotal?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }) ?? "R$ 0,00"}
                </Typography>
            </Box>
        </Box>
    )
}

export default HeaderEscolhas