import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type Props = {
    options: {
        label?: string,
        value?: string,
    }[],
    placeholder: string,
    sx: {},
}
export default function ComboBox({ options, placeholder, sx, ...other }: Props) {
    return (
        <Autocomplete
            options={options}
            sx={{ width: 300 }}
            {...other}
            renderInput={(params) => <TextField sx={{ ...sx }} {...params} placeholder={placeholder} />}
        />
    );
}