import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Button from '@/components/Button'
import { getAccountAddress, removeAccountAddress } from '@/util/account'
import { shortenAddress } from '@/util/commonUtils'
import { RssIcon, ClipboardIcon, PaperAirplaneIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import copy from 'copy-to-clipboard'
import { notification, Modal, Form, Input, Select } from 'antd'
import { extractJwtNonce, getJwt, removeJwt } from '@/util/jwt'
import { removeEphemeralKeyPair } from '@/util/keypair'
import { useSetAtom } from 'jotai'
import { isLoginAtom } from '@/jotai/login'

const network = process.env.NEXT_PUBLIC_NETWORK

export default function HeaderDropdown() {
  const [accountAddress, setAccountAddress] = useState<any>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const setIsLogin = useSetAtom(isLoginAtom)

  const copyAccountAddress = () => {
    copy(accountAddress)
    api.open({
      message: 'Copied',
      type: 'success',
      duration: 1
    })
  }

  const logout = () => {
    const jwt = getJwt()
    if (jwt) {
      removeAccountAddress(jwt)
      const jwtNonce = extractJwtNonce(jwt)
      if (jwtNonce) {
        removeEphemeralKeyPair(jwtNonce)
      }
      removeJwt()
    }
    setAccountAddress('')
    setIsLogin(false)
  }

  useEffect(() => {
    const accountAddress = getAccountAddress()
    if (accountAddress) {
      setAccountAddress(accountAddress)
      setIsLogin(true)
    }
  }, [])

  return (
    <>
      {contextHolder}
      <Menu
        as="div"
        className="relative text-left"
      >
        <div>
          <Menu.Button>
            <Button type="colorful">{shortenAddress(accountAddress)}</Button>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-black shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active ? 'bg-violet-500' : ''} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                    <RssIcon className="w-4 h-4 mr-2" />
                    Network: {network}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={copyAccountAddress}
                    className={`${active ? 'bg-violet-500' : ''} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <ClipboardIcon className="w-4 h-4 mr-2" />
                    Copy Address
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`${active ? 'bg-violet-500' : ''} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    Send
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${active ? 'bg-violet-500' : ''} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <Modal
        centered
        title=""
        width={400}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          name="basic"
          layout="vertical"
        >
          <Form.Item
            label="Address"
            name="username"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Token"
            name="username"
          >
            <Select
              size="large"
              defaultValue="apt"
              options={[{ value: 'apt', label: 'APT' }]}
            />
          </Form.Item>
          <Form.Item label="Amount">
            <Input size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
