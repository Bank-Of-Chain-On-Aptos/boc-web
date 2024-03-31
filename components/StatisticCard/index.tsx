import s from './style.module.scss'

type CardProps = {
  title?: string
  unit?: string
  value?: any
}

const StatisticCard = ({ title, unit, value }: CardProps) => {
  return (
    <div className={s.card}>
      <p>{title}</p>
      <div className={s.content}>
        <span>{value}</span>
        <span className={s.unit}>{unit}</span>
      </div>
    </div>
  )
}

export default StatisticCard
