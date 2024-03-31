import { getAccountAddress, storeAccountAddress } from '@/util/account'
import { getAptosInstance } from '@/util/aptos'
import { extractJwtNonce, getJwt } from '@/util/jwt'
import { getLocalEphemeralKeyPair } from '@/util/keypair'
import { KeylessAccount, MoveStructId } from '@aptos-labs/ts-sdk'
import { useEffect, useState } from 'react'

// 获取KeylessAccount信息
export const useMyAccount = () => {
  const [account, setAccount] = useState<KeylessAccount | null>(null)
  // 2. fetch keyless account
  useEffect(() => {
    const fetchAccount = async () => {
      // 1. get emphemeralKeyPair and jwt from local storage
      const jwt = getJwt()
      if (!jwt) {
        return
      }
      const jwtNonce = extractJwtNonce(jwt)
      if (!jwtNonce) {
        return
      }
      const ephemeralKeyPair = getLocalEphemeralKeyPair(jwtNonce)
      if (!ephemeralKeyPair) {
        return
      }
      const aptos = getAptosInstance()
      const resp = await aptos.deriveKeylessAccount({
        jwt,
        ephemeralKeyPair
      })
      storeAccountAddress(jwt, resp.accountAddress.toString())
      setAccount(resp)
    }
    fetchAccount()
  }, [])

  return {
    account
  }
}

// 签名

// 读合约
export const useMyCoinBalance = (coinType: MoveStructId, coinDeciamls: number) => {
  const accountAddress = getAccountAddress()
  if (!accountAddress) {
    return { balance: 0, loading: false }
  }

  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchAccountCoinAmount = async () => {
    setLoading(false)
    const aptos = getAptosInstance()
    const amount = await aptos.getAccountCoinAmount({
      accountAddress: accountAddress,
      coinType: coinType
    })
    setBalance(amount / coinDeciamls)
    setLoading(true)
  }

  useEffect(() => {
    fetchAccountCoinAmount()
  }, [])

  return { balance, loading, fetchAccountCoinAmount }
}

// 写合约
