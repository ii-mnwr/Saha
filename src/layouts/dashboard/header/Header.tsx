"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useRouter } from "next/router"
import { useAuthContext } from "src/auth/useAuthContext"
import LoginAsModal from "src/sections/auth/LoginAsModal"
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop"
import useResponsive from "../../../hooks/useResponsive"
// config
import { HEADER } from "../../../config-global"
// components
import Logo from "../../../components/logo"

import AccountPopover from "./AccountPopover"
import NotificationsPopover from "./NotificationsPopover"
import { ChatIcon } from "src/theme/overrides/CustomIcons"
import NavDropdown from "../nav/NavDropdown"
import { PATH_DASHBOARD } from "src/routes/paths"
// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction
}

export default function UserHeader({ onOpenNav }: Props) {
  const theme = useTheme()
  const router = useRouter()
  const { user } = useAuthContext()
  const isDesktop = useResponsive("up", "md")
  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [openJobs, setOpenJobs] = useState(false)
  const [openServices, setOpenServices] = useState(false)

  // Account menu state
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null)
  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget)
  }
  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null)
  }

  // Using a single state variable for active dropdown
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownAnchor, setDropdownAnchor] = useState<null | HTMLElement>(null)

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>, dropdownName: string) => {
    setActiveDropdown(dropdownName)
    setDropdownAnchor(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setActiveDropdown(null)
    setDropdownAnchor(null)
  }

  // Navigation links
  const navLinks = user
    ? [
        {
          text: "Dashboard",
          href: "/dashboard",
          active: router.pathname === "/dashboard/candidate",
          hasDropdown: false,
        },
        {
          text: "Job Board",
          href: "/candidate/jobs/search-jobs",
          active:
            router.pathname.includes("/candidate/jobs/search-jobs") ||
            router.pathname.includes("/candidate/jobs/recommended-jobs") ||
            router.pathname.includes("/candidate/jobs/saved-jobs") ||
            router.pathname.includes("/candidate/jobs/applied-jobs") ||
            router.pathname.includes("/candidate/jobs/job-alerts"),
          hasDropdown: true,
          dropdownName: "jobs",
        },
        {
          text: "Candidate Services",
          href: "/dashboard/candidate/services/resume-builder",
          active:
            router.pathname.includes("/dashboard/candidate/services") ||
            router.pathname.includes("/dashboard/candidate/services/networking_oppurtunities") ||
            router.pathname.includes("/dashboard/candidate/services/get-prepared") ||
            router.pathname.includes("/dashboard/candidate/services/certification"),
          hasDropdown: true,
          dropdownName: "services",
        }, 
        {
          text: "Profile Analytics",
          href: "/candidate/updatesonmyprofile",
          active: router.pathname === "/candidate/updatesonmyprofile",
          hasDropdown: false,
        },
      ]
    : [
        { text: "About Us", href: "/about-us", active: router.pathname === "/about-us", hasDropdown: false },
        { text: "Contact Us", href: "/contact-us", active: router.pathname === "/contact-us", hasDropdown: false },
      ]

  // Mobile drawer content
  const mobileDrawer = (
    <Box sx={{ width: 250, p: 2 }} role="presentation">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Logo />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {user ? (
          <>
            <ListItemButton
              onClick={() => {
                router.push("/dashboard")
                setMobileOpen(false)
              }}
            >
              <ListItemText primary="Dashboard" sx={{ color: "#0A2239" }} />
            </ListItemButton>

            {/* Job Board */}
            <ListItemButton onClick={() => setOpenJobs(!openJobs)}>
              <ListItemText primary="Job Board" sx={{ color: "#0A2239" }} />
              {openJobs ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openJobs} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.jobs.searchJobs)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Search Jobs" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.jobs.recommendedJobs)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Recommended Jobs" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.jobs.savedJob)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Saved Jobs" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.jobs.appliedJob)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Applied Jobs" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.jobs.jobAlert)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Job Alerts" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Candidate Services */}
            <ListItemButton onClick={() => setOpenServices(!openServices)}>
              <ListItemText primary="Candidate Services" sx={{ color: "#0A2239" }} />
              {openServices ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openServices} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.services.resumeBuilder)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="CV/Resume Builder" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.services.postResume)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Post a Resume" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.services.getPrepared)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Get Prepared" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    router.push(PATH_DASHBOARD.candidate.services.certification)
                    handleDrawerToggle()
                  }}
                >
                  <ListItemText primary="Learning & Certification" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Profile Analytics */}
            <ListItemButton
              onClick={() => {
                router.push("/candidate/updatesonmyprofile")
                handleDrawerToggle()
              }}
            >
              <ListItemText primary="Profile Analytics" sx={{ color: "#0A2239" }} />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton
              onClick={() => {
                router.push("/about-us")
                handleDrawerToggle()
              }}
            >
              <ListItemText primary="About Us" sx={{ color: "#0A2239" }} />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                router.push("/contact-us")
                handleDrawerToggle()
              }}
            >
              <ListItemText primary="Contact Us" sx={{ color: "#0A2239" }} />
            </ListItemButton>
          </>
        )}
      </List>

      {!user && (
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              handleOpen()
              handleDrawerToggle()
            }}
            sx={{
              borderRadius: "5px",
              py: 1,
              borderColor: "#0A2239",
              color: "#0A2239",
              "&:hover": {
                borderColor: "#0A2239",
                bgcolor: "rgba(10, 34, 57, 0.04)",
              },
            }}
          >
            Log in
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              router.push("/sign-up")
              handleDrawerToggle()
            }}
            sx={{
              borderRadius: "5px",
              py: 1,
              bgcolor: "#0A2239",
              "&:hover": {
                bgcolor: "rgba(10, 34, 57, 0.9)",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      )}
    </Box>
  )

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        boxShadow: "none",
        bgcolor: "transparent",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          // bgcolor: "#D9D9D9",
          borderRadius: "50px",
          // my: 1,
          mx: { xs: 1, md: 2 },
          px: { xs: 1, md: 2 },
          width: "auto",
        }}
      >
        <Toolbar disableGutters sx={{ height: { xs: 64, md: 60 }, px: { xs: 1, md: 2 } }}>
          {/* Hamburger menu for mobile */}
          {!isDesktop && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", mr: { xs: "auto", md: 8 }, scale: { xs: 0.8, md: 1 }}} >
            <Logo />
          </Box>

          {/* Navigation Links - Desktop only */}
          {isDesktop && (
            <Box sx={{ display: "flex", flexGrow: 1, gap: 4, zIndex: 1 }}>
              {navLinks.map((link) => (
                <Box key={link.text} sx={{ position: "relative" }}>
                  {link.hasDropdown ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          borderBottom: link.active ? "2px solid #0A2239" : "none",
                          pb: 0,
                        }}
                        onMouseEnter={(e) => {
                          if (link.dropdownName) {
                            handleDropdownOpen(e, link.dropdownName)
                          }
                        }}
                        onClick={() => router.push(link.href)}
                      >
                        <Typography
                          sx={{
                            color: link.active ? "black" : "grey",
                            fontWeight: 550,
                            fontSize: "16px",
                            "&:hover": { color: "black" },
                          }}
                        >
                          {link.text}
                        </Typography>
                        <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 1 }} />
                      </Box>
                      {activeDropdown === link.dropdownName && dropdownAnchor && (
                        <Box
                          sx={{
                            position: "fixed",
                            top: dropdownAnchor.getBoundingClientRect().bottom,
                            left: dropdownAnchor.getBoundingClientRect().left,
                          }}
                          onMouseLeave={handleDropdownClose}
                        >
                          {link.dropdownName === "jobs" && (
                            <NavDropdown
                              title="Job Board"
                              items={[
                                {
                                  title: "Search Jobs",
                                  path: PATH_DASHBOARD.candidate.jobs.searchJobs,
                                },
                                {
                                  title: "Recommended Jobs",
                                  path: PATH_DASHBOARD.candidate.jobs.recommendedJobs,
                                },
                                {
                                  title: "Saved Jobs",
                                  path: PATH_DASHBOARD.candidate.jobs.savedJob,
                                },
                                {
                                  title: "Applied Jobs",
                                  path: PATH_DASHBOARD.candidate.jobs.appliedJob,
                                },
                                {
                                  title: "Job Alerts",
                                  path: PATH_DASHBOARD.candidate.jobs.jobAlert,
                                },
                              ]}
                              onClose={handleDropdownClose}
                            />
                          )}
                          {link.dropdownName === "services" && (
                            <NavDropdown
                              title="Candidate Services"
                              items={[
                                {
                                  title: "CV/Resume Builder",
                                  path: PATH_DASHBOARD.candidate.services.resumeBuilder,
                                },
                                {
                                  title: "Networking Opportunities",
                                  path: PATH_DASHBOARD.candidate.services.postResume,
                                },
                                {
                                  title: "Get Prepared",
                                  path: PATH_DASHBOARD.candidate.services.getPrepared,
                                },
                                {
                                  title: "Learning & Certification",
                                  path: PATH_DASHBOARD.candidate.services.certification,
                                },
                              ]}
                              onClose={handleDropdownClose}
                            />
                          )}
                        </Box>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      underline="hover"
                      sx={{
                        color: link.active ? "black" : "grey",
                        fontWeight: 550,
                        fontSize: "16px",
                        "&:hover": { color: "black" },
                        borderBottom: link.active ? "2px solid #0A2239" : "none",
                        pb: 1,
                      }}
                    >
                      {link.text}
                    </Link>
                  )}
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 1 }, ml: "auto" }}>
            {user ? (
              <>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/dashboard/chat/new")
                  }}
                >
                  <ChatIcon />
                </Box>
                <NotificationsPopover />
                <AccountPopover />
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  sx={{
                    borderRadius: "5px",
                    py: { xs: 0.5, md: 1 },
                    px: { xs: 1, md: 2 },
                    fontSize: { xs: "12px", md: "16px" },
                    borderColor: "#0A2239",
                    color: "#0A2239",
                    "&:hover": {
                      borderColor: "#0A2239",
                      bgcolor: "rgba(10, 34, 57, 0.04)",
                    },
                    mr: 1,
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push("/sign-up")}
                  sx={{
                    borderRadius: "5px",
                    py: { xs: 0.5, md: 1 },
                    px: { xs: 1, md: 2 },
                    fontSize: { xs: "12px", md: "16px" },
                    bgcolor: "#0A2239",
                    "&:hover": {
                      bgcolor: "rgba(10, 34, 57, 0.9)",
                    },
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>

          {/* Account Menu */}
          <Menu
            anchorEl={accountMenuAnchor}
            open={Boolean(accountMenuAnchor)}
            onClose={handleAccountMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleAccountMenuClose}>
              <Typography variant="body1">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>
              <Typography variant="body1">Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAccountMenuClose}>
              <Typography variant="body1">Logout</Typography>
            </MenuItem>
          </Menu>

          {/* Login Modal */}
          {open && <LoginAsModal open={open} handleClose={handleClose} handleOpen={handleOpen} />}

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box" },
            }}
          >
            {mobileDrawer}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
