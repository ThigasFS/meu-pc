import {Box, Button, Stack, Typography} from '@mui/material'
import { Link } from 'react-router-dom'

function Cabecalho() {
  return (
    <Box sx={{display: 'flex', gap: 5, flexDirection: 'column'}}>
      <Typography sx={{color: '#0FFCBE', fontWeight: 600, fontSize: 32}}>Meu PC</Typography>
      <Stack sx={{display: 'flex', gap: 3, flexDirection: 'row'}}>
        <Link to='/sobre-nos'><Button sx={{color: 'white'}}>Sobre nós</Button></Link>
      </Stack>
    </Box>
  )
}

export default Cabecalho