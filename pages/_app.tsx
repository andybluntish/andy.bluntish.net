import React from 'react'
import { AppProps } from 'next/app'
import '../styles.css'

export default function FloodConsole({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}