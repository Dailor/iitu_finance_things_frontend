import React, {useEffect, useState} from 'react'
import {AppProps} from "next/app"
import {useRouter} from "next/router"
import {useAuth} from "@/providers/AuthProvider"
import {Box, CircularProgress, Toolbar} from "@mui/material"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header";


const DefaultLayout = ({Component, pageProps}: AppProps) => {
    const router = useRouter()
    const component = <Component {...pageProps} />

    const {isAuthFetching, isAuth, isAdmin, isDirector} = useAuth()

    const [isShowLoader, toggleIsShowLoader] = useState(true)

    useEffect(() => {
        if (isAuth && !isAuthFetching) {
            let isAllowed = true

            if (router.pathname.startsWith("/admin") && !isAdmin) {
                isAllowed = false
            }
            else if (router.pathname.startsWith("/director") && !isDirector) {
                isAllowed = false
            }

            debugger

            if (router.pathname.startsWith('/login') || !isAllowed) {
                router.push('/')
            }
        }
    }, [isAuth, isAuthFetching, isAdmin, isDirector, router])

    useEffect(() => {
        if (isAuthFetching) {
            setTimeout(() => {
                toggleIsShowLoader(false)
            }, 2000)
        }
    }, [isAuthFetching, isShowLoader])

    if (isShowLoader) {
        return (
            <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress size={75}/>
            </Box>
        )
    }

    if (router.pathname == '/login') {
        return component
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'start', height: '100vh'}}>
            <Header/>
            <Sidebar/>
            <Box
                component="main"
                sx={{flexGrow: 1, px: 3,}}
            >
                <Toolbar/>
                {component}
            </Box>
        </Box>
    )
}

export default DefaultLayout