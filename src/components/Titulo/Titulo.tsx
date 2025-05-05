import style from './Titulo.module.css'

interface Props {
  children: React.ReactNode,
  pos?: 'left' | 'center' | 'right'
}

function Titulo ({children, pos = 'left'}: Props) {
  return (
    <h1 className={`${style.titulo} ${style[pos]}`}>
        {children}
    </h1>
  )
}

export default Titulo