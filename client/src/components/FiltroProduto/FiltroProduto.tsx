import {
    Box,
    Grid,
    MenuItem,
    Slider,
    TextField
} from "@mui/material"

import {
    FiltroProdutosProps
} from "./FiltroProduto.type"

function ProductFilters({
    pesquisa,
    onPesquisaChange,
    filtros,
    valores,
    onFiltroChange,
    ordenacao,
    onOrdenacaoChange,
    ordenacoes,
    preco,
    onPrecoChange,
    menorPreco,
    maiorPreco
}: FiltroProdutosProps) {

    return (
        <Box
            sx={{
                mb: 4,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#111",
                border: "1px solid #222"
            }}
        >
            <Grid
                container
                spacing={2}
            >
                <Grid size={{
                    xs: 12,
                    md: 4
                }}>
                    <TextField
                        fullWidth
                        label="Pesquisar"
                        value={pesquisa}
                        onChange={(e) =>
                            onPesquisaChange(
                                e.target.value
                            )
                        }
                    />
                </Grid>

                {filtros.map(filtro => (
                    <Grid
                        key={filtro.id}
                        size={{
                            xs: 12,
                            md: 2
                        }}
                    >
                        <TextField
                            select
                            fullWidth
                            label={filtro.titulo}
                            value={
                                valores[
                                filtro.id
                                ] ?? ""
                            }
                            onChange={(e) =>
                                onFiltroChange(
                                    filtro.id,
                                    e.target.value
                                )
                            }
                        >
                            <MenuItem value="">
                                Todos
                            </MenuItem>

                            {filtro.opcoes.map(
                                option => (
                                    <MenuItem
                                        key={
                                            option.value
                                        }
                                        value={
                                            option.value
                                        }
                                    >
                                        {option.label}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>
                ))}

                <Grid size={{
                    xs: 12,
                    md: 2
                }}>
                    <TextField
                        select
                        fullWidth
                        label="Ordenação"
                        value={ordenacao}
                        onChange={(e) =>
                            onOrdenacaoChange(
                                e.target.value
                            )
                        }
                    >
                        {ordenacoes.map(
                            ordenacaoItem => (
                                <MenuItem
                                    key={
                                        ordenacaoItem.id
                                    }
                                    value={
                                        ordenacaoItem.id
                                    }
                                >
                                    {
                                        ordenacaoItem.label
                                    }
                                </MenuItem>
                            )
                        )}
                    </TextField>
                </Grid>

                <Grid size={{
                    xs: 12,
                    md: 2
                }}>
                    <TextField
                        fullWidth
                        type="number"
                        value={preco[0]}
                        onChange={(e) => onPrecoChange(Number(e.target.value), preco[1])}
                    />
                    <Slider
                        value={preco}
                        onChange={(_, value) => {
                            const [min, max] =
                                value as number[]

                            onPrecoChange(
                                min,
                                max
                            )
                        }}
                        min={menorPreco}
                        max={maiorPreco}
                        step={250}
                    />
                    <TextField
                        fullWidth
                        value={preco[1]}
                        onChange={(e) => onPrecoChange(preco[0], Number(e.target.value))}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductFilters