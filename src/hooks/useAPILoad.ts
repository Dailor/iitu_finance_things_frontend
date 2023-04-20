import React, {useCallback, useState} from 'react'
import axios from "axios"

type DataType = any
type ErrorType = any
type IsFetchingType = boolean
type LoadDataType = (...args: any) => Promise<axios.AxiosResponse<any>>


interface Props {
    apiLoad: Promise<axios.AxiosResponse<any>>
}

type HookReturn = [DataType, ErrorType, IsFetchingType, LoadDataType]

function useAPILoad({apiLoad}: Props): HookReturn {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [isFetching, toggleIsFetching] = useState<boolean>(false)

    const loadData = useCallback(() => {
        toggleIsFetching(true)

        return apiLoad
            .then(r => {
                setData(r.data)
            })
            .catch(r => {
                setError(r.response)
            })
            .finally(() => {
                toggleIsFetching(false)
            })
    }, [])

    return [data, error, isFetching, loadData]
}

export default useAPILoad