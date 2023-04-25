import React, {useCallback, useEffect, useState} from 'react'
import Head from "next/head"
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import itemsAPI from "@/requests/items"
import {IItem} from "@/types/item"
import {Box} from "@mui/material"
import ItemAddModal from "@/components/modals/items/ItemAddModal"

const columns: GridColDef[IItem] = [
    {field: 'id', headerName: 'ID', width: 30},
    {field: 'name', headerName: 'Название', width: 300},
    {field: 'description', headerName: 'Описание', flex: 1}
]

export default function Items() {
    const [items, setItems] = useState<IItem[]>([])
    const [isFetching, toggleIsFetching] = useState<boolean>(true)

    const loadItems = useCallback(() => {
        toggleIsFetching(true)

        itemsAPI.list()
            .then(r => {
                setItems(r.data.items)
            })
            .finally(() => {
                toggleIsFetching(false)
            })
    }, [])

    useEffect(() => {
        loadItems()
    }, [loadItems])

    return (
        <>
            <Head>
                <title>IITU | Предметы</title>
            </Head>
            <main>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Предметы</h1>
                    <Box>
                        <ItemAddModal callback={loadItems}/>
                    </Box>
                </Box>
                <div style={{height: 300, width: '100%'}}>
                    <DataGrid rows={items} columns={columns} loading={isFetching}/>
                </div>
            </main>
        </>
    )
}