import {axiosProtected} from "@/axioses/protected"
import {KitsEndpointsAPI} from "@/apiEndpoints"
import {IKit} from "@/types/kit"

interface IItemsResponse {
    items: IKit[]
}

interface IKitAddRequest extends Omit<IKit, 'id'>{}

interface IKitEditRequest extends IKit {}


const kitsAPI = {
    list: () => axiosProtected.get<IItemsResponse>(KitsEndpointsAPI.list),
    add: (data: IKitAddRequest) => axiosProtected.put<IItemsResponse>(KitsEndpointsAPI.list, data)
}

export default kitsAPI