import { useEffect, useState } from "react"

import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material"

import PcCard from "../../components/PcCard/PcCard"

import PC from "../../interfaces/pc"

import {
    getPreBuilds,
    removePreBuild
} from "../../services/PreBuildStorage"
import { ArrowBack } from "@mui/icons-material"
import { Link } from "react-router-dom"

function PreBuildPage() {

    const [pcs, setPcs] = useState<PC[]>([])

    useEffect(() => {
        setPcs(getPreBuilds())
    }, [])

    function handleRemove(id: number) {

        removePreBuild(id)

        setPcs(getPreBuilds())
    }

    const grouped = pcs.reduce((acc, pc) => {

    const categoria = pc.categoria ?? 'Sem Categoria'

        if (!acc[categoria]) {
            acc[categoria] = []
        }

        acc[categoria].push(pc)

        return acc

    }, {} as Record<string, PC[]>)

    return (
        <Box sx={{p: 4}}>
            <Button
                                component={Link}
                                to="/"
                                startIcon={<ArrowBack />}
                                variant="outlined"
                                sx={{
                                    color: "white",
                                    borderColor: "rgba(255,255,255,0.2)",
        
                                    "&:hover": {
                                        borderColor: "white",
                                        background:
                                            "rgba(255,255,255,0.05)"
                                    }
                                }}
                            >
                                Voltar
                            </Button>

            <Typography
                variant="h4"
                sx={{fontWeight: 700, mb: 4}}
            >
                Pré-Montagens
            </Typography>

                {
    Object.entries(grouped).map(
        ([categoria, computadores]) => (

            <Box key={categoria} sx={{mb: 6}}>

                <Typography
                    variant="h5"
                    sx={{
                        color: "white",
                        fontWeight: 700,
                        mb: 3
                    }}
                >
                    {categoria}
                </Typography>

                <Stack
                    direction="row"
                    spacing={3}
                    sx={{
                        flexWrap: "wrap"
                    }}
                >
                    {
                        computadores.map(pc => (
                            <PcCard
                                key={pc.id}
                                id={pc.id}
                                nome={pc.nome}
                                processador={pc.processador}
                                preco={pc.valorTotal}
                                onRemove={handleRemove}
                            />
                        ))
                    }
                </Stack>

            </Box>
        )
    )
}

        </Box>
    )
}

export default PreBuildPage