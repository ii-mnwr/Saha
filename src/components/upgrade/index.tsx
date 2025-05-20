"use client"

import { Box, Card, Container, Grid, Typography, Breadcrumbs, Link } from "@mui/material"
import { useState } from "react"
import { createCheckoutSession, upgradePlan, useGetAllPlans, useGetCurrentPlan } from "src/hooks/useSubscription"
import { useAuthContext } from "src/auth/useAuthContext"
import { useSnackbar } from "src/components/snackbar"
import { LoadingButton } from "@mui/lab"
import { getStripe } from "./stipe"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

const UpgradeComponent = () => {
  const { getCurrentPlan } = useGetCurrentPlan()

  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAuthContext()

  const [loader, setLoader] = useState(-1)

  const { getAllPlans } = useGetAllPlans()

  const { data: plansList } = getAllPlans || {}

  const handlePricing = async (price_Id: string) => {
    try {
      console.log(price_Id)

      const payload = {
        price_id: price_Id,
        email: user?.email,
      }
      const stripe = await getStripe() /// geting stripe object

      let session
      if (getCurrentPlan?.data?.data?.Plan?.name?.toLowerCase() !== "basic") {
        session = await upgradePlan({ price_id: price_Id })
      } else {
        session = await createCheckoutSession(payload)
      }

      setLoader(-1)

      const result = stripe?.redirectToCheckout({
        sessionId: session?.data?.session_id,
      })

      console.log("stripeResult")
    } catch (error) {
      enqueueSnackbar(error?.message || "Failed to save", {
        variant: "error",
      })
      setLoader(-1)
    }
  }

  return (
    <Box sx={{ bgcolor: "#f0f0f0", borderRadius: 2, p: 3 }}>
      {/* Pricing header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Work Sans,sans-serif",
            fontSize: { xs: 24, md: 28 },
            fontWeight: 600,
            color: "#0A2647",
            mb: 1,
          }}
        >
          TalentsReach pricing plans are designed to meet your needs as you grow
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Work Sans,sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: "#333",
          }}
        >
          Choose a plan that works best for you
        </Typography>
      </Box>

      {/* Pricing cards */}
      <Container maxWidth="lg" sx={{ px: { xs: 1, md: 2 } }}>
        <Grid container spacing={3} justifyContent="center">
          {plansList?.data?.map((plan: any, ind: number) => {
            const isBasic = plan?.name === "Basic"
            const isPremium = plan?.name === "Premium"
            const isPlatinum = plan?.name === "Platinum"
            const isCurrentPlan = getCurrentPlan?.data?.data?.Plan?.name === plan?.name
            const price = plan?.price || (isBasic ? 0 : isPremium ? 59 : 99)

            return (
              <Grid item xs={12} md={4} key={ind}>
                <Card
                  sx={{
                    height: "100%",
                    minHeight: 450,
                    position: "relative",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {isPremium && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -16,
                        left: 0,
                        right: 0,
                        bgcolor: "#FFF08D",
                        py: 0.5,
                        textAlign: "center",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        Popular
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ p: 4, textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    {/* Plan name */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Work Sans,sans-serif",
                        fontWeight: 700,
                        mb: 2,
                      }}
                    >
                      {plan?.name}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        component="span"
                        sx={{
                          color: "#0A2647",
                          fontSize: 20,
                          fontWeight: 600,
                          verticalAlign: "top",
                        }}
                      >
                        $
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          color: "#0A2647",
                          fontSize: 48,
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        {price}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          color: "#666",
                          fontSize: 16,
                          ml: 0.5,
                        }}
                      >
                        /month
                      </Typography>
                    </Box>

                    {/* Features */}
                    <Box sx={{ textAlign: "left", mb: 4, flexGrow: 1 }}>
                      {plan?.features?.unlimitedJobApplications && (
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          Unlimited Job Applications
                        </Typography>
                      )}
                      {plan?.features?.unlimitedJobSearch && (
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          Unlimited Job search
                        </Typography>
                      )}
                      {plan?.features?.unlimitedNewJobViewing && (
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          Unlimited new job viewing
                        </Typography>
                      )}
                      {plan?.features?.unlimitedResumeBuilder && (
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          Unlimited Resume Builder
                        </Typography>
                      )}
                      {plan?.features?.jobAssistance && (
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          Job assistance
                        </Typography>
                      )}
                      {plan?.features?.getPrepared && (
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          Get prepared
                        </Typography>
                      )}
                      {plan?.features?.learningAndCertifications && (
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          Learning and certifications
                        </Typography>
                      )}
                    </Box>

                    {/* Button - only show for non-Basic plans */}
                    {!isBasic && (
                      <Box sx={{ mt: "auto" }}>
                        <LoadingButton
                          fullWidth
                          variant={isCurrentPlan ? "outlined" : "outlined"}
                          sx={{
                            borderColor: isCurrentPlan ? "#ccc" : "#0A2647",
                            color: isCurrentPlan ? "#999" : "#0A2647",
                            bgcolor: isCurrentPlan ? "#f5f5f5" : "transparent",
                            fontWeight: 500,
                            py: 1,
                            "&:hover": {
                              borderColor: isCurrentPlan ? "#ccc" : "#0A2647",
                              bgcolor: isCurrentPlan ? "#f5f5f5" : "rgba(10, 38, 71, 0.04)",
                            },
                          }}
                          loading={loader === ind}
                          disabled={isCurrentPlan}
                          onClick={() => {
                            if (!isCurrentPlan) {
                              setLoader(ind)
                              handlePricing(plan?.stripe_price_id)
                            }
                          }}
                        >
                          {isCurrentPlan ? "Current plan" : "Switch to this plan"}
                        </LoadingButton>
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default UpgradeComponent