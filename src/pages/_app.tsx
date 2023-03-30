import React from 'react'


import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {AuthProvider} from "@/providers/AuthProvider"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {themeOptions} from "@/theme"

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <ThemeProvider theme={themeOptions}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProvider>
    )
}
