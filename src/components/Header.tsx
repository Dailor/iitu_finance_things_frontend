import React from 'react'
import {AppBar, Toolbar, Typography} from "@mui/material"
import {drawerWidth} from "@/components/Sidebar"
import {useRouter} from "next/router"


const Header = () => {
    const router = useRouter()

    return (
        <AppBar
            position="fixed"
            sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header