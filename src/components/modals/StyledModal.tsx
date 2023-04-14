import React from 'react'
import {Box, Button, Modal, SxProps, Typography} from "@mui/material"

const borderColor = '#E3E5E7FF'

const style: SxProps = {
    display: 'flex',
    flexDirection: 'column',

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
}

const modalManageStyle: SxProps | any = {
    paddingX: 2,
    paddingTop: 2,
    paddingBottom: 1
}

const modalHeadStyle: SxProps = {
    ...modalManageStyle,
    borderBottom: 1,
    borderColor
}

const modalBodyStyle: SxProps = {
    flexGrow: 1,
    paddingX: 2,
    paddingY: 3,
    paddingBottom: 2
}

const modalBottomStyle: SxProps = {
    ...modalManageStyle,
    display: 'flex', justifyContent: 'end', gap: 1.5,
    borderTop: 1,
    borderColor
}

interface ModalHeadProps {
    heading: string
}

const ModalHead = ({heading}: ModalHeadProps) => {
    return (
        <Box sx={{...modalHeadStyle}}>
            <Typography variant='h5' fontWeight='bold'>{heading}</Typography>
        </Box>
    )
}

interface ModalBodyProps {
    children: React.ReactNode
}

const ModalBody = ({children}: ModalBodyProps) => {
    return (
        <Box sx={modalBodyStyle}>
            {children}
        </Box>
    )
}

interface ModalBottomProps {
    handleClose: () => {}
    children: React.ReactNode
}

const ModalBottom = ({handleClose, children}: ModalBottomProps) => {
    return (
        <Box sx={modalBottomStyle}>
            <Button onClick={handleClose} variant='contained' color='secondary'>Закрыть</Button>
            {children}
        </Box>
    )
}

interface Props {
    heading: string,
    open: boolean
    children: React.ReactNode,
    bottomChildren?: React.ReactNode,
    sx: SxProps
}

const StyledModal = (props: Props) => {
    const {open, onClose, bottomChildren} = props

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{...style, ...props.sx}}>
                <ModalHead heading={props.heading}/>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalBottom handleClose={onClose}>
                    {bottomChildren}
                </ModalBottom>
            </Box>
        </Modal>
    )
}

export default StyledModal