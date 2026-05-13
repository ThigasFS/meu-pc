import {
    Box,
    Paper,
    Stack,
    Typography
} from '@mui/material'

import { Componente } from '../../interfaces/componente'

interface Props {
    componente: Componente
}

function CardComponenteResumo({
    componente
}: Props) {

    function renderizarSpecs() {

        switch (componente.tipo) {

            case 'placamae':
                return (
                    <>
                        <Typography>
                            Socket: {componente.socket}
                        </Typography>

                        <Typography>
                            DDR{componente.ddr}
                        </Typography>
                    </>
                )

            case 'cpu':
                return (
                    <>
                        <Typography>
                            Socket: {componente.socket}
                        </Typography>

                        <Typography>
                            Clock: {componente.velocidade} MHz
                        </Typography>

                        <Typography>
                            TDP: {componente.tdp}W
                        </Typography>
                    </>
                )

            case 'gpu':
                return (
                    <>
                        <Typography>
                            VRAM: {componente.vram}GB
                        </Typography>

                        <Typography>
                            GDDR{componente.gddr}
                        </Typography>

                        <Typography>
                            TDP: {componente.tdp}W
                        </Typography>
                    </>
                )

            case 'memoriaram':
                return (
                    <>
                        <Typography>
                            {componente.capacidade}GB
                            ({componente.modulos.join('x')})
                        </Typography>

                        <Typography>
                            DDR{componente.ddr}
                        </Typography>

                        <Typography>
                            {componente.velocidade} MHz
                        </Typography>
                    </>
                )

            case 'armazenamento':
                return (
                    <>
                        <Typography>
                            {componente.tipoArmazenamento}
                        </Typography>

                        <Typography>
                            {componente.capacidade}
                            {componente.unidade}
                        </Typography>

                        <Typography>
                            Leitura:
                            {componente.velocidadeLeitura} MB/s
                        </Typography>

                        <Typography>
                            Gravação:
                            {componente.velocidadeGravacao} MB/s
                        </Typography>
                    </>
                )

            case 'fonte':
                return (
                    <>
                        <Typography>
                            {componente.certificacao}
                        </Typography>

                        <Typography>
                            {componente.potencia}W
                        </Typography>

                        <Typography>
                            Modular:
                            {componente.modularidade}
                        </Typography>
                    </>
                )

            case 'gabinete':
                return (
                    <>
                        <Typography>
                            Cor: {componente.cor}
                        </Typography>

                        <Typography>
                            {componente.qtdFans} fans
                        </Typography>
                    </>
                )
        }
    }

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                borderRadius: 3
            }}
        >
            <Stack
                direction={{
                    xs: 'column',
                    md: 'row'
                }}
                spacing={3}
                sx={{alignItems: 'center'}}
            >

                <Box
                    component='img'
                    src={componente.imagem}
                    alt={componente.nome}
                    sx={{
                        width: 180,
                        height: 180,
                        objectFit: 'contain'
                    }}
                />

                <Box sx={{flex: 1}}>

                    <Typography
                        variant='h6'
                        sx={{fontWeight: 700, mb: 1}}
                    >
                        {componente.nome}
                    </Typography>

                    <Stack spacing={0.5}>

                        <Typography>
                            Marca: {componente.marca}
                        </Typography>

                        {renderizarSpecs()}

                        <Typography
                            variant='h6'
                            sx={{fontWeight: 700, mt: 2}}
                        >
                            {componente.preco.toLocaleString(
                                'pt-BR',
                                {
                                    style: 'currency',
                                    currency: 'BRL'
                                }
                            )}
                        </Typography>

                    </Stack>

                </Box>

            </Stack>
        </Paper>
    )
}

export default CardComponenteResumo