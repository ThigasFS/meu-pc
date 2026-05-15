import {
    Box,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
    Button
} from "@mui/material"

import {
    Computer,
    Memory,
    Storage,
    SettingsSuggest,
    ArrowBack,
    Bolt
} from "@mui/icons-material"

import { Link } from "react-router-dom"

function SobreNos() {

    return (

        <Box
            sx={{

                minHeight: "100vh",

                background:
                    "linear-gradient(180deg, #111 0%, #1a1a1a 100%)",
                py: 6
            }}
        >

            <Container maxWidth="lg">

                {/* Header */}

                <Stack
                    direction="row"
                    sx={{alignItems: "center", justifyContent: "space-between", mb:4}}
                >

                    <Button
                        component={Link}
                        to="/"
                        startIcon={<ArrowBack />}
                        variant="outlined"
                        sx={{
                            color: "white",
                            borderColor: "rgba(255,255,255,0.2)",

                            "&:hover": {
                                borderColor: "white",
                                background:
                                    "rgba(255,255,255,0.05)"
                            }
                        }}
                    >
                        Voltar
                    </Button>

                    <Typography
                        sx={{
                            color: "white",
                            fontWeight: 800,
                            fontSize: {
                                xs: 28,
                                md: 42
                            }
                        }}
                    >
                        Sobre Nós
                    </Typography>

                    <Box sx={{width: 80}}/>
                </Stack>

                {/* Hero */}

                <Paper
                    elevation={0}
                    sx={{

                        p: {
                            xs: 4,
                            md: 6
                        },

                        borderRadius: 5,

                        background:
                            "rgba(255,255,255,0.04)",

                        backdropFilter: "blur(12px)",

                        border:
                            "1px solid rgba(255,255,255,0.08)",

                        mb: 5
                    }}
                >

                    <Typography
                        sx={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: {
                                xs: 28,
                                md: 40
                            },

                            mb: 2
                        }}
                    >
                        Monte seu PC com inteligência
                    </Typography>

                    <Typography
                        sx={{
                            color: "#cbd5e1",
                            fontSize: 18,
                            lineHeight: 1.8
                        }}
                    >
                        Nossa plataforma foi criada para ajudar
                        usuários a encontrarem os melhores
                        componentes para seus computadores,
                        comparando preços entre lojas,
                        verificando compatibilidade e facilitando
                        todo o processo de montagem.
                    </Typography>

                </Paper>

                <Stack
                    direction={{
                        xs: "column",
                        md: "row"
                    }}
                    spacing={3}
                    sx={{mb: 5}}
                >

                    <Paper
                        sx={cardStyle}
                    >
                        <Computer
                            sx={iconStyle}
                        />

                        <Typography
                            sx={titleStyle}
                        >
                            Compatibilidade Inteligente
                        </Typography>

                        <Typography
                            sx={textStyle}
                        >
                            Verificamos automaticamente
                            compatibilidade entre processador,
                            placa-mãe, memória RAM e outros
                            componentes.
                        </Typography>
                    </Paper>

                    <Paper
                        sx={cardStyle}
                    >
                        <Bolt
                            sx={iconStyle}
                        />

                        <Typography
                            sx={titleStyle}
                        >
                            Comparação de Preços
                        </Typography>

                        <Typography
                            sx={textStyle}
                        >
                            Coletamos preços de diferentes lojas
                            para ajudar você a economizar na hora
                            de montar seu setup.
                        </Typography>
                    </Paper>

                    <Paper
                        sx={cardStyle}
                    >
                        <SettingsSuggest
                            sx={iconStyle}
                        />

                        <Typography
                            sx={titleStyle}
                        >
                            Recomendações Automáticas
                        </Typography>

                        <Typography
                            sx={textStyle}
                        >
                            O sistema auxilia na escolha de peças
                            equilibradas para jogos, estudos,
                            trabalho e produtividade.
                        </Typography>
                    </Paper>

                </Stack>

                {/* Missão */}

                <Paper
                    sx={{
                        ...cardStyle,
                        p: 5
                    }}
                >

                    <Typography
                        sx={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: 30,
                            mb: 2
                        }}
                    >
                        Nossa missão
                    </Typography>

                    <Divider
                        sx={{
                            borderColor:
                                "rgba(255,255,255,0.1)",
                            mb: 3
                        }}
                    />

                    <Typography
                        sx={{
                            color: "#cbd5e1",
                            lineHeight: 1.9,
                            fontSize: 17
                        }}
                    >
                        Queremos tornar a experiência de montar um
                        computador mais simples, acessível e segura.
                        Muitas pessoas possuem dificuldade em entender
                        compatibilidade, desempenho e custo-benefício.
                        Nossa proposta é transformar esse processo em
                        algo intuitivo e confiável.
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{mt: 4, flexWrap: "wrap"}}
                    >

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{alignItems: "center"}}
                        >
                            <Memory sx={{ color: "#60a5fa" }} />

                            <Typography sx={{ color: "white" }}>
                                Hardware
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{alignItems: "center"}}
                        >
                            <Storage sx={{ color: "#34d399" }} />

                            <Typography sx={{ color: "white" }}>
                                Banco de Dados
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{alignItems: "center"}}
                        >
                            <Computer sx={{ color: "#f472b6" }} />

                            <Typography sx={{ color: "white" }}>
                                Performance
                            </Typography>
                        </Stack>

                    </Stack>

                </Paper>

            </Container>

        </Box>
    )
}

const cardStyle = {

    flex: 1,

    p: 4,

    borderRadius: 5,

    background:
        "rgba(255,255,255,0.04)",

    border:
        "1px solid rgba(255,255,255,0.08)",

    backdropFilter: "blur(10px)"
}

const iconStyle = {

    fontSize: 48,
    color: "#60a5fa",
    mb: 2
}

const titleStyle = {

    color: "white",
    fontWeight: 700,
    fontSize: 22,
    mb: 1
}

const textStyle = {

    color: "#cbd5e1",
    lineHeight: 1.7
}

export default SobreNos