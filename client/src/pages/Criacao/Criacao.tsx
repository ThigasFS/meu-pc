import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export default function SelecaoCriacao() {
  return (
    <Container maxWidth="md">
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
      <Box sx={{py: 8}}>
        <Typography
          variant="h3"
          sx={{textAlign: "center", fontWeight: 700}}
          gutterBottom
        >
          O que você deseja criar?
        </Typography>

        <Typography
          variant="h6"
          sx={{textAlign: "center", mb: 6, color: 'white'}}
        >
          Escolha a experiência que melhor atende sua necessidade.
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{justifyContent: "center"}}
          spacing={4}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Stack spacing={3} sx={{alignItems: "center"}}>
                <Avatar sx={{ width: 72, height: 72 }}>
                  <SchoolIcon fontSize="large" />
                </Avatar>

                <Typography variant="h5" sx={{fontWeight: 600}}>
                  Pré-Montagens
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{textAlign: "center"}}
                >
                  Receba sugestões prontas baseadas em objetivos como
                  educação, jogos, trabalho ou uso casual.
                </Typography>

                <Button
                  component={Link}
                  to="/pre-montagem"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Selecionar
                </Button>

                <Box sx={{textAlign: "center"}}>
                  <Typography variant="subtitle2" color="primary">
                    Perfil indicado
                  </Typography>

                  <Typography color="text.secondary">
                    Iniciantes, estudantes e usuários que desejam uma
                    recomendação rápida.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Stack spacing={3} sx={{alignItems: "center"}}>
                <Avatar sx={{ width: 72, height: 72 }}>
                  <BuildIcon fontSize="large" />
                </Avatar>

                <Typography variant="h5" sx={{fontWeight: 600}}>
                  Montagem Personalizada
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{textAlign: "center"}}
                >
                  Escolha cada componente e monte seu computador de forma
                  totalmente personalizada.
                </Typography>

                <Button
                  component={Link}
                  to="/criar-novo-pc/processador"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Selecionar
                </Button>

                <Box sx={{textAlign: "center"}}>
                  <Typography variant="subtitle2" color="primary">
                    Perfil indicado
                  </Typography>

                  <Typography color="text.secondary">
                    Entusiastas, gamers avançados e profissionais que
                    desejam controle total da configuração.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}