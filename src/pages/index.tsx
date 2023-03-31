import Head from 'next/head'
import {useEffect} from "react"
import {useAuth} from "@/providers/AuthProvider"

export default function Home() {
    return (
        <>
            <Head>
                <title>Главная</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
            </main>
        </>
    )
}
