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


export default function Kits() {
    const [kits, setKits] = useState([])

    const loadKits = useCallback(() => {

    }, [])

    useEffect(() => {

    }, [])

    return <></>
}