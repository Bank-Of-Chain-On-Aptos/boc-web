'use client'

import './globals.css'
import JotaiProvider from '@/jotai/provider'
import { ConfigProvider, theme } from 'antd'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>BoC</title>
        {/* <script src="https://accounts.google.com/gsi/client" async></script> */}
      </head>
      <body>
        {/* <div id="g_id_onload"
            data-client_id="590833424662-92f4gj4n202797vgq8tff0uilt9kk1hn.apps.googleusercontent.com"
            data-context="signin"
            data-login_uri="http://localhost:3000/google"
            data-auto_select="true"
            data-itp_support="true">
        </div> */}

        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm
          }}
        >
          <JotaiProvider>{children}</JotaiProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}
