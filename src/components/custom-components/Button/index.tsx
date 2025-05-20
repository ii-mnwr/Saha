import { Button, ButtonProps } from '@mui/material'
import React from 'react'

type Props = ButtonProps & {
    content: string
}
const CustomButton = ({ content, sx, ...other }: Props) => (
    <Button sx={{ ...sx }} {...other}>
        {content}
    </Button>
)

export default CustomButton
