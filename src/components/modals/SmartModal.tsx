import React, {Ref, useImperativeHandle, useState} from "react"
import StyledModal, {StyledModalProps} from "@/components/modals/StyledModal"

interface SmartModalProps extends Exclude<StyledModalProps, 'open' | 'onClose'> {
    openTriggerRender: React.ReactNode
}

export interface ISmartModalRef extends HTMLElement{
    handleOpen: () => void
    handleClose: () => void
}

const SmartModal = React.forwardRef<Ref<ISmartModalRef>, SmartModalProps>(
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