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
import {Box} from "@mui/material"
import ItemAddModal from "@/components/modals/items/ItemAddModal"
import KitsAddModal from "@/components/modals/kits/KitsAddModal"
import itemsAPI from "@/requests/items"
import useAPILoad from "@/hooks/useAPILoad"
import kitsAPI from "@/requests/kit";

const columns = [
    {field: 'id', headerName: 'ID', width: 30},
    {field: 'name', headerName: 'Название', width: 300},
    {field: 'description', headerName: 'Описание', flex: 1}
]

export default function Kits() {
    const [dataKitsApi, errorKitsApi, isFetchingKitsApi, loadKitsApi] = useAPILoad(kitsAPI.list())
    const isFetching = isFetchingKitsApi

    const loadData = useCallback(() => {
        return loadKitsApi()
    }, [])

    useEffect(() => {

    }, [])

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
                <div style={{height: 300, width: '100%'}}>
                    <DataGrid rows={dataKitsApi.kits} columns={columns} loading={isFetching}/>
                </div>
            </main>
        </>
    )
}