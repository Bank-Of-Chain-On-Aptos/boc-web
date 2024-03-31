import { AccountAddress, AccountAuthenticator, SimpleTransaction } from '@aptos-labs/ts-sdk'

export const getInvestmentSummary = async (accountAddress: string) => {
  if (!accountAddress) {
    return null
  }

  const resp = await fetch(`/api/getInvestmentSummary?accountAddress=${accountAddress}`, {
    method: 'GET'
  })
  const { data } = await resp.json()
  return data
}

export const getEstimatedOutputAmount = async (coinType: string, action: string, inputAmount: number) => {
  if (!coinType || !action) {
    return null
  }

  const resp = await fetch(`/api/getEstimatedOutputAmount?coinType=${coinType}&action=${action}&inputAmount=${inputAmount}`, {
    method: 'GET'
  })
  const { data } = await resp.json()
  return data
}

export const submitTxByPayer = async (txBuildData: any, senderAuthenticator: AccountAuthenticator) => {
  const body = JSON.stringify(
    {
      txBuildData,
      senderAuthenticator
    },
    (_, value) => {
      if (typeof value === 'bigint') {
        return value.toString()
      }
      if (value instanceof AccountAddress) {
        return value.toString()
      }
      return value
    }
  )

  return await fetch(`/api/submitTxByPayer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}
