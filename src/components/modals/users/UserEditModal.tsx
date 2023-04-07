import React, {useMemo, useState} from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from "@mui/material"
import {IUser} from "@/types/user"
import StyledModal from "@/components/modals/StyledModal"
import {IDepartment} from "@/types/department"
import {rolesToEnum, roleToRoleName} from "@/constants"
import {PropsCallback} from "@/types/componentsWithCallback";
import {FormikErrors, useFormik} from "formik";
import departmentsAPI from "@/requests/departments";
import * as yup from "yup";
import usersAPI from "@/requests/users";
import {FetchingButton} from "@/components/FetchingButton";
import {errorsApiToObject} from "@/utilities/api";

const validationSchema = yup.object({
    role: yup
        .string('Выберите роль')
        .required('Выберите роль')
        .nonNullable('Выберите департамент')
    ,
    departmentID: yup
        .string('Выберите департамент')
        .required('Выберите департамент')
        .nonNullable('Выберите департамент')
})

interface Props extends PropsCallback {
    user: IUser
    departments: IDepartment[]
}

const UserEditModal = ({user, departments, callback}: Props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [isFetching, toggleIsFetching] = useState(false)

    const formik = useFormik({
        initialValues: {
            role: user.role,
            departmentID: user.departmentID
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            toggleIsFetching(true)

            usersAPI.edit(user.id, values)
                .then((r) => {
                    if (callback)
                        callback()
                    handleClose()
                })
                .catch(e => {
                    if (e.response.status == 422) {
                        formik.setErrors(errorsApiToObject(e.response.data) as FormikErrors<{ role: string, departmentID: number }>)
                    }
                })
                .finally(() => {
                    toggleIsFetching(false)
                })
        },
    })

    const successButton = useMemo(() => (
        <FetchingButton variant='contained' color='primary' isFetching={isFetching}
                        onClick={() => {
                            formik.handleSubmit()
                        }}>Создать</FetchingButton>
    ), [formik, isFetching])

    console.log(formik)

    return (
        <>
            <Button variant='contained' onClick={handleOpen}>Изменить</Button>
            <StyledModal open={open} onClose={handleClose} heading='Редактирование' bottomChildren={successButton}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        sx={{marginBottom: 1}}
                        label='ФИО'
                        value={user.fullName}
                        disabled
                    />
                    <TextField
                        fullWidth
                        sx={{marginBottom: 1}}
                        label='Почта'
                        value={user.email}
                        disabled
                    />
                    <TextField
                        name="role"
                        label='Роль'
                        sx={{marginBottom: 1}}
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        error={!!formik.touched.role && Boolean(formik.errors.role)}
                        helperText={formik.touched.role && formik.errors.role}
                        select
                        fullWidth
                    >
                        {rolesToEnum.map(role => (
                            <MenuItem value={role[0]} key={role[0]}>{role[1]}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name='departmentID'
                        label='Департамент'
                        sx={{marginBottom: 1}}
                        value={formik.values.departmentID}
                        onChange={formik.handleChange}
                        error={!!formik.touched.departmentID && Boolean(formik.errors.departmentID)}
                        helperText={formik.touched.departmentID && formik.errors.departmentID}
                        select
                        fullWidth
                    >
                        {departments.map(department => (
                            <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>
                        ))}
                    </TextField>
                </form>
            </StyledModal>
        </>
    )
}

export default UserEditModal