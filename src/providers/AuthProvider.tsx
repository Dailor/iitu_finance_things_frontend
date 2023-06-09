import React, {createContext, useCallback, useContext, useEffect, useReducer, useState} from 'react'
import {UserRolesEnum} from "@/constants"
import {loadUserMeRequestApi} from "@/providers/AuthProvider.api"
import {getAccessTokenFromLocalStorage, ISetAuth, removeJwtTokens, setJwtTokens} from "@/utilities/jwt"
import {useRouter} from "next/router"

interface IAuthState {
    user: LocalUser | null
    isAuthFetching: boolean
    isAuth: boolean
}

export interface LocalUser {
    fullName: string,
    role: number
}

interface AuthContextType extends IAuthState {
    isAdmin: boolean,
    setAuth: ISetAuth,
    redirectToLogin: {(): Promise<any>}
    logout: { (): void }
}

interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {
    const router = useRouter()

    const [isAuthFetching, toggleIsAuthFetching] = useState<boolean>(true)
    const [user, setUser] = useState<LocalUser | null>(null)

    const isAdmin = user?.role === UserRolesEnum.ADMIN
    const isDirector = user?.role === UserRolesEnum.DEPARTMENT_DIRECTOR

    const redirectToLogin = useCallback(() => {
        return router.push('/login')
    }, [router])

    const loadUser = useCallback(() => {
        const accessToken = getAccessTokenFromLocalStorage()

        if (accessToken) {
            loadUserMeRequestApi()
                .then(r => {
                    setUser(r.data)
                })
                .catch(() => {

                })
                .finally(() => {
                    toggleIsAuthFetching(false)
                })
        } else {
            toggleIsAuthFetching(false)
        }
    }, [])

    const setAuth: ISetAuth = (accessToken, refreshToken) => {
        setJwtTokens(accessToken, refreshToken)
        loadUser()

        router.push('/')
    }

    const logout = useCallback(() => {
        removeJwtTokens()
        setUser(null)
    }, [])

    useEffect(() => {
        loadUser()
    }, [loadUser])

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth: !!user,
                isAdmin,
                isDirector,
                isAuthFetching,
                setAuth,
                redirectToLogin,
                logout
            }}>{children}</AuthContext.Provider>
    )
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
    return useContext(AuthContext) as AuthContextType
}
