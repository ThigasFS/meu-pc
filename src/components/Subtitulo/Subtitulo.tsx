import styled from 'styled-components'

interface Props {
  children: React.ReactNode,
  pos?: 'left' | 'center' | 'right',
  tamanho?: number,
  cor?: string
}

function Subtitulo ({children, pos = 'left', tamanho=1, cor}: Props) {
  const Subtitulo = styled.h2`
    text-align: ${pos};
    font-size: ${tamanho}em;
    color: ${cor}
  `
  return (
    <Subtitulo>
        {children}
    </Subtitulo>
  )
}

export default Subtitulo