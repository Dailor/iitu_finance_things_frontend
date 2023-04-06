import React, {useEffect, useState} from 'react'
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

    useEffect(() => {
        departmentsAPI.list()
            .then((r) => {
                setDepartments(r.data.departments)
            })
    }, [])

    return (
        <>
            <Head>
                <title>IITU | Департаменты</title>
            </Head>
            <main>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Департаменты</h1>
                    <Box>
                        <DepartmentAddModal/>
                    </Box>
                </Box>
                <Box style={{height: 600, width: '100%'}}>
                    <DataGrid rows={departments} columns={columns}/>
                </Box>
            </main>
        </>
    )
}