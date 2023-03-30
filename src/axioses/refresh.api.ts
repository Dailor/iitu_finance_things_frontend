import {
    getAccessTokenFromLocalStorage,
    getRefreshTokenFromLocalStorage,
    isTokenExpired,
    setJwtTokens
} from "@/utilities/jwt"
import axios, {AxiosPromise} from "axios"
import {AuthEndpointAPI} from "@/apiEndpoints"
import {IRefreshResponse} from "@/types/auth"


let refreshTokenRequest: AxiosPromise<IRefreshResponse> | null = null

const refreshTokens = (refreshToken: string) => {
    return axios.post(AuthEndpointAPI.refresh, {refreshToken})
}

export const getAccessToken =
    async () => {
        try {
            const accessToken = getAccessTokenFromLocalStorage()

            if (!accessToken || isTokenExpired(accessToken)) {
                if (refreshTokenRequest === null) {
                    const refreshToken = getRefreshTokenFromLocalStorage()

                    if (refreshToken) {
                        refreshTokenRequest = refreshTokens(refreshToken)
                    }
                }

                const res = await refreshTokenRequest
                refreshTokenRequest = null

                if (res) {
                    const {accessToken, refreshToken} = res.data

                    setJwtTokens(accessToken, refreshToken)

                    return res.data.accessToken
                }

                return null
            }

            return accessToken
        } catch (e) {
            console.error(e)

            return null
        }
    }