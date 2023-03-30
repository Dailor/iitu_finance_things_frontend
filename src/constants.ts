export const BASE_URL = 'http://localhost:8000/api'

export const ACCEPT_TOKEN_KEY = 'access-token'
export const REFRESH_TOKEN_KEY = 'refresh-token'

export enum UserRolesEnum {
    ADMIN,
    FINANCE=1,
    DEPARTMENT_DIRECTOR=2
}

export const roleToRoleName = {
    [UserRolesEnum.ADMIN]: 'Админ',
    [UserRolesEnum.FINANCE]: 'Финансист',
    [UserRolesEnum.DEPARTMENT_DIRECTOR]: 'Директор Департамента'
}

export const rolesToEnum = Object.keys(roleToRoleName).map((k) => [k, roleToRoleName[k as unknown as UserRolesEnum]])
