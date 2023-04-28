import React, {useCallback} from 'react'
import {Button} from "@mui/material"

import {PropsCallback} from "@/types/componentsWithCallback"
import kitsAPI from "@/requests/kit"

import KitModal from "@/components/modals/kits/KitModal"


interface IItemCounter {
    id: number
    count: number
}

interface Props extends PropsCallback {
}

const KitAddModal = ({callback}: Props) => {
    const entityContainerHeight = 300

    const triggerButton = useCallback((onClick) => {
        return <Button variant='contained' color='primary' onClick={onClick}>Добавить</Button>
    }, [])

    return (
        <KitModal apiRequestFunc={kitsAPI.add}
                  triggerButton={triggerButton}/>
    )
}

export default KitAddModal