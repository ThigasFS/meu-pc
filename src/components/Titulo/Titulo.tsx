import styled from 'styled-components'

interface Props {
  children: React.ReactNode,
  pos?: 'left' | 'center' | 'right',
  tamanho?: number,
  cor?: string
}

function Titulo ({children, pos = 'left', tamanho=2, cor='#37A686'}: Props) {
  const Titulo = styled.h1`
    font-size: ${tamanho}em;
    text-align: ${pos};
    color: ${cor}
  `
  return (
    <Titulo>
        {children}
    </Titulo>
  )
}

export default Titulo