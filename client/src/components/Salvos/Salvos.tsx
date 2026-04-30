import { useEffect, useState } from 'react'
import PC from '../../interfaces/pc.ts'
import ListaSalvos from '../ListaSalvos/ListaSalvos.tsx'
import { Link } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'

function Salvos() {
  const [listaSalvos, setListaSalvos] = useState<PC[]>([])

  useEffect(() => {
    const listaStorage = localStorage.getItem('listaDePcs')
    if (listaStorage) {
      setListaSalvos(JSON.parse(listaStorage))
    }
  }, [])

  function removerPc(id: number) {
    const novaLista = listaSalvos.filter(pc => pc.id !== id)
    setListaSalvos(novaLista)
    localStorage.setItem('listaDePcs', JSON.stringify(novaLista))
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
          Seus PCs salvos
        </Typography>

        <ListaSalvos
          pcs={listaSalvos}
          onRemove={removerPc}
        />

        <Link to="/criar-novo-pc/processador">
          <Button
            sx={{
              background: "#52F2B8",
              color: "black",
              px: 4,
              py: 1.5,
              fontWeight: 600
            }}
          >
            Criar novo PC
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default Salvos
