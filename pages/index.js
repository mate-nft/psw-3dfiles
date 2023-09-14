import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from './components/Header'
import Main from './components/Main'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [accounts,setAccounts] = useState([]);

  return (
    <>
    <Header accounts={accounts} setAccounts={setAccounts}/>
    <Main accounts={accounts} setAccounts={setAccounts}/>
    <div className={styles.background}></div>
    </>
  )
}
