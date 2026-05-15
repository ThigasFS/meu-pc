import {
    Box,
    Card,
    CardContent,
    Chip,
    Fade,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material"

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded"

import logoAMD from '../../assets/amd.png'
import logoIntel from '../../assets/intel.png'

import { Processador } from '../../interfaces/componente'

interface Props {
    id: number
    processador: Processador
    nome: string
    onRemove: (id: number) => void
    preco: number
}

function PcCard({
    id,
    processador,
    nome,
    onRemove,
    preco
}: Props) {

    function removerPc(
        e: React.MouseEvent<HTMLElement>
    ) {

        e.preventDefault()

        onRemove(id)
    }

    function logoProcessador() {

        if (processador.marca === 'Intel') {
            return logoIntel
        }

        if (processador.marca === 'AMD') {
            return logoAMD
        }

        return ""
    }

    function corMarca() {

        if (processador.marca === 'Intel') {
            return "#1976d2"
        }

        if (processador.marca === 'AMD') {
            return "#ff5722"
        }

        return "#7b7b7b"
    }

    return (
        <Fade in timeout={350}>
            <Card
                elevation={0}
                sx={{
                    width: 320,
                    borderRadius: 5,
                    position: 'relative',

                    background:
                        'linear-gradient(145deg, rgba(20,20,20,0.96), rgba(34,34,34,0.96))',

                    border:
                        '1px solid rgba(255,255,255,0.08)',

                    backdropFilter: 'blur(12px)',

                    transition: '0.25s ease',

                    overflow: 'hidden',

                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow:
                            '0 12px 30px rgba(0,0,0,0.35)',
                        border:
                            '1px solid rgba(255,255,255,0.16)'
                    }
                }}
            >

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 5,
                        background: corMarca()
                    }}
                />

                <Tooltip title="Remover computador">
                    <IconButton
                        onClick={removerPc}
                        sx={{
                            position: 'absolute',
                            right: 12,
                            top: 12,
                            color: '#d5d5d5',

                            '&:hover': {
                                background:
                                    'rgba(255,255,255,0.08)',
                                color: '#ff5252'
                            }
                        }}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                </Tooltip>

                <CardContent
                    sx={{
                        p: 3
                    }}
                >

                    <Stack
                        spacing={2}
                        sx={{ alignItems: "center" }}
                    >

                        <Box
                            sx={{
                                width: 120,
                                height: 90,

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                background:
                                    'rgba(255,255,255,0.04)',

                                border:
                                    '1px solid rgba(255,255,255,0.08)',

                                borderRadius: 4,

                                p: 2
                            }}
                        >
                            <Box
                                component="img"
                                src={logoProcessador()}
                                alt={processador.marca}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>

                        <Box sx={{ textAlign: "center" }}>

                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    lineHeight: 1.2
                                }}
                            >
                                {nome}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color:
                                        'rgba(255,255,255,0.65)',
                                    mt: 1
                                }}
                            >
                                {processador.nome}
                            </Typography>
                        </Box>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: "wrap", justifyContent: "center" }}
                        >

                            <Chip
                                icon={
                                    <MemoryRoundedIcon />
                                }
                                label={
                                    processador.socket
                                }
                                sx={{
                                    color: 'white',
                                    background:
                                        'rgba(255,255,255,0.08)'
                                }}
                            />

                            <Chip
                                label={
                                    processador.marca
                                }
                                sx={{
                                    color: 'white',
                                    background:
                                        corMarca(),
                                    fontWeight: 600
                                }}
                            />

                            <Chip
                                label={`${processador.tdp}W`}
                                sx={{
                                    color: 'white',
                                    background:
                                        'rgba(255,255,255,0.08)'
                                }}
                            />
                        </Stack>

                        <Box
                            sx={{
                                width: '100%',
                                mt: 1,
                                p: 2,
                                borderRadius: 3,

                                background:
                                    'rgba(255,255,255,0.05)',

                                border:
                                    '1px solid rgba(255,255,255,0.06)'
                            }}
                        >

                            <Typography
                                variant="body2"
                                sx={{
                                    color:
                                        'rgba(255,255,255,0.65)',
                                    mb: 0.5
                                }}
                            >
                                Valor total
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'white',
                                    fontWeight: 800
                                }}
                            >
                                {
                                    preco.toLocaleString(
                                        'pt-BR',
                                        {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }
                                    )
                                }
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Fade>
    )
}

export default PcCard