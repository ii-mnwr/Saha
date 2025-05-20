"use client"

/* eslint-disable no-useless-escape */
import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { StyledContent, StyledRoot } from "src/layouts/login/styles"
import { pxToRem } from "src/theme/typography"
import { useAuthContext } from "src/auth/useAuthContext"
import { useRouter } from "next/router"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoadingButton } from "@mui/lab"
import GuestGuard from "src/auth/GuestGuard"
import { useSnackbar } from "src/components/snackbar"
import Head from "next/head"
import Iconify from "src/components/iconify"
import LoginAsModal from "src/sections/auth/LoginAsModal"
import FormProvider, { RHFTextField } from "../../components/hook-form"

type FormValuesProps =
  | {
      user_name: string
      email: string
      password: string
      phone_number: string
      resume: any
      company_name: string
      company_location: string
      designation: string
      afterSubmit?: string
      confirm_password?: string
    }
  | any

const SignUp = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { login, register } = useAuthContext()

  const [type, setType] = useState(0)
  const [open, setOpen] = useState(false)
  const [resumeFile, setResumeFile] = useState<any>({})
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false)

  useEffect(() => {
    handleOpen()
  }, [])

  const CandidateSchema = Yup.object().shape({
    user_name: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      ),
    role_id: Yup.string().required("Role is required"),
    phone_number: Yup.string().required("Mobile no is required"),
    resume: Yup.string().required("Resume is required"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  })

  const EmployeeSchema = Yup.object().shape({
    user_name: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      ),
    role_id: Yup.string().required("Role is required"),
    phone_number: Yup.string().required("Mobile no is required"),
    company_name: Yup.string().required("Company name is required"),
    company_location: Yup.string().required("Company Location is required"),
    designation: Yup.string().required("Designation is required"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  })

  const defaultValues = {
    user_name: "",
    email: "",
    password: "",
    phone_number: "",
    confirm_password: "",
    resume: "",
    company_name: "",
    company_location: "",
    designation: "",
    afterSubmit: "",
    filePath: "",
    role_id: "",
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(type === 2 ? EmployeeSchema : CandidateSchema),
    defaultValues,
  })

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    setValue("resume", file.name)
    setResumeFile(file)
  }

  const onSubmit = async (data: FormValuesProps) => {
    console.log("data", data)

    const { email, password, user_name, phone_number, company_name, company_location, designation, role_id } =
      data || {}

    // let tempData: any;
    const formData = new FormData()
    if (type === 2) {
      formData.append("email", email)
      formData.append("phone_number", phone_number)
      formData.append("user_name", user_name)
      formData.append("password", password)
      formData.append("company_name", company_name)
      formData.append("company_location", company_location)
      formData.append("designation", designation)
      formData.append("role_id", role_id)
      // tempData = {
      //   email: data?.email,
      //   password: data?.password,
      //   user_name: data?.username,
      //   phone_number: '',
      //   company_name: data?.companyName,
      //   company_location: data?.companyLocation,
      //   designation: data?.designation,
      //   role_id: 2,
      // };
    } else {
      formData.append("email", email)
      formData.append("phone_number", phone_number)
      formData.append("user_name", user_name)
      formData.append("password", password)
      formData.append("role_id", role_id)
      formData.append("filePath", resumeFile)

      // tempData = {
      //   email: data?.email,
      //   password: data?.password,
      //   user_name: data?.username,
      //   phone_number: data?.mobileNo,
      //   role_id: 3,
      // };
    }
    try {
      await register(formData)
      enqueueSnackbar(type === 2 ? "Company registered successfully" : "Candidate registered successfully", {
        variant: "success",
      })
      reset()
    } catch (error) {
      console.error(error)
      enqueueSnackbar(error?.message || "Failed to create", {
        variant: "error",
      })
      // reset();

      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      })
    }
  }

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <GuestGuard>
        <StyledRoot>
          <StyledContent
            sx={{
              width: "100%",
              minHeight: "auto",
              height: "100vh",
              padding: 0,
              margin: 0,
              maxWidth: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                height: "100%",
                width: "100%",
              }}
            >
              {/* Left side - Form */}
              <Box
                width={{ xs: "100%", md: "50%" }}
                sx={{
                  padding: { xs: 3, sm: 5, md: 8 },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#0A2239",
                    fontSize: { xs: pxToRem(40), xl: pxToRem(48) },
                    lineHeight: 1.2,
                    textAlign: "center",
                    mb: 6,
                    mt: 4,
                  }}
                >
                  CREATE ACCOUNT
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setType(2)
                        setValue("role_id", "2")
                      }}
                      sx={{
                        px: 4,
                        py: 1,
                        borderRadius: 0,
                        bgcolor: type === 2 ? "#0A2239" : "transparent",
                        color: type === 2 ? "white" : "#0A2239",
                        "&:hover": {
                          bgcolor: type === 2 ? "#0A2239" : "rgba(10, 34, 57, 0.1)",
                        },
                      }}
                    >
                      Employer
                    </Button>
                    <Button
                      onClick={() => {
                        setType(3)
                        setValue("role_id", "3")
                      }}
                      sx={{
                        px: 4,
                        py: 1,
                        borderRadius: 0,
                        bgcolor: type === 3 ? "#0A2239" : "transparent",
                        color: type === 3 ? "white" : "#0A2239",
                        "&:hover": {
                          bgcolor: type === 3 ? "#0A2239" : "rgba(10, 34, 57, 0.1)",
                        },
                      }}
                    >
                      Candidate
                    </Button>
                  </Box>
                </Box>

                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  {type === 3 ? (
                    <Box
                      sx={{
                        border: "1px dashed #ccc",
                        borderRadius: "8px",
                        padding: 3,
                        mb: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: "#0A2239",
                            fontSize: pxToRem(16),
                            textTransform: "uppercase",
                          }}
                        >
                          UPLOAD YOUR RESUME*
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          bgcolor: "#0A2239",
                          color: "white",
                          "&:hover": {
                            bgcolor: "#0A2239",
                            opacity: 0.9,
                          },
                          textTransform: "uppercase",
                          borderRadius: "4px",
                          padding: "10px 20px",
                        }}
                      >
                        CHOOSE FILE
                        <input type="file" accept=".pdf,.doc" onChange={handleFileChange} style={{ display: "none" }} />
                      </Button>
                    </Box>
                  ) : null}

                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>First name</Typography>
                      <RHFTextField
                        hiddenLabel
                        name="user_name"
                        placeholder="enter your first name"
                        required
                        border="1px solid #ddd"
                        sx={{ bgcolor: "white" }}
                      />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Last name</Typography>
                      <RHFTextField
                        hiddenLabel
                        name="last_name"
                        placeholder="enter your last name"
                        border="1px solid #ddd"
                        sx={{ bgcolor: "white" }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Contact number</Typography>
                      <RHFTextField
                        hiddenLabel
                        type="number"
                        name="phone_number"
                        placeholder="enter your contact number"
                        required
                        border="1px solid #ddd"
                        sx={{ bgcolor: "white" }}
                      />
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Email</Typography>
                      <RHFTextField
                        hiddenLabel
                        name="email"
                        placeholder="enter your email"
                        required
                        border="1px solid #ddd"
                        sx={{ bgcolor: "white" }}
                      />
                    </Box>
                  </Box>

                  {type === 2 && (
                    <>
                      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                        <Box sx={{ width: "50%" }}>
                          <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Company</Typography>
                          <RHFTextField
                            hiddenLabel
                            name="company_name"
                            placeholder="enter your company name"
                            required
                            border="1px solid #ddd"
                            sx={{ bgcolor: "white" }}
                          />
                        </Box>
                        <Box sx={{ width: "50%" }}>
                          <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Role</Typography>
                          <RHFTextField
                            hiddenLabel
                            name="designation"
                            placeholder="enter your designation"
                            required
                            border="1px solid #ddd"
                            sx={{ bgcolor: "white" }}
                          />
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Company location</Typography>
                        <RHFTextField
                          hiddenLabel
                          name="company_location"
                          placeholder="enter your company location"
                          required
                          border="1px solid #ddd"
                          sx={{ bgcolor: "white" }}
                        />
                      </Box>
                    </>
                  )}

                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Password</Typography>
                    <RHFTextField
                      hiddenLabel
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="set a password"
                      required
                      border="1px solid #ddd"
                      sx={{ bgcolor: "white" }}
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

                  <Box sx={{ mb: 5 }}>
                    <Typography sx={{ mb: 1, fontSize: "14px", color: "#555" }}>Re-type password</Typography>
                    <RHFTextField
                      hiddenLabel
                      type={showConfPassword ? "text" : "password"}
                      name="confirm_password"
                      placeholder="confirm your password"
                      required
                      border="1px solid #ddd"
                      sx={{ bgcolor: "white" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfPassword(!showConfPassword)} edge="end">
                              <Iconify icon={showConfPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <LoadingButton
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                      width: 200,
                      py: 1.5,
                      fontSize: 16,
                      fontWeight: 700,
                      bgcolor: "#0A2239",
                      textAlign: "center",
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: "#0A2239",
                        opacity: 0.9,
                      },
                    }}
                  >
                    Create account
                  </LoadingButton>
                </FormProvider>
              </Box>

              {/* Right side - Image */}
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  backgroundImage: `url(${type === 2 ? "/assets/signup.png" : "/assets/signup.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      top: "0%",
                      left: "0%",
                      padding: 5,
                      maxWidth: "80%",
                      color: "#0a2239",
                      fontSize: { xs: pxToRem(40), md: pxToRem(50), lg: pxToRem(60) },
                      fontWeight: 700,
                      lineHeight: 1.1,
                    }}
                  >
                    {type === 2 ? (
                      <>
                        Recruit
                        <br />
                        Smarter,
                        <br />
                        <span
                          style={{
                            color: "#transparent",
                            WebkitTextStroke: "2px #0A2239",
                            textShadow: "none",
                          }}
                        >
                          Hire
                          <br />
                          Faster
                        </span>
                      </>
                    ) : (
                      <>
                        Join us,
                        <br />
                        elevate
                        <br />
                        <span
                          style={{
                            color: "transparent",
                            WebkitTextStroke: "2px #0A2239",
                            textShadow: "none",
                          }}
                        >
                          your
                          <br />
                          career.
                        </span>
                      </>
                    )}
                  </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                  }}
                />
              </Box>
            </Box>
          </StyledContent>
        </StyledRoot>
        {open && (
          <LoginAsModal
            open={open}
            handleClose={handleClose}
            // roleId={roleId}
            // setRoleId={setRoleId}
            handleOpen={handleOpen}
            setValue={setValue}
            setType={setType}
            isSignUp
          />
        )}
      </GuestGuard>
    </>
  )
}

export default SignUp

