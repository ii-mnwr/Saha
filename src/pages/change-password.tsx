"use client"

import type React from "react"
import { useState } from "react"
import Head from "next/head"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"
import { useSettingsContext } from "src/components/settings"
import { Box, Button, Container, Typography, InputAdornment, IconButton } from "@mui/material"
import FormProvider from "src/components/hook-form/FormProvider"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { RHFTextField } from "src/components/hook-form"
import usePostRequest from "src/hooks/usePost"
import { useSnackbar } from "src/components/snackbar"
import { useAuthContext } from "src/auth/useAuthContext"
import Iconify from "src/components/iconify"
import { useRouter } from "next/router"
import ManageJob from "./manage-job"

type FormValuesProps = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

ChangePassword.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "#",
      },
      { name: "Settings", href: "#" },
    ]}
    title="Settings"
  >
    {page}
  </DashboardLayout>
)

export default function ChangePassword({ settings = false }: any) {
  const route = useRouter()
  const [tabValue, setTabValue] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { themeStretch } = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuthContext()

  // Define default form values
  const defaultValues: FormValuesProps = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  // Validation schema for the form
  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirming password is required"),
  })

  const methods = useForm<any>({
    resolver: yupResolver(passwordSchema),
    defaultValues,
  })

  const { handleSubmit } = methods
  const resetPasswordMutation = usePostRequest<any>()

  const onSubmit = (data: any) => {
    console.log("data", data)
    const url = "/auth/change-password"

    resetPasswordMutation.mutate(
      [
        url,
        {
          email: user?.email,
          oldPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || "Password changed successfully", {
            variant: "success",
          })
          route.push(user?.role_id === 2 ? "/dashboard/employer/" : "/dashboard/candidate")
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: "error" })
        },
      },
    )
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Container maxWidth={false} disableGutters sx={{ bgcolor: "#f0f0f0", py: 4, px: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Work Sans,sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: "#333",
              mb: 3,
            }}
          >
            Change your password
          </Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ maxWidth: 600 }}>
            {/* Old Password */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontFamily: "Work Sans,sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#333",
                  mb: 1,
                }}
              >
                Old password
              </Typography>
              <RHFTextField
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                sx={{
                  ".MuiOutlinedInput-root": {
                    backgroundColor: "#FFF",
                    borderRadius: 1,
                    height: 48,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* New Password */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontFamily: "Work Sans,sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#333",
                  mb: 1,
                }}
              >
                New password
              </Typography>
              <RHFTextField
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                sx={{
                  ".MuiOutlinedInput-root": {
                    backgroundColor: "#FFF",
                    borderRadius: 1,
                    height: 48,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                        <Iconify icon={showNewPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Confirm Password */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: "Work Sans,sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#333",
                  mb: 1,
                }}
              >
                Re-type new password
              </Typography>
              <RHFTextField
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                sx={{
                  ".MuiOutlinedInput-root": {
                    backgroundColor: "#FFF",
                    borderRadius: 1,
                    height: 48,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        <Iconify icon={showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#0A2647",
                color: "white",
                px: 4,
                py: 1,
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#144272",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </FormProvider>

        {/* Hidden tab content to preserve functionality */}
        <Box sx={{ display: "none" }}>
          {tabValue === 1 && (
            <Box>
              <ManageJob isClosed />
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}
