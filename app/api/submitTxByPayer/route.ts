import { getAptosInstance } from '@/util/aptos'
import { Account, AccountAddress, Ed25519PrivateKey } from '@aptos-labs/ts-sdk'

export async function POST(request: Request) {
  // check args
  const res = await request.json()
  if (!res) {
    return Response.json(
      {
        success: false,
        message: 'Request body is required'
      },
      {
        status: 400
      }
    )
  }
  const txBuildData = res['txBuildData']
  if (!txBuildData) {
    return Response.json(
      {
        success: false,
        message: 'txBuildData is required'
      },
      {
        status: 400
      }
    )
  }
  const senderAuthenticator = res['senderAuthenticator']
  if (!senderAuthenticator) {
    return Response.json(
      {
        success: false,
        message: 'Sender authenticator is required'
      },
      {
        status: 400
      }
    )
  }

  // get fee payer account
  const feePayerPk = process.env.FEE_PAYER_PRIVATE_KEY
  if (!feePayerPk) {
    console.error('Fee payer has not been set')
    return Response.json(
      {
        success: false,
        message: 'Internal Server Error!'
      },
      {
        status: 500
      }
    )
  }
  const privateKey = new Ed25519PrivateKey(feePayerPk)
  const feePayerAccount = Account.fromPrivateKey({
    privateKey
  })

  // build transaction
  const aptos = getAptosInstance()

  const transaction = await aptos.transaction.build.simple({
    sender: AccountAddress.fromString(txBuildData['sender']),
    withFeePayer: true,
    data: txBuildData['data']
  })

  // sign
  const feePayerSignerAuthenticator = aptos.transaction.signAsFeePayer({
    signer: feePayerAccount,
    transaction
  })

  // submit transaction
  try {
    const committedTx = await aptos.transaction.submit.simple({
      transaction,
      senderAuthenticator,
      feePayerAuthenticator: feePayerSignerAuthenticator
    })
    console.log(`Submit successfully, tx hash: ${committedTx.hash}`)
  } catch (error) {
    console.error('Unkown submission error: ', error)
    return Response.json(
      {
        success: false,
        message: 'Internal Server Error!'
      },
      {
        status: 500
      }
    )
  }

  return Response.json(
    {
      success: true,
      message: '',
      data: {}
    },
    {
      status: 200
    }
  )
}
