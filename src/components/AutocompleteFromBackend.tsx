import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Autocomplete, AutocompleteProps, CircularProgress, SxProps, TextField} from "@mui/material";


interface IRecords {
    id: number
    name: string
}

export interface AutocompleteFromBackendProps {
    label: string
    sx: SxProps,
    searchByName: (string) => Promise<IRecords[]>
    onChange: (SyntheticBaseEvent, IRecord) => void //TODO:Изменить any
    excludeFunc: (raw: any, index?: number) => boolean
}

const AutocompleteFromBackend = ({excludeFunc, ...props}: AutocompleteFromBackendProps) => {
    const {label, sx, onChange, searchByName, ...otherProps} = props

    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<readonly IRecords[]>([])
    const [inputValue, setInputValue] = useState('')

    const [isFetching, toggleIsFetching] = useState(false)

    const ref = useRef()

    const loadData = useCallback((v?: string) => {
        toggleIsFetching(true)

        searchByName(v)
            .then((options) => {
                setOptions(options)
            })
            .finally(() => {
                toggleIsFetching(false)
            })
    }, [searchByName])

    const handleChangeInputValue = (v) => {
        setInputValue(v)
        loadData(v || undefined)
    }

    useEffect(() => {
        loadData()
    }, [loadData])

    const filteredOptions = useMemo(() => (!!excludeFunc ? options.filter(excludeFunc) : options), [excludeFunc, options])

    return (
        <Autocomplete
            id="autocomplate-backend"
            ref={ref}
            sx={sx}
            inputValue={inputValue}
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            onChange={(e, v) => {
                setInputValue('')
                onChange(e, v)
            }}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            options={filteredOptions}
            loading={isFetching}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isFetching ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    onChange={(e) => {
                        handleChangeInputValue(e.target.value)
                    }}
                    helperText={' '}
                />
            )}
            autoHighlight
            disableClearable
        />
    )
}

export default AutocompleteFromBackend
