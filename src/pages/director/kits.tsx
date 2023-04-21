import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Head from "next/head"
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid"
import {IUser} from "@/types/user"
import usersAPI from "@/requests/users"
import departmentsAPI from "@/requests/departments"
import {arrayToKeyValue} from "@/utilities/api"
import {IDepartment} from "@/types/department"
import {roleToRoleName, UserRolesEnum} from "@/constants"
import UserEditModal from "@/components/modals/users/UserEditModal"
import {Box, Button, Typography} from "@mui/material"
import KitsAddModal from "@/components/modals/kits/KitsAddModal"
import useAPILoad from "@/hooks/useAPILoad"
import kitsAPI, {IKitResponse} from "@/requests/kit"
import {IItem} from "@/types/item"

export default function Kits() {
    const [dataKitsApi, errorKitsApi, isFetchingKitsApi, loadKitsApi] = useAPILoad<IKitResponse>(kitsAPI.list())

    const isFetching = isFetchingKitsApi

    const loadData = useCallback(() => {
        return loadKitsApi()
    }, [])

    const itemsIDToValueContainer = useMemo(() => {
        return arrayToKeyValue<>(dataKitsApi.items || [])
    }, [dataKitsApi.items])

    useEffect(() => {
        loadData()
    }, [loadData])

    const columns: GridColDef[IItem] = [
        {field: 'id', headerName: 'ID', width: 30},
        {field: 'name', headerName: 'Название', width: 200},
        {field: 'description', headerName: 'Описание', width: 400},
        {
            fields: 'items', headerName: 'Предметы', width: 500,
            renderCell: ({row}) => (
                <Box sx={{paddingY: 2}}>
                    {row.items.map(item => (
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}} key={item.id}>
                            <Typography sx={{paddingRight: 5}}>{itemsIDToValueContainer[item.id]?.name}:</Typography>
                            <Typography>{item.count}</Typography>
                        </Box>
                    ))}
                </Box>
            )
        },
        {
            field: 'actions', headerName: 'Действия', width: 100,
            renderCell: ({row}) => (
                <Box>
                    <Button variant='contained' color='info'>Изменить</Button>
                </Box>
            )
        }
    ]

    return (
        <>
            <Head>
                <title>IITU | Наборы</title>
            </Head>
            <main>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Наборы</h1>
                    <Box>
                        <KitsAddModal callback={loadData}/>
                    </Box>
                </Box>
                <Box sx={{height: 300, width: '100%'}}>
                    <DataGrid
                        rows={dataKitsApi.kits || []} columns={columns}
                        loading={isFetching}
                        getRowHeight={() => 'auto'}
                    />
                </Box>
            </main>
        </>
    )
}