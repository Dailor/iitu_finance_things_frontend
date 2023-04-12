import {axiosProtected} from "@/axioses/protected"
import {DepartmentsEndpointsAPI} from "@/apiEndpoints"
import {IDepartment} from "@/types/department"

interface IItemsResponse {
    items: IDepartment[]
}

interface IDepartmentAddRequest extends Omit<IDepartment, 'id'>{}

interface IDepartmentEditRequest extends IDepartment {}


const itemsAPI = {
    list: () => axiosProtected.get<IItemsResponse>(DepartmentsEndpointsAPI.list),
    add: (data: IDepartmentEditRequest) => axiosProtected.put<IItemsResponse>(DepartmentsEndpointsAPI.list, data)
}

export default itemsAPI