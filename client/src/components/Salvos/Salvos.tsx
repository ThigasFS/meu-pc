import { useEffect, useState } from 'react'
import PC from '../../interfaces/pc.ts'
import ListaSalvos from '../ListaSalvos/ListaSalvos.tsx'
import style from './Salvos.module.css'
import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'

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
    <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
        <Typography sx={{color: 'white'}}>Seus PCs salvos</Typography>
        <ListaSalvos pcs={listaSalvos} onRemove={removerPc}/>
        <Link to='/criar-novo-pc/processador' className={style.containerBotao}>
          <Button sx={{background: '#52F2B8', color: 'black', padding: 1.5}}>Criar novo PC</Button>
        </Link>
    </Stack>
  )
}

export default Salvos
