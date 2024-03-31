import StatisticCard from '@/components/StatisticCard'
import { APTI_COIN_DECIMALS, APTI_COIN_TYPE } from '@/constant'
import { useMyCoinBalance } from '@/hook/useAccount'
import { getInvestmentSummary } from '@/service/bocApi'
import { getAccountAddress } from '@/util/account'
import { formatAmount, formatPercent } from '@/util/commonUtils'
import { useEffect, useState } from 'react'
import s from './style.module.scss'
import VariationCurve from '@/components/VariationCurve'
import ProfitChart from '@/components/ProfitChart'
import useCurrentVault from '@/hook/useCurrentVault'

const MyAccount = () => {
  const accountAddress = getAccountAddress()

  const { balance } = useMyCoinBalance(APTI_COIN_TYPE, APTI_COIN_DECIMALS)

  const [profit, setProfit] = useState(0)
  const [weeklyApy, setWeeklyApy] = useState(0)
  const [monthlyApy, setMonthlyApy] = useState(0)

  const isUsdi = useCurrentVault()
  const unit = isUsdi ? 'USD' : 'APT'

  useEffect(() => {
    const fetchInvestmentSummary = async () => {
      if (accountAddress) {
        const investmentSummary = await getInvestmentSummary(accountAddress)
        if (!investmentSummary) {
          return
        }
        if (investmentSummary.hasOwnProperty('profit')) {
          setProfit(investmentSummary['profit'])
        }
        if (investmentSummary.hasOwnProperty('weeklyApy')) {
          setWeeklyApy(investmentSummary['weeklyApy'])
        }
        if (investmentSummary.hasOwnProperty('monthlyApy')) {
          setMonthlyApy(investmentSummary['monthlyApy'])
        }
      }
    }
    fetchInvestmentSummary()
  }, [])

  return (
    <>
      <div className="flex gap-6">
        <div className="flex-1">
          <StatisticCard
            title="Balance"
            unit={`${unit}i`}
            value={formatAmount(balance, 2)}
          />
        </div>
        <div className="flex-1">
          <StatisticCard
            title="Profit"
            unit={unit}
            value={formatAmount(profit, 2)}
          />
        </div>
      </div>
      <div className="flex gap-6 mt-6">
        <div className="flex-1">
          <StatisticCard
            title="APY (Last 7 days)"
            unit="%"
            value={formatPercent(weeklyApy)}
          />
        </div>
        <div className="flex-1">
          <StatisticCard
            title="APY (Last 30 days)"
            unit="%"
            value={formatPercent(monthlyApy)}
          />
        </div>
      </div>
      <div className={s.card}>
        <p>{unit}i variation curve</p>
        <VariationCurve />
      </div>
      <div className={s.card}>
        <p>Profit</p>
        <ProfitChart />
      </div>
    </>
  )
}

export default MyAccount
