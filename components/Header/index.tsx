'use client'

import { useEffect } from 'react'
import s from './style.module.scss'
import { getAccountAddress } from '@/util/account'
import Moonpay from '@/components/Moonpay'
import HeaderDropdown from '@/components/HeaderDropdown'
import { useAtom } from 'jotai'
import { isLoginAtom } from '@/jotai/login'

const Header = () => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)

  useEffect(() => {
    const accountAddress = getAccountAddress()
    if (accountAddress) {
      setIsLogin(true)
    }
  }, [])

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className="grow">
          <img
            src="/logo.svg"
            alt=""
          />
        </div>
        {isLogin && (
          <>
            <Moonpay />
            <HeaderDropdown />
          </>
        )}
      </div>
    </header>
  )
}

export default Header
