import {axiosProtected} from "@/axioses/protected"
import {KitsEndpointsAPI} from "@/apiEndpoints"
import {IKit} from "@/types/kit"
import {IItem} from "@/types/item"

export interface IKitResponse {
    kits: IKit[]
    items: IItem[]
}

interface IKitAddRequest extends Omit<IKit, 'id'>{}

interface IKitEditRequest extends IKit {}


const kitsAPI = {
    list: () => axiosProtected.get<IKitResponse>(KitsEndpointsAPI.list),
    add: (data: IKitAddRequest) => axiosProtected.put(KitsEndpointsAPI.list, data)
}

export default kitsAPI