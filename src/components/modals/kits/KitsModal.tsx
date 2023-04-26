import React, {Ref, useCallback, useMemo, useRef, useState} from 'react'
import AutocompleteFromBackend, {AutocompleteFromBackendProps} from "@/components/AutocompleteFromBackend";
import itemsAPI from "@/requests/items";
import {useFormik} from "formik";
import kitsAPI from "@/requests/kit";
import rePatterns from "@/utilities/rePatterns";
import {FetchingButton} from "@/components/FetchingButton";
import {Button, Grid, TextField, Typography} from "@mui/material";
import StyledModal from "@/components/modals/StyledModal";
import EntityContainer from "@/components/EntityContainer";
import * as yup from "yup";
import SmartModal, {ISmartModalRef} from "@/components/modals/SmartModal";

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

function KitsModal() {
    const modalRef = useRef<ISmartModalRef>()

    const [isFetching, toggleIsFetching] = useState<boolean>(false)

    const [itemsIdToNameContainer, setItemsIdToNameContainer] = useState<Record<number, string>>({})
    const [itemsContainer, setItemsContainer] = useState<IItemCounter[]>([])

    const entityContainerHeight = 300

    const searchByName = useCallback<AutocompleteFromBackendProps['searchByName']>((name) => {
        return itemsAPI
            .list({name})
            .then(r => {
                return r.data.items.map(item => ({
                    id: item.id,
                    name: item.name
                }))
            })
    }, [])

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

            formik.values.items = itemsContainer

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
        const {[itemsContainer[index].id]: itemToRemove, ...rest} = itemsIdToNameContainer

        setItemsContainer(itemsContainer.filter((item, indexIter) => indexIter != index))
        setItemsIdToNameContainer(rest)
    }

    const onCounterChange = (index, e) => {
        const count = e.target.value

        if (rePatterns.onlyNumbers.test(count)) {
            itemsContainer[index].count = e.target.value
            setItemsContainer([...itemsContainer])
        }
    }

    const triggerButton = useMemo(() => (
        <Button variant='contained' color='info' onClick={() => {
            modalRef.current?.handleOpen()
        }}>Изменить</Button>
    ), [modalRef.current])

    const successButton = useMemo(() => (
        <FetchingButton variant='contained' color='primary' isFetching={isFetching}
                        onClick={() => {
                            formik.handleSubmit()
                        }}>Создать</FetchingButton>
    ), [formik, isFetching])

    return (
        <>
            <SmartModal
                sx={{width: 1000}}
                heading='Добавить'
                openTriggerRender={triggerButton}
                bottomChildren={successButton}
                ref={modalRef}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1.5}>
                        <Grid sx={{display: 'flex', flexDirection: 'column'}} md={6} item>
                            <Typography variant='h5' sx={{marginBottom: 1, wordBreak: ''}}>Основное</Typography>
                            <TextField
                                id='name'
                                label='Название'
                                sx={{
                                    marginBottom: 1,
                                }}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={!!formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name || ' '}
                                fullWidth
                            />
                            <TextField
                                id='description'
                                label='Описание'
                                sx={{
                                    marginBottom: 1, flexGrow: 1,
                                    '& .MuiInputBase-root': {
                                        height: '100% !important'
                                    },
                                    '& .MuiInputBase-input': {
                                        height: '100% !important',
                                        overflow: "auto !important"
                                    }
                                }}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                fullWidth
                                multiline
                            />
                        </Grid>
                        <Grid sx={{display: 'flex', flexDirection: 'column'}} md={6} item>
                            <Typography variant='h5' sx={{wordBreak: '', marginBottom: 1}}>Список предметов</Typography>
                            <AutocompleteFromBackend
                                label='Предметы'
                                sx={{width: '100%', marginBottom: 1}}
                                onChange={onChangeItemSelect}
                                searchByName={searchByName}
                                excludeFunc={(raw => (!(raw.id in itemsIdToNameContainer)))}/>
                            <EntityContainer
                                sx={{height: entityContainerHeight, overflow: 'auto'}}
                                rows={itemsContainer}
                                getLabel={(row) => (itemsIdToNameContainer[row.id])}
                                onCountChange={onCounterChange}
                                onRemove={onRemoveItem}/>
                        </Grid>
                    </Grid>
                </form>
            </SmartModal>
        </>
    )
}

export default KitsModal