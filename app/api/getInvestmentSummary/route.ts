import { APTI_COIN_TYPE } from '@/constant'
import { getAptosInstance } from '@/util/aptos'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const accountAddress = searchParams.get('accountAddress')
  if (!accountAddress) {
    return Response.json(
      {
        success: false,
        message: 'Account address is required'
      },
      {
        status: 400
      }
    )
  }

  //   const aptos = getAptosInstance()
  //   const aptiBalance = await aptos.getAccountCoinAmount({
  //     accountAddress,
  //     APTI_COIN_TYPE
  //   })

  //   const duration = 7

  //   const yearlyApy = 0.3
  //   const profit = (aptiBalance * yearlyApy * duration) / 365
  const profit = 0.2
  const weeklyApy = 2930
  const monthlyApy = 2510

  return Response.json(
    {
      success: true,
      message: '',
      data: {
        profit,
        weeklyApy,
        monthlyApy
      }
    },
    {
      status: 200
    }
  )
}
