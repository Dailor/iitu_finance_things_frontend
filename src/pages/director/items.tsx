import React, {useCallback, useState} from 'react'
import Head from "next/head"
import {DataGrid} from "@mui/x-data-grid"


const columns = []


const Items = () => {
    const [items, setItems] = useState([])
    const [isFetching, toggleIsFetching] = useState(false)

    const loadItems = useCallback(() => {

    }, [])

    return (
        <>
            <Head>
                <title>IITU | Предметы</title>
            </Head>
            <main>
                <h1>Пользователи</h1>
                <div style={{height: 300, width: '100%'}}>
                    <DataGrid rows={items} columns={columns} loading={isFetching}/>
                </div>
            </main>
        </>
    )
}