import React, {createRef, useMemo, useState} from 'react'
import {Button, TextField} from "@mui/material"
import StyledModal from "@/components/modals/StyledModal"
import {useFormik} from "formik"
import * as yup from "yup"
import departmentsAPI from "@/requests/departments"
import {FetchingButton} from "@/components/FetchingButton"
import {PropsCallback} from "@/types/componentsWithCallback"

const validationSchema = yup.object({
    name: yup
        .string('Введите название департамента')
        .required('Введите название департамента'),
})

interface Props extends PropsCallback{
}

const DepartmentAddModal = ({callback}: Props) => {
    const [open, setOpen] = useState(false)
    const [isFetching, toggleIsFetching] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            toggleIsFetching(true)

            departmentsAPI.add(values)
                .then((r) => {
                    if (callback)
                        callback()

                    handleClose()
                })
                .catch(e => {
                    if (e.response.status == 422) {
                        formik.setErrors({
                            name: "Ошибка при добавлении",
                        })
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


    return (
        <>
            <Button variant='contained' color='primary' onClick={handleOpen}>Добавить</Button>
            <StyledModal open={open} onClose={handleClose} heading='Добавить'
                         bottomChildren={successButton}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id='name'
                        label='Название'
                        sx={{marginBottom: 1}}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={!!formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name || ' '}
                        fullWidth
                    />
                </form>
            </StyledModal>
        </>
    )
}

export default DepartmentAddModal