export class AuthEndpointAPI {
    static base = '/auth'

    static refresh = this.base + '/refresh'
    static logout = this.base + '/logout'

    static me = this.base + '/me'
}

export class AdminEndpointsAPI {
    static base = '/admin'
}
