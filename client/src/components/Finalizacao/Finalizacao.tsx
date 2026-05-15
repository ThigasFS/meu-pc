import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material'

import { Link, useOutletContext } from 'react-router-dom'
import { useState } from 'react'

import PC from '../../interfaces/pc'
import ID from '../../id'

import CardComponenteResumo from '../CardComponenteResumo/CardComponenteResumo'

type ContextType = {
    pcMontado: PC,
    setPcMontado: React.Dispatch<React.SetStateAction<Partial<PC>>>
}

function Finalizacao() {
    const [nomePc, setNomePc] = useState('')

    const { pcMontado, setPcMontado } =
        useOutletContext<ContextType>()

    function finalizarPC() {
        const pcFinalizado: PC = {
            id: ID(),
            nome: nomePc,
            valorTotal: pcMontado.valorTotal,
            armazenamento: pcMontado.armazenamento,
            fonte: pcMontado.fonte,
            memoriaRam: pcMontado.memoriaRam,
            placaMae: pcMontado.placaMae,
            processador: pcMontado.processador,
            videoIntegrado: pcMontado.videoIntegrado,
            gabinete: pcMontado.gabinete,
            placaVideo: pcMontado.placaVideo,
        }

        const listaAntigaString =
            localStorage.getItem('listaDePcs')

        const listaAntiga: PC[] =
            listaAntigaString
                ? JSON.parse(listaAntigaString)
                : []

        localStorage.setItem(
            'listaDePcs',
            JSON.stringify([
                ...listaAntiga,
                pcFinalizado
            ])
        )
    }

    function resetarPc() {
        setPcMontado({})
    }

    return (
        <Box
            sx={{
                maxWidth: 1200,
                mx: 'auto',
                py: 5,
                px: 2
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 4
                }}
            >
                <Stack spacing={4}>

                    <Box>
                        <Typography
                            variant='h4'
                            sx={{fontWeight: 700}}
                        >
                            Finalização do PC
                        </Typography>

                        <Typography
                            variant='body1'
                            color='text.secondary'
                            sx={{ mt: 1}}
                        >
                            Revise os componentes antes de finalizar sua build.
                        </Typography>
                    </Box>

                    <TextField
                        label='Nome do computador'
                        fullWidth
                        value={nomePc}
                        onChange={(e) =>
                            setNomePc(e.target.value)
                        }
                    />

                    <Stack spacing={2}>
                        <CardComponenteResumo componente={pcMontado.placaMae} />
                        <CardComponenteResumo componente={pcMontado.processador} />

                        {pcMontado.placaVideo && (
                            <CardComponenteResumo componente={pcMontado.placaVideo} />
                        )}

                        <CardComponenteResumo componente={pcMontado.memoriaRam} />
                        <CardComponenteResumo componente={pcMontado.armazenamento} />
                        <CardComponenteResumo componente={pcMontado.fonte} />

                        {pcMontado.gabinete && (
                            <CardComponenteResumo componente={pcMontado.gabinete} />
                        )}
                    </Stack>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            bgcolor: 'background.default',
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Typography
                            variant='body1'
                            color='text.secondary'
                        >
                            Valor total
                        </Typography>

                        <Typography
                            variant='h4'
                            sx={{fontWeight: 700}}
                        >
                            {pcMontado.valorTotal.toLocaleString(
                                'pt-BR',
                                {
                                    style: 'currency',
                                    currency: 'BRL'
                                }
                            )}
                        </Typography>
                    </Paper>

                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row'
                        }}
                        spacing={2}
                    >
                        <Button
                            component={Link}
                            to='/criar-novo-pc/processador'
                            variant='outlined'
                            fullWidth
                            onClick={resetarPc}
                        >
                            Recomeçar Build
                        </Button>

                        <Button
                            component={Link}
                            to='/'
                            variant='contained'
                            fullWidth
                            onClick={finalizarPC}
                            disabled={!nomePc.trim()}
                        >
                            Finalizar PC
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}

export default Finalizacao