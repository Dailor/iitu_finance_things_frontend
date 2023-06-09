import React, {useEffect} from 'react'

import {css} from '@emotion/react'

import Head from 'next/head'
import {Box, Button, Grid, Typography} from "@mui/material"
import {FaMicrosoft} from "react-icons/fa"
import Image from "next/image"

import logo from '/public/logo.png'
import {OPENID_AUTH_URL} from "@/apiEndpoints"
import {LoginForm} from "@/components/forms/LoginForm"

export default function Login() {
    const redirectMicrosoftOAuth = () => {
        window.location.replace(OPENID_AUTH_URL)
    }

    return (
        <>
            <Head>
                <title>Вход</title>
            </Head>
            <Grid container sx={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Grid item xs={10} md={4} sx={{
                    overflow: 'hidden',
                    paddingBottom: 4,
                    borderRadius: 3,
                    boxShadow: 2,
                    backgroundColor: '#fff',
                    textAlign: 'center'
                }}>
                    <Box sx={{marginBottom: 1, paddingY: 2, backgroundColor: '#b1040e'}}>
                        <Image src={logo} alt="IITU Logo" width={211} height={32}/>
                    </Box>
                    <Box sx={{paddingX: 4}}>
                        <Typography variant='h4' sx={{fontWeight: 600, marginBottom: 3}}>
                            University Purchase Network
                        </Typography>
                        <LoginForm/>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            marginY: 2,
                            ':before, :after': {
                                content: "''",
                                display: 'inline-block',
                                borderTop: '0.1rem solid rgb(227, 229, 231)',
                                flexGrow: 1
                            }}}>
                            <Typography color='gray' variant='h6'>
                                Или
                            </Typography>
                        </Box>
                        <Box>
                            <Button fullWidth sx={{fontWeight: 600, paddingY: 1}}
                                    size="large" color='primary' variant='outlined'
                                    startIcon={<FaMicrosoft/>}
                                    onClick={redirectMicrosoftOAuth}>
                                    Войти с помощью Microsoft
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
