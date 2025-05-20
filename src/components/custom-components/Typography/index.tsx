import { Typography, TypographyProps } from '@mui/material';
import React from 'react'

type Props = TypographyProps & {
    content: string
}

const CustomTypography = ({ content, sx, ...other }: Props) => {
    console.log('');
    return (
        <Typography sx={{ ...sx }} {...other}>
            {content}
        </Typography >
    )
}

export default CustomTypography
