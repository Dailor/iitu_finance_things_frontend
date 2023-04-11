import React from 'react'
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar
} from "@mui/material"

import ExitToAppIcon from '@mui/icons-material/ExitToApp'

import {useAuth} from "@/providers/AuthProvider"

import Image from "next/image"
import {useRouter} from "next/router"

import {adminLinks, directorLinks} from '@/links'
import logo from '/public/logo.png'

export const drawerWidth = 260

interface SidebarLinksProps {
    heading: string
    prefix?: string
    links: Links
}

const SidebarLinks = ({prefix, heading, links}: SidebarLinksProps) => {
    const router = useRouter()

    const processPath = (path) => {
        return (prefix || '') + path
    }

    const onClick = (link) => {
        router.push(link)
    }

    return (
        <>
            <Divider/>
            <List
                subheader={
                    <ListSubheader component="div">
                        {heading}
                    </ListSubheader>
                }
            >
                {links.map((link, index) => {
                    const processedLink = processPath(link.to)

                    return <ListItem key={index} selected={router.pathname == processedLink} disablePadding>
                        <ListItemButton onClick={() => onClick(processedLink)}>
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText primary={link.title}/>
                        </ListItemButton>
                    </ListItem>
                })}
            </List>
        </>
    )
}

const LogoutButton = () => {
    const {logout} = useAuth()

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={logout}>
                <ListItemIcon>
                    <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText primary='Выйти'/>
            </ListItemButton>
        </ListItem>
    )
}

const Sidebar = () => {
    const {isAdmin, isDirector} = useAuth()

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"

        >
            <Toolbar sx={(theme) => (
                {
                    'backgroundColor': theme.palette.primary.main
                }
            )}>
                <Image src={logo} alt="IITU Logo" width={211} height={32}/>
            </Toolbar>
            {isAdmin && (
                <SidebarLinks {...adminLinks}/>
            )}
            {isDirector && (
                <SidebarLinks {...directorLinks}/>
            )}
            <LogoutButton/>
        </Drawer>
    )
}

export default Sidebar