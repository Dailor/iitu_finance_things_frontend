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
    logout: { (): void }
}

interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {
    const router = useRouter()

    const [isAuthFetching, toggleIsAuthFetching] = useState<boolean>(true)
    const [isAuth, toggleIsAuth] = useState<boolean>(false)
    const [user, setUser] = useState<LocalUser | null>(null)

    const isAdmin = user?.role === UserRolesEnum.ADMIN
    const isDirector = user?.role === UserRolesEnum.DEPARTMENT_DIRECTOR

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

    const loadUser = useCallback(() => {
        const accessToken = getAccessTokenFromLocalStorage()

        const redirectToLogin = () => {
            router.push('/login')
        }

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
    }, [router])

    useEffect(() => {
        loadUser()
    }, [loadUser])

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth,
                isAdmin,
                isDirector,
                isAuthFetching,
                setAuth,
                logout}}>{children}</AuthContext.Provider>
    )
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
    return useContext(AuthContext) as AuthContextType
}
