"use client"

import type React from "react"

// @mui
import { InputAdornment, ClickAwayListener, Box } from "@mui/material"
// components
import { CustomTextField } from "src/components/custom-input"
import Iconify from "../../../../components/iconify"

// ----------------------------------------------------------------------

type Props = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClickAway: VoidFunction
}

export default function ChatNavSearch({ value, onChange, onClickAway }: Props) {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Box sx={{ position: "relative" }}>
        <CustomTextField
          fullWidth
          size="small"
          value={value}
          onChange={onChange}
          placeholder="Search Here..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: "#AAAAAA", width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              backgroundColor: "#F5F5F5",
              border: "none",
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
            "& .MuiInputBase-input": {
              py: 1.25,
              fontSize: "0.9rem",
              color: "#666666",
              "&::placeholder": {
                color: "#AAAAAA",
                opacity: 1,
              },
            },
          }}
        />
      </Box>
    </ClickAwayListener>
  )
}
