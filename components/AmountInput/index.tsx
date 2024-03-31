import s from './style.module.scss'

const AmountInput = (props: any) => {
  const { value, onChange, onMaxClick } = props

  return (
    <div className={s.inputBox}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <span
        className={s.max}
        onClick={onMaxClick}
      >
        Max
      </span>
    </div>
  )
}

export default AmountInput
