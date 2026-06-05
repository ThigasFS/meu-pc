import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Link
} from "@mui/material";

import { Componente } from "../../interfaces/componente";

interface Props {
    componente: Componente;
}

export default function ComparacaoPrecoTable({
    componente
}: Props) {
    const valores = componente.valores ?? []

    const menorPreco = Math.min(
        ...valores.map(v => v.preco)
    );

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Loja</TableCell>
                        <TableCell align="right">Preço</TableCell>
                        <TableCell align="center">Link</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {valores
                        .sort((a, b) => a.preco - b.preco)
                        .map((valor) => (
                            <TableRow
                                key={`${valor.loja}-${valor.preco}`}
                                selected={valor.preco === menorPreco}
                            >
                                <TableCell>
                                    {valor.loja}
                                </TableCell>

                                <TableCell align="right">
                                    {valor.preco.toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL"
                                        }
                                    )}
                                </TableCell>

                                <TableCell align="center">
                                    <Link
                                        href={valor.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Acessar
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}