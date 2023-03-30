import React from 'react'

import Head from 'next/head'
import {Box, Button, Typography} from "@mui/material"
import {FaMicrosoft} from "react-icons/fa"

export default function Login() {
    return (
        <>
            <Head>
                <title>Вход</title>
            </Head>
            <Box sx={{
                height: '100vh'
            }}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: 2, paddingY: 3}} border={1}>
                    <Typography variant='h4'>IITU</Typography>
                    <Typography variant='h5'>Войти</Typography>
                    <Box>
                        <Button startIcon={<FaMicrosoft/>} variant='outlined' size="large" color='secondary'>Microsoft</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
