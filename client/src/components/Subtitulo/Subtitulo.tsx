import styled from 'styled-components'

interface Props {
  children: React.ReactNode,
  pos?: 'left' | 'center' | 'right',
  tamanho?: number,
  cor?: string,
  weight?: number
}

function Subtitulo ({children, pos = 'left', tamanho=1, cor, weight}: Props) {
  const Subtitulo = styled.h2`
    text-align: ${pos};
    font-size: ${tamanho}em;
    color: ${cor};
    margin-${pos}: 4em;
    font-weight: ${weight}
  `
  return (
    <Subtitulo>
        {children}
    </Subtitulo>
  )
}

export default Subtitulo