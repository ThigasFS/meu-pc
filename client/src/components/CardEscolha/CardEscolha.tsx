import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Box
} from '@mui/material'

interface Props {
  id: number
  imagem: string
  marca: string
  modelo: string
  preco: number
  socket?: string
  videoIntegrado?: boolean
  aoSelecionar: (id: number) => void
  selecionado: boolean
  componente: string
  vram?: number
  gddr?: number
  ddr?: number
  modulos?: number[]
  velocidade?: number
  capacidadeRam?: number
  tipoArmazenamento?: string
  tipoConexao?: string
  velocidadeLeitura?: number
  velocidadeGravacao?: number
  capacidade?: number
  unidade?: string
  potencia?: number
  certificacao?: string
  fans?: number
  cor?: string
}

function CardEscolha({
  id,
  imagem,
  marca,
  modelo,
  preco,
  socket,
  selecionado,
  aoSelecionar,
  videoIntegrado,
  componente,
  gddr,
  vram,
  ddr,
  capacidade,
  velocidade,
  modulos,
  capacidadeRam,
  tipoArmazenamento,
  tipoConexao,
  unidade,
  velocidadeGravacao,
  velocidadeLeitura,
  certificacao,
  potencia,
  fans,
  cor
}: Props) {

  function selecionar() {
    aoSelecionar(id)
  }

  function renderizarDetalhesPorComponente() {

    if (componente === 'placamae') {
      return (
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            Socket: {socket}
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            DDR{ddr}
          </Typography>
        </Stack>
      )
    }

    if (componente === 'processador') {
      return (
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {velocidade}GHz
          </Typography>

          <Chip
            size='medium'
            color={videoIntegrado ? 'success' : 'default'}
            label={
              videoIntegrado
                ? 'Vídeo Integrado'
                : 'Sem Vídeo Integrado'
            }
            sx={{ width: 'fit-content', color: videoIntegrado || selecionado ? '#fff' : '#111'}}
          />
        </Stack>
      )
    }

    if (componente === 'placavideo') {
      return (
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {vram}GB VRAM
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            GDDR{gddr}
          </Typography>
        </Stack>
      )
    }

    if (componente === 'memoriaram') {

      const qto = modulos?.[0]
      const cap = modulos?.[1]

      return (
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {capacidadeRam}GB
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {qto}x{cap}
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {velocidade}MHz DDR{ddr}
          </Typography>
        </Stack>
      )
    }

    if (componente === 'armazenamento') {
      return (
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {tipoArmazenamento} {tipoConexao}
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {capacidade}{unidade}
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {velocidadeLeitura}MB/s leitura
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {velocidadeGravacao}MB/s gravação
          </Typography>
        </Stack>
      )
    }

    if (componente === 'fonte') {
      return (
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {potencia}W
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {certificacao?.toLocaleUpperCase()}
          </Typography>
        </Stack>
      )
    }

    if (componente === 'gabinete') {
      return (
        <Stack spacing={0.5}>
          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            {cor}
          </Typography>

          <Typography variant='body1' sx={{color: selecionado ? '#fff' : '#111'}}>
            Suporte para {fans} fans
          </Typography>
        </Stack>
      )
    }

    return null
  }

  return (
    <Card
      onClick={selecionar}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 520,
        borderRadius: 6,
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        transition: '0.25s',
        display: 'flex',
        flexDirection: 'column',
        border: selecionado
          ? '2px solid #3b82f6'
          : '2px solid transparent',
        background: selecionado
          ? 'linear-gradient(135deg, #172554 0%, #1e3a8a 100%)'
          : '#f5f5f5',
        color: selecionado ? '#fff' : '#111',
        transform: selecionado
          ? 'scale(1.02)'
          : 'scale(1)',
        boxShadow: selecionado
          ? '0 0 30px rgba(59,130,246,0.45)'
          : '0 6px 18px rgba(0,0,0,0.18)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow:
            '0 14px 32px rgba(0,0,0,0.25)'
        }
      }}
    >

      {
        selecionado && (
          <Chip
            label='Selecionado'
            color='primary'
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              fontWeight: 700,
              px: 1
            }}
          />
        )
      }

      <Box
        sx={{
          width: '100%',
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: selecionado
            ? 'rgba(255,255,255,0.05)'
            : '#ececec',
          p: 2
        }}
      >

        <CardMedia
          component='img'
          image={imagem}
          alt={modelo}
          sx={{
            width: '78%',
            height: '78%',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
            mx: 'auto',
            transition: '0.25s',
            filter: selecionado
              ? 'drop-shadow(0 0 12px rgba(255,255,255,0.25))'
              : 'none'
          }}
        />

      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 3,
          p: 3
        }}
      >

        <Stack spacing={1.5}>

          <Typography
            variant='body2'
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              opacity: selecionado ? 0.8 : 0.65,
              color: selecionado ? '#fff' : '#111'
            }}
          >
            {marca}
          </Typography>

          <Typography
            variant='h5'
            sx={{
              fontWeight: 900,
              lineHeight: 1.15,
              minHeight: 72,
              color: selecionado ? '#fff' : '#111'
            }}
          >
            {modelo}
          </Typography>

          <Stack
            spacing={0.7}
            sx={{
              opacity: 0.92
            }}
          >
            {renderizarDetalhesPorComponente()}
          </Stack>

        </Stack>

        <Typography
          variant='h4'
          sx={{
            fontWeight: 900,
            color: selecionado
              ? '#93c5fd'
              : '#1976d2'
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

      </CardContent>

    </Card>
  )
}

export default CardEscolha