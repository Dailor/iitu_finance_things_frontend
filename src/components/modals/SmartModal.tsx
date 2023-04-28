import React, {Ref, useImperativeHandle, useState} from "react"
import StyledModal, {StyledModalProps} from "@/components/modals/StyledModal"

interface SmartModalProps extends Exclude<StyledModalProps, 'open' | 'onClose'> {
    openTriggerRender: React.ReactNode
}

export interface SmartModalRefType {
    handleOpen: () => void
    handleClose: () => void
}

const SmartModal = React.forwardRef<SmartModalRefType, Omit<SmartModalProps, 'onClose' | 'open'>>(
    function SmartModal(props, ref) {
        const [open, setOpen] = useState<boolean>(false)

        const handleOpen = () => setOpen<boolean>(true)
        const handleClose = () => setOpen<boolean>(false)

        useImperativeHandle(ref, () => {
            return {
                handleOpen,
                handleClose
            }
        }, [])

        return (
            <>
                {props.openTriggerRender}
                <StyledModal {...props} open={open} onClose={handleClose}>{props.children}</StyledModal>
            </>
        )
    })

export default SmartModal