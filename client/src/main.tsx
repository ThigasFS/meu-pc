import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme.ts'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
)
