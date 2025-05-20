"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
// @mui
import { useTheme, styled } from "@mui/material/styles"
import { Box, IconButton, type IconButtonProps, Divider, useMediaQuery, type Theme } from "@mui/material"
// hooks
import { socket } from "src/socket"
import { useAuthContext } from "src/auth/useAuthContext"
import useResponsive from "../../../../hooks/useResponsive"
import Scrollbar from "../../../../components/scrollbar"
//
import ChatNavList from "./ChatNavList"
import ChatNavSearch from "./ChatNavSearch"
import ChatNavSearchResults from "./ChatNavSearchResults"
import { useSearchParams } from "next/navigation"

// ----------------------------------------------------------------------

const StyledToggleButton = styled((props) => <IconButton disableRipple {...props} />)<IconButtonProps>(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  "&:hover": {
    backgroundColor: theme.palette.primary.darker,
  },
}))

// ----------------------------------------------------------------------

const NAV_WIDTH = 320

const NAV_COLLAPSE_WIDTH = 96

type Props = {
  conversations: any
  activeConversationId: string | null
  roomData: any
  searchResults: any
  setSearchResults: any
  activeChatId: any
  setActiveChatId: any
  conversationKey: string
  onClose?: () => void
}

export default function ChatNav({
  conversations,
  activeConversationId,
  roomData,
  searchResults,
  setSearchResults,
  activeChatId,
  setActiveChatId,
  conversationKey,
  onClose,
}: Props) {
  const theme = useTheme()
  const { user } = useAuthContext()

  const { push } = useRouter()

  const isDesktop = useResponsive("up", "md")
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  const [openNav, setOpenNav] = useState(true)
  const [searchContacts, setSearchContacts] = useState(conversationKey || "")

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams) {
      const searchUser = searchParams.get("user") || ""
      setSearchContacts(searchUser)
      socket.emit("req", {
        en: "FIND_USER",
        data: {
          search: searchUser,
        },
      })
    }
  }, [searchParams])

  const isCollapse = isDesktop && !openNav

  useEffect(() => {
    if (!isDesktop) {
      handleCloseNav()
    } else {
      handleOpenNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop])

  const handleToggleNav = () => {
    setOpenNav(!openNav)
  }

  const handleOpenNav = () => {
    setOpenNav(true)
  }

  const handleCloseNav = () => {
    setOpenNav(false)
    if (onClose) onClose()
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value === "") {
      socket.emit("req", {
        en: "USER_LIST",
        data: {
          user_id: user?.id || user?.candidate_id || user?.employee_id,
        },
      })
      setSearchContacts(value)
      return
    }
    setSearchContacts(value)

    socket.emit("req", {
      en: "FIND_USER",
      data: {
        search: value,
      },
    })
  }

  const handleSelectContact = (result: any) => {
    setSearchContacts("")
    setActiveChatId(() => ({
      receiver_id: result?.User?.id || result?.employee_id || result?.candidate_id,
      receiver_type: result?.User?.role_id,
      user_name: result?.User?.user_name,
    }))
    socket.emit("req", {
      en: "JOIN_ROOM",
      data: {
        sender_id: user?.id || user?.employee_id || user?.candidate_id,
        receiver_id: result?.User?.id || result.employee_id || result.candidate_id,
      },
    })
    if (isMobile && onClose) {
      onClose()
    }
  }

  const renderContent = (
    <>
      <Box sx={{ p: { xs: 1.5, sm: 2 }, backgroundColor: "#FFFFFF" }}>
        <ChatNavSearch value={searchContacts} onChange={handleChangeSearch} onClickAway={() => setSearchContacts("")} />
      </Box>

      <Divider sx={{ borderColor: "#EEEEEE" }} />

      <Scrollbar
        sx={{
          height: "calc(100% - 60px)",
          backgroundColor: "#FFFFFF",
        }}
      >
        {!searchContacts ? (
          <ChatNavList
            openNav={openNav}
            onCloseNav={handleCloseNav}
            conversations={conversations}
            selected={(conversationId: string) => activeChatId?.receiver_id === conversationId}
            roomData={roomData}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
          />
        ) : (
          <ChatNavSearchResults
            searchContacts={searchContacts}
            searchResults={searchResults}
            onSelectContact={(result: any) => handleSelectContact(result)}
          />
        )}
      </Scrollbar>
    </>
  )

  return <Box sx={{ height: "100%", width: "100%" }}>{renderContent}</Box>
}
