import { Aptos, Network } from '@aptos-labs/ts-sdk'

let aptos: any = null

export const getAptosInstance = () => {
  if (aptos) {
    return aptos
  }
  aptos = new Aptos({ network: process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() })
  return aptos
}
