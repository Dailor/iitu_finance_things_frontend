import React, {useState} from 'react'
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material"
import {IUser} from "@/types/user"
import StyledModal from "@/components/modals/StyledModal"
import {IDepartment} from "@/types/department"
import {rolesToEnum, roleToRoleName} from "@/constants"

interface Props {
    user: IUser
    departments: IDepartment[]
}

const UserEditModal = ({user, departments}: Props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Button variant='contained' onClick={handleOpen}>Изменить</Button>
            <StyledModal open={open} onClose={handleClose} heading='Редактирование'>
                <form>
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
                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Роль</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            fullWidth
                            sx={{marginBottom: 1}}
                            label='Роль'
                        >
                            {rolesToEnum.map((role, index) => (
                                <MenuItem value={role[0]} key={index}>{role[1]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="department-select-label">Департамент</InputLabel>
                        <Select
                            labelId="department-select-label"
                            id="department-select"
                            fullWidth
                            sx={{marginBottom: 1}}
                            label='Департамент'
                        >
                            {departments.map(department => (
                                <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </StyledModal>
        </>
    )
}

export default UserEditModal