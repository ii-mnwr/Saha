import { Chip, ChipProps } from '@mui/material'
import React from 'react'

type Props = ChipProps & {
    label: string
}
const CustomChip = ({ label, color, sx, ...other }: Props) => (
    <Chip label={label} color={color} sx={{ ...sx }} {...other} />
)

export default CustomChip
