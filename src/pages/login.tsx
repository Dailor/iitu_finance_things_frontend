import React, {useEffect} from 'react'

import {css} from '@emotion/react'

import Head from 'next/head'
import {Box, Button, Grid, Typography} from "@mui/material"
import {FaMicrosoft} from "react-icons/fa"
import Image from "next/image"

import logo from '/public/logo.png'
import {OPENID_AUTH_URL} from "@/apiEndpoints"

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
                    <Box sx={{paddingX: 2}}>
                        <Typography variant='h4' sx={{fontWeight: 600, marginBottom: 3}}>
                            University Purchase Network
                        </Typography>
                        <Box>
                            <Button sx={{fontWeight: 600}} startIcon={<FaMicrosoft/>} variant='outlined' size="large"
                                    color='primary' onClick={redirectMicrosoftOAuth}>Войти с помощью Microsoft</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
