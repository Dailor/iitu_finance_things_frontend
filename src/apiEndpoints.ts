import {BACKEND_URL, MICROSOFT_TENANT} from "@/constants"
import {getUrlByPathAndParams} from "@/utilities/uri"

export const OPENID_AUTH_URL = getUrlByPathAndParams(
    `https://login.microsoftonline.com/${MICROSOFT_TENANT}/oauth2/v2.0/authorize`,
    {
        client_id: '33d941b8-c152-4ec7-b276-656f8db0811d',
        redirect_uri: `${BACKEND_URL}/microsoft/callback/`,
        response_type: 'code',
        response_mode: 'query',
        scope: 'openid email offline_access',
    }
)

export class BaseEndpointAPI {
    static preBase = '/api'
    static base

    protected static getEndpoint(path){
        return this.preBase + this.base + path
    }
}

export class AuthEndpointAPI extends BaseEndpointAPI{
    static base = '/v1/auth'

    static login = this.getEndpoint('/login')
    static refresh = this.getEndpoint('/refresh')
    static logout = this.getEndpoint('/logout')

    static me = this.getEndpoint('/me')
}

export class AdminEndpointsAPI extends BaseEndpointAPI{
    static base = this.getEndpoint('/admin')
}
