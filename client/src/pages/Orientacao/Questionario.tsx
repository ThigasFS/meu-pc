import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Input,
    LinearProgress,
    Radio,
    RadioGroup,
    Slider,
    Stack,
    Typography,
} from '@mui/material';

import { questoes } from '../../data/questoes';
import { useOrientacao } from '../../hooks/useOrientacao';

export default function Questionario() {
    const navigate = useNavigate();
    const orientacao = useOrientacao();

    const [indiceAtual, setIndiceAtual] = useState(0);
    const [orcamento, setOrcamento] = useState<number[]>([0, 100000]);

    const [respostas, setRespostas] = useState<Record<number, number>>(
        () => {
            const respostasSalvas = orientacao.criterios?.respostas ?? {};

            return Object.fromEntries(
                Object.entries(respostasSalvas).map(([questaoId, respostaId]) => [
                    Number(questaoId),
                    Number(respostaId),
                ]),
            );
        },
    );

    const [erro, setErro] = useState(false);

    if (!orientacao.encontrada) {
        return <Navigate to="/orientacao" replace />;
    }

    if (!orientacao.intencao) {
        return (
            <Navigate
                to={`/orientacao/${orientacao.id}/intencao`}
                replace
            />
        );
    }

    const questao = questoes[indiceAtual];

    const progresso = ((indiceAtual + 1) / questoes.length) * 100;

    const respostaSelecionada = respostas[questao.id];

    function selecionarResposta(respostaId: number) {
        setRespostas((anterior) => ({
            ...anterior,
            [questao.id]: respostaId,
        }));

        setErro(false);
    }

    function voltar() {
        if (indiceAtual > 0) {
            setIndiceAtual((anterior) => anterior - 1);
        } else {
            navigate(`/orientacao/${orientacao.id}/intencao`);
        }
    }

    function avancar() {
        if (questao.tipo !== 'Orçamento' && !respostaSelecionada) {
            setErro(true);
            return;
        }

        if (indiceAtual < questoes.length - 1) {
            setIndiceAtual((anterior) => anterior + 1);
            setErro(false);
        } else {
            finalizar();
        }
    }

    function finalizar() {
        const todasRespondidas = questoes
            .filter((q) => q.tipo !== 'Orçamento')
            .every((q) => respostas[q.id] !== undefined);

        if (!todasRespondidas) {
            setErro(true);
            return;
        }

        const questaoPerfil = questoes.find(
            (q) => q.tipo === 'Perfil',
        );

        const opcaoPerfil = questaoPerfil?.opcoes && questaoPerfil?.opcoes.find(
            (opcao) => opcao.id === respostas[questaoPerfil.id],
        );

        const perfil =
            opcaoPerfil?.valor === 'custo-beneficio' ||
                opcaoPerfil?.valor === 'desempenho' ||
                opcaoPerfil?.valor === 'hibrido'
                ? opcaoPerfil.valor
                : undefined;

        orientacao.atualizarOrientacao({
            criterios: {
                ...orientacao.criterios,
                orcamento: orcamento[1],
                orcamentoMinimo: orcamento[0],
                perfil,
                respostas: Object.fromEntries(
                    Object.entries(respostas).map(([id, respostaId]) => [
                        id,
                        respostaId,
                    ]),
                ),
            },
        });

        navigate(`/orientacao/${orientacao.id}/recomendacao`);
    }

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 850,
                mx: 'auto',
                py: { xs: 2, md: 4 },
                px: { xs: 1, md: 2 },
            }}
        >
            <Stack spacing={4}>
                <Box>
                    <Typography
                        variant="overline"
                        color="primary"
                        sx={{ fontWeight: 700, letterSpacing: 1.5 }}
                    >
                        ETAPA 2 · QUESTIONÁRIO
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        Vamos conhecer suas necessidades?
                    </Typography>

                    <Typography color="text.secondary">
                        Responda às perguntas para encontrarmos configurações adequadas ao seu perfil e orçamento.
                    </Typography>
                </Box>

                <Box>
                    <Stack
                        direction="row"
                        sx={{ mb: 1.5, justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Pergunta {indiceAtual + 1} de {questoes.length}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: 700 }}
                        >
                            {Math.round(progresso)}% concluído
                        </Typography>
                    </Stack>

                    <LinearProgress
                        variant="determinate"
                        value={progresso}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'action.hover',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 5,
                            },
                        }}
                    />
                </Box>

                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 3,
                        borderColor: 'divider',
                        boxShadow: 1,
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography
                                    variant="overline"
                                    color="primary"
                                    sx={{ fontWeight: 700 }}
                                >
                                    {questao.tipo}
                                </Typography>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mt: 1,
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {questao.pergunta}
                                </Typography>
                            </Box>

                            <FormControl error={erro} fullWidth>
                                {questao.tipo === 'Orçamento' ? (
                                    <Stack spacing={3}>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={3}
                                            sx={{ alignItems: 'center' }}
                                        >
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: 1 }}>
                                                    Orçamento mínimo
                                                </Typography>

                                                <Input
                                                    fullWidth
                                                    type="number"
                                                    value={orcamento[0]}
                                                    onChange={(e) => {
                                                        const valor = Math.max(0, Number(e.target.value));

                                                        setOrcamento([
                                                            Math.min(valor, orcamento[1]),
                                                            orcamento[1],
                                                        ]);
                                                    }}
                                                    startAdornment={
                                                        <Typography color="text.secondary" sx={{ mr: 1 }}>
                                                            R$
                                                        </Typography>
                                                    }
                                                />
                                            </Box>

                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: 1 }}>
                                                    Orçamento máximo
                                                </Typography>

                                                <Input
                                                    fullWidth
                                                    type="number"
                                                    value={orcamento[1]}
                                                    onChange={(e) => {
                                                        const valor = Math.max(orcamento[0], Number(e.target.value));

                                                        setOrcamento([
                                                            orcamento[0],
                                                            valor,
                                                        ]);
                                                    }}
                                                    startAdornment={
                                                        <Typography color="text.secondary" sx={{ mr: 1 }}>
                                                            R$
                                                        </Typography>
                                                    }
                                                />
                                            </Box>
                                        </Stack>

                                        <Box sx={{ px: 2 }}>
                                            <Slider
                                                value={orcamento}
                                                onChange={(_, value) => {
                                                    if (Array.isArray(value)) {
                                                        setOrcamento(value);
                                                    }
                                                }}
                                                min={0}
                                                max={100000}
                                                step={500}
                                                valueLabelDisplay="auto"
                                                valueLabelFormat={(valor) =>
                                                    `R$ ${valor.toLocaleString('pt-BR')}`
                                                }
                                                sx={{
                                                    '& .MuiSlider-thumb': {
                                                        width: 18,
                                                        height: 18,
                                                    },
                                                    '& .MuiSlider-track': {
                                                        border: 'none',
                                                    },
                                                }}
                                            />
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ textAlign: 'center' }}
                                        >
                                            Você pretende investir entre{' '}
                                            <strong>
                                                R$ {orcamento[0].toLocaleString('pt-BR')}
                                            </strong>
                                            {' '}e{' '}
                                            <strong>
                                                R$ {orcamento[1].toLocaleString('pt-BR')}
                                            </strong>
                                        </Typography>
                                    </Stack>
                                ) : (
                                    <RadioGroup
                                        value={respostaSelecionada?.toString() ?? ''}
                                        onChange={(event) =>
                                            selecionarResposta(Number(event.target.value))
                                        }
                                    >
                                        {questao.opcoes?.map((opcao) => (
                                            <Card
                                                key={opcao.id}
                                                variant="outlined"
                                                sx={{
                                                    mb: 1.5,
                                                    borderRadius: 2,
                                                    borderWidth: respostaSelecionada === opcao.id ? 2 : 1,
                                                    borderColor:
                                                        respostaSelecionada === opcao.id
                                                            ? 'primary.main'
                                                            : 'divider',
                                                    backgroundColor:
                                                        respostaSelecionada === opcao.id
                                                            ? 'action.selected'
                                                            : 'background.paper',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        borderColor: 'primary.main',
                                                        backgroundColor: 'action.hover',
                                                    },
                                                }}
                                            >
                                                <FormControlLabel
                                                    value={opcao.id.toString()}
                                                    control={<Radio />}
                                                    label={
                                                        <Box sx={{ py: 1 }}>
                                                            <Typography sx={{ fontWeight: 600 }}> {opcao.etiqueta} </Typography>

                                                            {opcao.descricao && (
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                    sx={{ mt: 0.5 }}
                                                                >
                                                                    {opcao.descricao}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    }
                                                    sx={{
                                                        m: 0,
                                                        p: 1.5,
                                                        width: '100%',
                                                        alignItems: 'center',
                                                    }}
                                                />
                                            </Card>
                                        ))}
                                    </RadioGroup>
                                )}

                                {erro && (
                                    <FormHelperText>
                                        Selecione uma alternativa para continuar.
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </CardContent>
                </Card>

                {erro && !respostaSelecionada && (
                    <Alert severity="warning">
                        É necessário responder à pergunta antes de continuar.
                    </Alert>
                )}

                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between' }}
                    spacing={2}
                >
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={voltar}
                        sx={{
                            minWidth: 120,
                            py: 1.2,
                            borderRadius: 2,
                        }}
                    >
                        Voltar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={avancar}
                        sx={{
                            minWidth: 180,
                            py: 1.2,
                            borderRadius: 2,
                            fontWeight: 600,
                        }}
                    >
                        {indiceAtual === questoes.length - 1
                            ? 'Finalizar questionário'
                            : 'Próxima pergunta'}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}