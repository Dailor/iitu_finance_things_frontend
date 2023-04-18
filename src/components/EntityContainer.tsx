import React, {SyntheticEvent, useState} from 'react'
import {Box, Button, SxProps, TextField, Typography} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"


interface Props {
    rows: any,
    getLabel: (entity: any) => string
    onCountChange: (index: number, e: SyntheticEvent) => void
    onRemove: (index) => void
    sx?: SxProps
}


function EntityContainer({rows, getLabel, onCountChange, onRemove, sx, ...props}: Props) {
    return (
        <Box sx={sx}>
            {rows.map((entity, index) => (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '&:not(:last-child)': {marginBottom: 1},
                }} key={index}>
                    <Box>
                        <Typography>{getLabel(entity)}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Box sx={{marginRight: 1}}>
                            <TextField sx={{width: 110}}
                                       inputProps={
                                           {
                                               sx: {paddingY: 1}
                                           }
                                       } type='number'
                                       value={entity.count}
                                       onChange={(e) => onCountChange(index, e)}/>
                        </Box>
                        <Box>
                            <Button variant='contained' color='error' onClick={() => onRemove(index)}><DeleteIcon
                                size={20}/></Button>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default EntityContainer