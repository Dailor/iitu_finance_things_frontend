import axios, {AxiosError} from "axios"
import {BASE_URL} from "@/constants"
import {getAccessToken} from "@/axioses/refresh.api"
import {AuthContext, useAuth} from "@/providers/AuthProvider"
import {AuthEndpointAPI} from "@/apiEndpoints"
import {removeJwtTokens} from "@/utilities/jwt"

const forceLogout = () => {
    removeJwtTokens()
    window.location.replace('/')
}

export const axiosProtected = axios.create({
    baseURL: BASE_URL
})

axiosProtected.interceptors.request.use(
    async (config) => {
        const accessToken = await getAccessToken()

        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            }
        }

        return config
    },
    (error) => Promise.reject(error)
)

axiosProtected.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const isLogIn = !!getAccessToken()

        if ((error.response?.status === 401) && isLogIn && error.request.url !== AuthEndpointAPI.logout) {
            forceLogout()
        }

        throw error
    }
)