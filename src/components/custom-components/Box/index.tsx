import { Box, BoxProps } from '@mui/material'
import React from 'react'

const CustomBox = ({ children, sx, ...other }: BoxProps) => (
    <Box sx={{ ...sx }} {...other}>
        {children}
    </Box>
)

export default CustomBox
