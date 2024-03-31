import s from './style.module.scss'

type ButtonProps = {
  type?: 'colorful' | 'primary'
  className?: string
  onClick?: (args: any) => void
  children: React.ReactNode
}

const Button = ({ type, className, onClick, children, ...props }: ButtonProps) => {
  return (
    <button
      className={`
        ${s.button}
        ${type === 'colorful' ? s.colorful : ''}
        ${type === 'primary' ? s.primary : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
