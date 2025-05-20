"use client"

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { countries } from "src/assets/data"
import { useAuthContext } from "src/auth/useAuthContext"

export const FindCareer = () => {
  const [filter, setFilter] = useState({
    searchByKey: "",
    location: "",
  })
  const [error, setError] = useState(false)
  const { push } = useRouter()
  const { user } = useAuthContext()
  const inputRef = useRef<HTMLInputElement>(null) // Specify HTMLInputElement type

  useEffect(() => {
    const handleFocusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    window.addEventListener("focusInput", handleFocusInput)

    return () => {
      window.removeEventListener("focusInput", handleFocusInput)
    }
  }, [])

  return (
    <Box
      sx={{
        backgroundImage: `url(${"assets/homepage3.jpeg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        mt: 0,
        paddingTop: 20,
        paddingBottom: 10,
        paddingX: { xs: 2, md: 8 },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        },
      }}
    >
      <Box textAlign="center" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            fontFamily: "Archivo, sans-serif",
            fontSize: 24,
            marginBottom: 1,
          }}
        >
          Dynamic platform building successful pathways
        </Typography>
        <Typography
          fontWeight={800}
          fontSize={{ xs: 36, sm: 45, md: 50, lg: 50, xl: 50 }}
          sx={{
            textTransform: "uppercase",
            color: "white",
            letterSpacing: "0.02em",
            marginBottom: 4,
          }}
        >
          FIND THE CAREER YOU DESERVE !
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          sm: "column",
          md: "row",
        }}
        width="100%"
        justifyContent="center"
        alignItems={{ xs: "center", md: error ? "center" : "end", lg: "end", xl: "end" }}
        gap={3}
        marginTop={10}
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Box
          display="flex"
          flexDirection={{
            xs: "column",
            sm: "column",
            md: "row",
          }}
          width={{ md: "80%", xl: "60%" }}
          alignItems={{ xs: "center", md: "start", lg: "start", xl: "start" }}
          gap={3}
        >
          <FormControl
            sx={{
              width: {
                xs: "100%",
                md: "100%",
              },
              position: "relative",
              
            }}
          >
            <Typography
              component="label"
              sx={{
                position: "absolute",
                top: "8px",
                left: "14px",
                fontSize: "10px",
                color: "rgb(255, 255, 255)",
                zIndex: 1,
              }}
            >
              Search by keywords
            </Typography>
            <TextField
              size="small"
              placeholder="keywords"
              inputRef={inputRef}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  searchByKey: e.target.value,
                })
                if (e.target.value !== "") {
                  setError(false)
                }
              }}
              sx={{
                background: "rgba(255, 255, 255, 0.18)",
                borderRadius: 1,
                "& .MuiInputBase-input": {
                  paddingTop: "24px",
                },
              }}
            />
            {error && (
              <Typography fontSize={14} color="red">
                Please enter keywords to search relevent jobs
              </Typography>
            )}
          </FormControl>

          <FormControl
            sx={{
              width: {
                xs: "100%",
                md: "100%",
                lg: "100%",
                xl: "100%",
              },
              position: "relative",
            }}
          >
            <Typography
              component="label"
              sx={{
                position: "absolute",
                top: "8px",
                left: "14px",
                fontSize: "10px",
                color: "#fff",
                zIndex: 1,
              }}
            >
              Search by Location
            </Typography>
            <Select
              variant="outlined"
              size="small"
              value={filter.location}
              onChange={(e: any) => {
                setFilter({
                  ...filter,
                  location: e.target.value,
                })
              }}
              displayEmpty
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <span>Location</span>
                }
                return selected
              }}
              sx={{
                fontColor: "#fff",
                background: "rgba(255, 255, 255, 0.18)",
                borderRadius: 1,
                "& .MuiInputBase-root": {
                  height: "56px",
                },
                "& .MuiSelect-select": {
                  paddingTop: "24px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>Select Location</em>
              </MenuItem>
              {countries?.map((item, index) => (
                <MenuItem key={index} value={item?.label}>
                  {item?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            size="medium"
            variant="contained"
            sx={{
              height: "56px",
              background: "#0f1e36",
              ":hover": {
                background: "#162a4a",
              },
              width: { xs: "100%", md: "auto" },
              px: 4,
            }}
            onClick={() => {
              if (user && user?.role_id === 3) {
                localStorage.setItem("filter", JSON.stringify(filter))
                push("/candidate/jobs/search-jobs/")
              } else {
                push("/login")
              }
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  )
}


export default FindCareer
