import React, {createRef, useMemo, useState} from 'react'
import {Button, TextField} from "@mui/material"
import StyledModal from "@/components/modals/StyledModal"
import {useFormik} from "formik"
import * as yup from "yup"
import departmentsAPI from "@/requests/departments"
import {FetchingButton} from "@/components/FetchingButton"
import {PropsCallback} from "@/types/componentsWithCallback"
import itemsAPI from "@/requests/items";

const validationSchema = yup.object({
    name: yup
        .string('Введите название')
        .required('Введите название'),
    description: yup
        .string('Введите описание')
})

interface Props extends PropsCallback {
}


const ItemAddModal = ({callback}: Props) => {
    const [open, setOpen] = useState(false)
    const [isFetching, toggleIsFetching] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            toggleIsFetching(true)

            itemsAPI.add(values)
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
                    <TextField
                        id='description'
                        label='Описание'
                        sx={{marginBottom: 1}}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={!!formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description || ' '}
                        rows={4}
                        fullWidth
                        multiline
                    />
                </form>
            </StyledModal>
        </>
    )
}

export default ItemAddModal