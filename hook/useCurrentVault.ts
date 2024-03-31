import { useSearchParams } from 'next/navigation'

const useCurrentVault = () => {
  const searchParams = useSearchParams()
  const vault = searchParams.get('vault')
  const isUsdi = vault === 'usdi'
  return isUsdi
}

export default useCurrentVault
