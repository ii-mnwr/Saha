// "use client"

/* eslint-disable no-nested-ternary */
// @mui
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
  ListItem, 
  ListItemText,
  Divider
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { ChatIcon } from "src/theme/overrides/CustomIcons"
import { useRouter } from "next/router"
import { useAuthContext } from "src/auth/useAuthContext"
import { useState } from "react"
import LoginAsModal from "src/sections/auth/LoginAsModal"
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop"
import useResponsive from "../../../hooks/useResponsive"
// config
import { HEADER } from "../../../config-global"
// components
import Logo from "../../../components/logo"
//
import AccountPopover from "../header/AccountPopover"
import NotificationsPopover from "../header/NotificationsPopover"

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

  // Navigation links
  const navLinks = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about-us" },
    { text: "Contact Us", href: "/contact-us" },
  ]

  // Mobile drawer content
  const mobileDrawer = (
    <Box sx={{ width: 250, p: 2 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Logo />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navLinks.map((link) => (
          <ListItem 
            button 
            key={link.text} 
            onClick={() => {
              router.push(link.href)
              handleDrawerToggle()
            }}
          >
            <ListItemText 
              primary={link.text} 
              sx={{ color: '#0A2239' }}
            />
          </ListItem>
        ))}
      </List>
      {!user && (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        bgcolor: "white",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ height: { xs: 64, md: 70 }, px: { xs: 1, md: 3 } }}>
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
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            mr: { xs: 'auto', md: 8 }, 
            ml: { xs: 0, md: 0 },
            scale: { xs: 0.8, md: 1 } 
          }}>
            <Logo />
          </Box>

          {/* Navigation Links - Desktop only */}
          {isDesktop && (
            <Box sx={{ display: "flex", flexGrow: 1, gap: 4 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "#0A2239",
                    fontWeight: 500,
                    fontSize: "16px",
                    "&:hover": { color: "#4a6fdc" },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          )}

          {/* Auth Buttons or User Actions */}
          {!user ? (
            isDesktop ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  sx={{
                    borderRadius: "5px",
                    px: 3,
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
                  variant="contained"
                  onClick={() => router.push("/sign-up")}
                  sx={{
                    borderRadius: "5px",
                    px: 3,
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
            ) : null // Don't show auth buttons on mobile (they're in the drawer)
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  router.push("/dashboard/chat/new")
                }}
              >
                <ChatIcon />
              </Box>
              <NotificationsPopover />
              {/* <AccountPopover /> */}
            </Box>
          )}

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
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box' },
            }}
          >
            {mobileDrawer}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  )
}