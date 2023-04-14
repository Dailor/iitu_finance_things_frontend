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

import {Box} from "@mui/material";
import ItemAddModal from "@/components/modals/items/ItemAddModal";
import KitsAddModal from "@/components/modals/kits/KitsAddModal";

const columns = [
    {field: 'id', headerName: 'ID', width: 30},
    {field: 'name', headerName: 'Название', width: 300},
    {field: 'description', headerName: 'Описание', flex: 1}
]

export default function Kits() {
    const [kits, setKits] = useState([])
    const [isFetching, toggleIsFetching] = useState(false)

    const loadKits = useCallback(() => {
        toggleIsFetching(true)

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
                        <KitsAddModal callback={loadKits}/>
                    </Box>
                </Box>
                <div style={{height: 300, width: '100%'}}>
                    <DataGrid rows={kits} columns={columns} loading={isFetching}/>
                </div>
            </main>
        </>
    )
}