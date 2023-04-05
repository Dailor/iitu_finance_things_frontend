import React from 'react'
import Head from "next/head"
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid"

const rows: GridRowsProp<any> = [
    {id: 1, fullName: 'Admin Admin', email: 'admin@admin.com', role: 'Admin', department: "ПОиДТ"},
    {id: 2, fullName: 'Admin Admin', email: 'admin@admin.com', role: 'Admin', department: "ПОиДТ"},
    {id: 3, fullName: 'Admin Admin', email: 'admin@admin.com', role: 'Admin', department: "ПОиДТ"},
]

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 30},
    {field: 'fullname', headerName: 'ФИО', width: 150},
    {field: 'email', headerName: 'Почта', width: 150},
    {field: 'role', headerName: 'Роль', width: 150},
    {field: 'department', headerName: 'Департамент', width: 150},
]

export default function Users() {
    return (
        <>
            <Head>
                <title>IITU | Пользователи</title>
            </Head>
            <main>
                <h1>Пользователи</h1>
                <div style={{height: 300, width: '100%'}}>
                    <DataGrid rows={rows} columns={columns}/>
                </div>
            </main>
        </>

    )
}