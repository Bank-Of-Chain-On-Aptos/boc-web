import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { activeTabAtom } from '@/jotai/tab'
import s from './style.module.scss'
import { UserIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import useCurrentVault from '@/hook/useCurrentVault'

const options = [
  {
    name: 'My Account',
    icon: <UserIcon className="w-6 h-6" />
  },
  {
    name: 'Deposit',
    icon: <ArrowDownTrayIcon className="w-6 h-6" />
  },
  {
    name: 'Withdraw',
    icon: <ArrowUpTrayIcon className="w-6 h-6" />
  }
]

export default function Tabs() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const router = useRouter()
  const isUsdi = useCurrentVault()

  const switchVault = () => {
    if (!isUsdi) {
      router.push('/?vault=usdi')
    } else {
      router.push('/')
    }
  }

  return (
    <>
      <Tab.Group
        vertical
        selectedIndex={activeTab}
        onChange={setActiveTab}
      >
        <Tab.List className="flex flex-col gap-2">
          {options.map((item) => (
            <Tab
              key={item.name}
              className={({ selected }: { selected: boolean }) => clsx(s.tab, selected ? s.active : '')}
            >
              {item.icon}
              {item.name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <button
        className={clsx(s.tab, 'w-full', 'mt-2')}
        onClick={switchVault}
      >
        <ArrowsRightLeftIcon className="w-6 h-6" />
        <span>Switch to {isUsdi ? 'APTi' : 'USDi'}</span>
      </button>
    </>
  )
}
