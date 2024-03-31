'use client'

import { useState } from 'react'
import { MoonPayProvider, MoonPayBuyWidget } from '@moonpay/moonpay-react'
import Button from '@/components/Button'
import { CurrencyDollarIcon } from '@heroicons/react/16/solid'
import { MOONPAY_URL } from '@/constant'

const Moonpay = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    // setVisible(!visible)
    window.open(MOONPAY_URL)
  }

  return (
    <MoonPayProvider
      apiKey="pk_test_oxQY1qdAGKlItZrVIRQ9qpNwpfAPHjQ"
      environment="sandbox"
      debug
    >
      <Button
        type="colorful"
        className="mr-4"
        onClick={toggleVisible}
      >
        <CurrencyDollarIcon className="w-4 h-4 inline-block" />
        <span>On ramp</span>
      </Button>
      <MoonPayBuyWidget
        variant="overlay"
        baseCurrencyCode="usd"
        baseCurrencyAmount="100"
        defaultCurrencyCode="eth"
        visible={visible}
      />
    </MoonPayProvider>
  )
}

export default Moonpay
