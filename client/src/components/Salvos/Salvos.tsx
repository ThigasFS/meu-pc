import { useEffect, useState } from 'react'
import ListaSalvos from '../ListaSalvos/ListaSalvos.tsx'
import { Link } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Orientacao } from '../../interfaces/orientacao.ts'

function Salvos() {
  const [listaOrientacoes, setListaOrientacoes] = useState<Orientacao[]>([])

  useEffect(() => {
    const listaOrientacao = sessionStorage.getItem('orientacoes')
    if (listaOrientacao) {
      setListaOrientacoes(JSON.parse(listaOrientacao))
    }
  }, [])

  function removerOrientacao(id: string) {
    const novaLista = Object.values(listaOrientacoes).filter(item => item.id !== id)
    setListaOrientacoes(novaLista)
    sessionStorage.setItem('orientacoes', JSON.stringify(novaLista))
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 3,
        p: 4
      }}
    >
      <Stack
        spacing={3}
        sx={{alignItems: "center"}}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: 24
          }}
        >
          Suas Orientações Salvas
        </Typography>

        <ListaSalvos
          items={listaOrientacoes}
          onRemove={removerOrientacao}
        />

        <Link to="/orientacao" style={{textDecoration: 'none'}}>
          <Button
            sx={{
              background: "#52F2B8",
              color: "black",
              px: 4,
              py: 1.5,
              fontWeight: 600
            }}
          >
            Começar uma Orientação
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default Salvos
