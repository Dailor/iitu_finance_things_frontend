import {axiosProtected} from "@/axioses/protected"
import {UsersEndpointsAPI} from "@/apiEndpoints"
import {IUser} from "@/types/user"

interface IUserRequest extends Omit<IUser, 'department'> {
}

interface IDepartmentsResponse {
    users: IUserRequest[]
}

const usersAPI = {
    list: () => axiosProtected.get<IDepartmentsResponse>(UsersEndpointsAPI.list)
}

export default usersAPI