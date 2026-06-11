import {
    Box,
    Grid,
    MenuItem,
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
    onOrdenacaoChange
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
                        <MenuItem value="preco">
                            Menor preço
                        </MenuItem>

                        <MenuItem value="nome">
                            Nome
                        </MenuItem>

                        <MenuItem value="clock">
                            Maior clock
                        </MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductFilters