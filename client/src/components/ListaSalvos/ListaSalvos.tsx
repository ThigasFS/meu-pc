import { Box, Typography } from "@mui/material"
import OrientacaoCard from "../OrientacaoCard/orientacaoCard"
import { Orientacao } from "../../interfaces/orientacao"

interface Props {
  items: Orientacao[]
  onRemove: (id: string) => void
}

function ListaSalvos({ items, onRemove }: Props) {
  if (items.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center"
        }}
      >
        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 20
          }}
        >
          Não há orientação salva
        </Typography>
      </Box>
    )
  }

  const orientacoes = Object.values(items)

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
      {orientacoes.map((item) =>
        <OrientacaoCard
          key={item.id}
          orientacao={item}
          onRemove={onRemove}
        />
      )}
    </Box>
  )
}

export default ListaSalvos