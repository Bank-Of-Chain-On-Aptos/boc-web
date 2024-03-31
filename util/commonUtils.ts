export const shortenAddress = (address: string, leftEnd = 6, rightStart = 4) => {
  let displayAddress = address.substring(0, leftEnd)
  return (displayAddress += '...' + address.substring(address.length - rightStart))
}

export const formatAmount = (amount: number, decimalPlaces: number) => {
  if (!amount) {
    return 0
  }
  return amount.toFixed(decimalPlaces)
}

export const formatPercent = (rate: number) => {
  return (rate / 100).toFixed(2)
}
