'use client'

import { parseJWTFromURL, storeJwt } from '@/util/jwt'
import { useEffect } from 'react'
import { extractJwtNonce } from '@/util/jwt'
import { getLocalEphemeralKeyPair } from '@/util/keypair'
import { getAptosInstance } from '@/util/aptos'
import { storeAccountAddress } from '@/util/account'
import Loading from '@/components/Loading'

const PageGoogle = () => {
  useEffect(() => {
    const init = async () => {
      const jwt = parseJWTFromURL(window.location.href)
      if (!jwt) {
        return
      }
      storeJwt(jwt)
      const jwtNonce = extractJwtNonce(jwt)
      if (!jwtNonce) {
        return null
      }
      const ephemeralKeyPair = getLocalEphemeralKeyPair(jwtNonce)
      if (!ephemeralKeyPair) {
        return null
      }
      const aptos = getAptosInstance()
      const resp = await aptos.deriveKeylessAccount({
        jwt,
        ephemeralKeyPair
      })
      storeAccountAddress(jwt, resp.accountAddress.toString())
      window.location.href = '/'
    }
    init()
  }, [])

  return (
    <div className="h-full flex gap-4 justify-center items-center">
      <Loading />
      <span>Login with Google ...</span>
    </div>
  )
}

export default PageGoogle
