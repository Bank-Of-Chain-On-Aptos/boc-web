import AmountInput from '@/components/AmountInput'
import Button from '@/components/Button'
import s from './style.module.scss'
import { useMyCoinBalance, useMyAccount } from '@/hook/useAccount'
import { useEffect, useState } from 'react'
import { APTI_COIN_DECIMALS, APT_COIN_TYPE, APTI_COIN_TYPE, APT_VAULT_ADDRESS, APT_VAULT_NAME, ACTION, APT_COIN_DECIMALS } from '@/constant'
import { getAptosInstance } from '@/util/aptos'
import { Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk'
import { getEstimatedOutputAmount } from '@/service/bocApi'
import { notification } from 'antd'
import { IconType } from 'antd/es/notification/interface'
import useCurrentVault from '@/hook/useCurrentVault'

const Deposit = (props: any) => {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (description: string, type: IconType) => {
    api.open({
      message: 'Transaction Status Information',
      type,
      description
    })
  }
  const isUsdi = useCurrentVault()
  const tokenName = isUsdi ? 'USDC' : 'APT'

  const decimals = APTI_COIN_DECIMALS
  const minAmount = 1 / decimals

  const fromCoinFetcher = useMyCoinBalance(APTI_COIN_TYPE, APTI_COIN_DECIMALS)
  const toCoinFetcher = useMyCoinBalance(APT_COIN_TYPE, APT_COIN_DECIMALS)
  const { account } = useMyAccount()

  const [inputAmount, setInputAmount] = useState<any>('')
  const [outputAmount, setOutputAmount] = useState<any>('-')

  const handleInputChange = (event: any) => {
    setInputAmount(event.target.value)
  }

  const withdraw = async () => {
    // check input amount
    if (!inputAmount || inputAmount <= minAmount) {
      return
    }
    // calculate withdraw amount
    const withdrawAmount = inputAmount * decimals
    console.log('withdrawAmount=', withdrawAmount)

    // check account
    if (!account) {
      console.log('Empty account info')
      return
    }

    openNotification('We are building your deposit transaction!', 'info')

    // build a transaction
    const aptos = getAptosInstance()

    const feePayerPk = process.env.NEXT_PUBLIC_FEE_PAYER_PRIVATE_KEY
    const transaction = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      withFeePayer: !!feePayerPk,
      data: {
        function: `${APT_VAULT_ADDRESS}::${APT_VAULT_NAME}::withdraw`,
        typeArguments: [APT_COIN_TYPE],
        functionArguments: [withdrawAmount.toFixed()]
      }
    })

    // using sign and submit separately
    const senderAuthenticator = aptos.transaction.sign({
      signer: account,
      transaction
    })
    console.log('senderAuthenticator=', senderAuthenticator)

    // submit transaction
    let committedTransaction
    if (!feePayerPk) {
      committedTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator
      })
      console.log('No fee payer committedTransaction=', committedTransaction)
    } else {
      const feePayerAccount = Account.fromPrivateKey({
        privateKey: new Ed25519PrivateKey(feePayerPk)
      })
      const feePayerSignerAuthenticator = aptos.transaction.signAsFeePayer({
        signer: feePayerAccount,
        transaction
      })
      committedTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator,
        feePayerAuthenticator: feePayerSignerAuthenticator
      })
      console.log('Fee payer committedTransaction=', committedTransaction)
      openNotification('Congradulation! Your transaction has been submitted', 'success')

      setInputAmount(0)
      setOutputAmount(0)
      if (fromCoinFetcher.fetchAccountCoinAmount) {
        await fromCoinFetcher.fetchAccountCoinAmount()
      }
      if (toCoinFetcher.fetchAccountCoinAmount) {
        await toCoinFetcher.fetchAccountCoinAmount()
      }
    }
  }

  const handleMaxClick = () => {
    if (!fromCoinFetcher.balance) {
      return
    }
    setInputAmount(fromCoinFetcher.balance)
  }

  useEffect(() => {
    const fetchOutputAmount = async () => {
      if (!inputAmount) {
        return
      }
      const { estimatedOutputAmount } = await getEstimatedOutputAmount(APTI_COIN_TYPE, ACTION.WITHDRAW, inputAmount)
      setOutputAmount(estimatedOutputAmount)
    }
    fetchOutputAmount()
  }, [inputAmount])

  return (
    <>
      {contextHolder}
      <div className={s.top}>
        <p>From</p>
        <div className={s.row}>
          <div className={s.token}>
            <img
              className={s.tokenImg}
              src={`/token/${tokenName}.png`}
              alt=""
            />
            <span>{isUsdi ? 'USD' : 'APT'}i</span>
          </div>
          <AmountInput
            value={inputAmount}
            onChange={handleInputChange}
            onMaxClick={handleMaxClick}
          />
        </div>
        <p className="mt-2">Balance: {fromCoinFetcher.balance}</p>
      </div>
      <div className={s.bottom}>
        <p>To</p>
        <div className={s.row}>
          <span className="grow">{tokenName}</span>
          <span>{outputAmount}</span>
        </div>
        <p className="mt-2">Balance: {toCoinFetcher.balance}</p>
      </div>
      <Button
        type="primary"
        className={s.depositBtn}
        onClick={withdraw}
      >
        Withdraw
      </Button>
    </>
  )
}

export default Deposit
