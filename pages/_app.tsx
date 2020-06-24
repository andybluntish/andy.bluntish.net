import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'
import '../styles.css'

export default function FloodConsole({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}
