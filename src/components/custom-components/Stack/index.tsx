import { Stack, StackProps } from '@mui/material'
import React from 'react'

const CustomStack = ({ children, direction, sx, ...other }: StackProps) => (
    <Stack direction={direction} sx={{ ...sx }} {...other}>
        {children}
    </Stack>
)

export default CustomStack
