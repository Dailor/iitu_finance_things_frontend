import React, {SyntheticEvent} from 'react'
import {Box, Button, Typography} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"


interface Props {
    rows: any,
    getLabel: (entity: any) => string
    onCountChange: (index: number, e: SyntheticEvent) => void
    onRemove: (index) => void
}


function EntityContainer({rows,getLabel ,onRemove, ...props}: Props) {
    return (
        <Box sx={{height: '100%'}}>
            {rows.map((entity, index) => (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:not(:last-child)': {marginBottom: 1}
                }} key={index}>
                    <Box>
                        <Typography>{getLabel(entity)}</Typography>
                    </Box>
                    <Box>
                        <Button variant='contained' color='error' onClick={() => onRemove(index)}><DeleteIcon
                            size={20}/></Button>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default EntityContainer