export const GOOGLE_CLIENT_ID = '590833424662-92f4gj4n202797vgq8tff0uilt9kk1hn.apps.googleusercontent.com'
export const MOONPAY_API_KEY = 'pk_test_hDSTS8RxomtxaNlLcwF2GfblC8INmQGg'
export const MOONPAY_URL = 'https://buy.moonpay.com/?theme=dark&apiKey=pk_live_R5Lf25uBfNZyKwccAZpzcxuL3ZdJ3Hc&defaultCurrencyCode=apt'
// export const MOONPAY_URL = 'https://buy-sandbox.moonpay.com/?apiKey=pk_test_oxQY1qdAGKlItZrVIRQ9qpNwpfAPHjQ&theme=dark&baseCurrencyCode=usd&baseCurrencyAmount=100&defaultCurrencyCode=eth&colorCode=%237d01ff&mpSdk=%7B%22version%22%3A%221.8.0%22%2C%22environment%22%3A%22sandbox%22%2C%22flow%22%3A%22buy%22%2C%22variant%22%3A%22newTab%22%2C%22platform%22%3A%22web%22%7D'
export const APT_COIN_TYPE = '0x1::aptos_coin::AptosCoin'
export const APT_COIN_DECIMALS = 10**8
export const APT_VAULT_ADDRESS = '0x190d2168b5a2a0ffa0753c73fd9304f3137df1d49a761dac235813dc3a82d6e3'
export const APT_VAULT_NAME = 'boc'
export const APTI_COIN_DECIMALS = 10**8
export const APTI_COIN_TYPE = `${APT_VAULT_ADDRESS}::vault_coin::VaultCoin<0x1::aptos_coin::AptosCoin>`
export const USDC_COIN_TYPE = '0xf4d63e36e937e17512adc3b4eb3be37f20e4d680c7d5bb75fb593ac54ab2ff99::devnet_coins::DevnetUSDC'

export const ACTION = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
}
