import React, {createContext, useContext, useEffect, useState} from 'react'
import {ACCEPT_TOKEN_KEY, REFRESH_TOKEN_KEY, UserRolesEnum} from "@/constants";
import {loadUserMeRequestApi} from "@/providers/AuthProvider.api";
import {getAccessTokenFromLocalStorage, ISetAuth, removeJwtTokens, setJwtTokens} from "@/utilities/jwt";
import {useRouter} from "next/router";

export interface LocalUser {
    fullName: string,
    role: number
}

interface AuthContextType {
    user: LocalUser | null,
    isAuthFetching: boolean,
    isAuth: boolean,
    isAdmin: boolean,
    setAuth: ISetAuth,
    logout: { (): void }
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext) as AuthContextType;
}


interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {
    const router = useRouter()

    const [isAuthFetching, toggleIsAuthFetching] = useState<boolean>(true)
    const [isAuth, toggleIsAuth] = useState<boolean>(false)
    const [user, setUser] = useState<LocalUser | null>(null)

    const setAuth: ISetAuth = (accessToken, refreshToken) => {
        setJwtTokens(accessToken, refreshToken)
        loadUser()

        router.push('/')
    }

    const logout = () => {
        removeJwtTokens()
        setUser(null)
        toggleIsAuth(false)
        router.push('/')
    }

    const redirectToLogin = () => {
        router.push('/login')
    }

    const loadUser = () => {
        const accessToken = getAccessTokenFromLocalStorage()

        if (accessToken) {
            toggleIsAuth(true)

            loadUserMeRequestApi()
                .then(r => {
                    setUser(r.data)
                })
                .catch(() => {
                    toggleIsAuth(false)
                    redirectToLogin()
                })
                .finally(() => {
                    toggleIsAuthFetching(false)
                })
        } else {
            toggleIsAuthFetching(false)
            redirectToLogin()
        }
    }

    const isAdmin = user?.role === UserRolesEnum.ADMIN

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthFetching,
                user,
                isAuth,
                isAdmin,
                setAuth,
                logout
            }}>{children}</AuthContext.Provider>
    )
}
