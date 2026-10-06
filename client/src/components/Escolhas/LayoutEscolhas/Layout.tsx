import { ReactNode } from 'react'
import { Box, Grid } from '@mui/material'
import HeaderEscolhas from './HeaderEscolhas'

interface InfoExtra {
    label: string
    valor: string
}

interface Props {
    titulo: string
    valorTotal: number | undefined
    onAnterior: () => void
    onCancelar: () => void
    acaoDireita?: ReactNode
    infosExtras?: InfoExtra[]
    primeiraEtapa?: boolean
    filtros?: ReactNode
    children: ReactNode
}

function LayoutEscolhas({
    titulo,
    valorTotal,
    onAnterior,
    onCancelar,
    acaoDireita,
    infosExtras,
    primeiraEtapa,
    filtros,
    children
}: Props) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#0a0a0a',
                px: {
                    xs: 2,
                    md: 4
                },
                py: 3
            }}
        ><Box
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "#0a0a0a",
                pb: 2
            }}
        >
                <HeaderEscolhas
                    titulo={titulo}
                    valorTotal={valorTotal}
                    onAnterior={onAnterior}
                    onCancelar={onCancelar}
                    acaoDireita={acaoDireita}
                    primeiraEtapa={primeiraEtapa}
                    infosExtras={infosExtras}
                />

                {filtros && (
                    <Box
                        sx={{
                            position: "sticky",
                            top: 16,
                            zIndex: 1000,
                            mb: 3
                        }}
                    >
                        {filtros}
                    </Box>
                )}
            </Box>


            <Grid
                container
                spacing={3}
                sx={{ alignItems: 'stretch' }}
            >
                {children}
            </Grid>
        </Box>
    )
}

export default LayoutEscolhas