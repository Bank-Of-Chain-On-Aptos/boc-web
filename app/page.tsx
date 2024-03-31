'use client'

import { useAtomValue } from 'jotai'
import { activeTabAtom } from '@/jotai/tab'
import { isLoginAtom } from '@/jotai/login'
import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import MyAccount from '@/components/MyAccount'
import Deposit from '@/components/Deposit'
import Withdraw from '@/components/Withdraw'
import Footer from '@/components/Footer'
import s from './page.module.scss'
import Google from '@/components/icon/Google'
import { EphemeralKeyPair } from '@aptos-labs/ts-sdk'
import { storeEphemeralKeyPair } from '@/util/keypair'
import { GOOGLE_CLIENT_ID } from '@/constant'

export default function Home() {
  const isLogin = useAtomValue(isLoginAtom)
  const acriveTab = useAtomValue(activeTabAtom)

  const login = () => {
    const redirectUri = `${globalThis.location.origin}/google`

    const ephemeralKeyPair = EphemeralKeyPair.generate()
    // This saves the EphemeralKeyPair in local storage keyed, by its nonce.
    storeEphemeralKeyPair(ephemeralKeyPair)

    const { nonce } = ephemeralKeyPair
    const url = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid%20email&nonce=${nonce}`
    globalThis.location.href = url
  }

  return (
    <main className="h-full">
      <Header />
      <div className={s.main}>
        <div className={s.inner}>
          <div className="w-56">
            <Tabs />
          </div>
          {!isLogin && (
            <div className={s.login} onClick={login}>
              <Google />
              <span>Login with Google</span>
            </div>
          )}
          {isLogin && (
            <>
              {acriveTab === 0 && (
                <div className="grow">
                  <MyAccount />
                </div>
              )}
              {acriveTab !== 0 && (
                <div className={s.content}>
                  {acriveTab === 1 && <Deposit />}
                  {acriveTab === 2 && <Withdraw />}
                  {acriveTab === 3 && 'Switch to USDi'}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
