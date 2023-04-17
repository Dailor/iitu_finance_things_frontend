import React, {createRef, useMemo, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material"
import StyledModal from "@/components/modals/StyledModal"
import {useFormik} from "formik"
import * as yup from "yup"
import {FetchingButton} from "@/components/FetchingButton"
import {PropsCallback} from "@/types/componentsWithCallback"
import kitsAPI from "@/requests/kit"
import AutocompleteFromBackend, {AutocompleteFromBackendProps} from "@/components/AutocompleteFromBackend"
import itemsAPI from "@/requests/items"
import {IItem} from "@/types/item"

import DeleteIcon from '@mui/icons-material/Delete'
import ItemsModalContainer from "@/components/modals/kits/ItemsModalContainer";
import EntityContainer from "@/components/EntityContainer";

const validationSchema = yup.object({
    name: yup
        .string('Введите название')
        .required('Введите название'),
    description: yup
        .string('Введите описание'),
    items: yup
        .array()
        .of(
            yup.object().shape({
                id: yup.number().required(),
                count: yup
                    .number()
                    .required('Необходимо указать количество')
                    .min(0, 'Количество должно быть больше нуля')
            })
        )
})

interface IItemCounter {
    id: number
    count: number
}

interface Props extends PropsCallback {
}


const KitAddModal = ({callback}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isFetching, toggleIsFetching] = useState<boolean>(false)

    const handleOpen = () => setOpen<boolean>(true)
    const handleClose = () => setOpen<boolean>(false)

    const [itemsIdToNameContainer, setItemsIdToNameContainer] = useState<Record<number, string>>({})
    const [itemsContainer, setItemsContainer] = useState<IItemCounter[]>([])

    const searchByName: AutocompleteFromBackendProps['searchByName'] = (name) => {
        return itemsAPI
            .list({name})
            .then(r => {
                return r.data.items.map(item => ({
                    id: item.id,
                    name: item.name
                }))
            })
    }

    const onChangeItemSelect = (e, v) => {
        if (!v) {
            return
        }

        setItemsIdToNameContainer({...itemsIdToNameContainer, [v.id]: v.name})

        setItemsContainer(
            [
                ...itemsContainer, {
                id: v.id,
                count: 0
            }]
        )
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            items: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            toggleIsFetching(true)

            kitsAPI.add(values)
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

    const onRemoveItem = (index) => {
        const {byKey, ...rest} = itemsIdToNameContainer

        setItemsContainer(itemsContainer.filter((item, indexIter) => indexIter != index))
        setItemsIdToNameContainer(rest)
    }

    const onCounterChange = (index, e) => {
        itemsContainer[index].count = e.target.value
        setItemsContainer([...itemsContainer])
    }

    const successButton = useMemo(() => (
        <FetchingButton variant='contained' color='primary' isFetching={isFetching}
                        onClick={() => {
                            formik.handleSubmit()
                        }}>Создать</FetchingButton>
    ), [formik, isFetching])

    return (
        <>
            <Button variant='contained' color='primary' onClick={handleOpen}>Добавить</Button>
            <StyledModal sx={{
                width: 1000
            }} open={open} onClose={handleClose} heading='Добавить'
                         bottomChildren={successButton}>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{display: 'flex', gap: 1.5}}>
                        <Box sx={{flexBasis: '50%'}}>
                            <Typography variant='h5' sx={{marginBottom: 1, wordBreak: ''}}>Основное</Typography>
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
                                rows={12}
                                fullWidth
                                multiline
                            />
                        </Box>
                        <Box sx={{flexBasis: '50%'}}>
                            <Typography variant='h5' sx={{wordBreak: '', marginBottom: 1}}>Список предметов</Typography>
                            <AutocompleteFromBackend label='Предметы' sx={{width: '100%', marginBottom: 1}}
                                                     onChange={onChangeItemSelect}
                                                     searchByName={searchByName}
                                                     excludeFunc={(raw => (!(raw.id in itemsIdToNameContainer)))}/>
                            <EntityContainer rows={itemsContainer}
                                             getLabel={(row) => (itemsIdToNameContainer[row.id])}
                                             onCountChange={onCounterChange}
                                             onRemove={onRemoveItem}/>
                        </Box>
                    </Box>
                </form>
            </StyledModal>
        </>
    )
}

export default KitAddModal