import { Box, Typography } from "@mui/material"
import PcCard from "../PcCard/PcCard"
import PC from "../../interfaces/pc"

interface Props {
  pcs: PC[]
  onRemove: (id: number) => void
}

function ListaSalvos({ pcs, onRemove }: Props) {
  if (pcs.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center"
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: 24
          }}
        >
          Não há nenhum PC salvo
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            mt: 1
          }}
        >
          Crie seu primeiro setup
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        },
        gap: 3,
        width: "100%"
      }}
    >
      {pcs.map((pc) => (
        <PcCard
          key={pc.id}
          id={pc.id}
          processador={pc.processador}
          nome={pc.nome}
          onRemove={onRemove}
        />
      ))}
    </Box>
  )
}

export default ListaSalvos