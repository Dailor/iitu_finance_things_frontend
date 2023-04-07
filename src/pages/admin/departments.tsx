import React, {useCallback, useEffect, useState} from 'react'
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import {IDepartment} from "@/types/department"
import departmentsAPI from "@/requests/departments"
import Head from "next/head"
import {Box, Button} from "@mui/material"
import DepartmentAddModal from "@/components/modals/departments/DepartmentAddModal";


const columns: GridColDef[IDepartment] = [
    {field: 'id', headerName: 'ID', width: 30},
    {field: 'name', headerName: 'Название', flex: 1},
]

export default function Departments() {
    const [departments, setDepartments] = useState<IDepartment[]>([])

    const [isFetching, toggleIsFetching] = useState(true)

    const loadDepartments = useCallback(() => {
        departmentsAPI.list()
            .then((r) => {
                setDepartments(r.data.departments)
            })
            .finally(() => {
                toggleIsFetching(false)
            })
    }, [])

    useEffect(() => {
        loadDepartments()
    }, [loadDepartments])

    return (
        <>
            <Head>
                <title>IITU | Департаменты</title>
            </Head>
            <main>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Департаменты</h1>
                    <Box>
                        <DepartmentAddModal callback={loadDepartments}/>
                    </Box>
                </Box>
                <Box style={{height: 600, width: '100%'}}>
                    <DataGrid rows={departments} columns={columns} loading={isFetching}/>
                </Box>
            </main>
        </>
    )
}