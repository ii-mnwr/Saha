"use client"

import { useEffect, useState } from "react"
// next
import { useRouter } from "next/router"
// @mui
import { Container, Stack, Box, useMediaQuery, type Theme, IconButton } from "@mui/material"
// redux
import { useDispatch, useSelector } from "src/redux/store"

import { socket } from "src/socket"
import { useSnackbar } from "src/components/snackbar"

import type { IChatParticipant, IChatSendMessage } from "src/@types/chat"
import { useAuthContext } from "src/auth/useAuthContext"
import {
  getContacts,
  getConversation,
  getParticipants,
  getConversations,
  addRecipients,
  markConversationAsRead,
  resetActiveConversation,
} from "../../../redux/slices/chat"
// components
import { useSettingsContext } from "../../../components/settings"
import Iconify from "../../../components/iconify"

// sections
import ChatNav from "./nav/ChatNav"
import ChatRoom from "./room/ChatRoom"
import ChatMessageInput from "./message/ChatMessageInput"
import ChatMessageList from "./message/ChatMessageList"
import ChatHeaderDetail from "./header/ChatHeaderDetail"
import ChatHeaderCompose from "./header/ChatHeaderCompose"
import { PATH_DASHBOARD } from "src/routes/paths"

// ----------------------------------------------------------------------

const CURRENT_USER_ID = "8864c717-587d-472a-929a-8e5f298024da-0"

export default function Chat() {
  const { enqueueSnackbar } = useSnackbar()
  const { themeStretch, resetNotificationApi: resetApi, setResetNotificationApi: setResetApi } = useSettingsContext()

  const [loginData, setLoginData] = useState<any>("")
  const [allConversationList, setAllConversationList] = useState<any>([])
  const [allChat, setAllChat] = useState<any>([])
  const [roomData, setRoomData] = useState<any>("")
  const [searchResults, setSearchResults] = useState<any>([])
  const [activeChatId, setActiveChatId] = useState<any>({
    receiver_id: 2,
    receiver_type: 3,
    user_name: "",
    profile: "",
  })
  const [navOpen, setNavOpen] = useState(true)

  const { user } = useAuthContext()
  const dispatch = useDispatch()

  const {
    push,
    pathname,
    query: { conversationKey },
  } = useRouter()

  // Responsive breakpoints
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between("sm", "md"))

  const { contacts, recipients, participants, activeConversationId, conversations } = useSelector((state) => state.chat)

  const selectedConversation = useSelector(() => {
    if (activeConversationId) {
      return conversations.byId[activeConversationId]
    }

    return {
      id: "",
      messages: [],
      participants: [],
      unreadCount: 0,
      type: "",
    }
  })

  const detailView = !!conversationKey
  const displayParticipants = participants.filter((item: any) => item.id !== CURRENT_USER_ID)

  // Close nav on mobile when a conversation is selected
  useEffect(() => {
    if (isMobile && activeChatId.receiver_id) {
      setNavOpen(false)
    }
  }, [isMobile, activeChatId])

  // Set nav open state based on screen size
  useEffect(() => {
    setNavOpen(!isMobile)
  }, [isMobile])

  useEffect(() => {
    socket.emit("req", {
      en: "LOGIN",
      data: {
        user_id: user?.employee_id || user?.candidate_id || user?.id,
        role_id: user?.role_id,
      },
    })
  }, [user])

  useEffect(() => {
    if (loginData) {
      socket.emit("req", {
        en: "USER_LIST",
        data: {
          user_id: user?.id || user?.candidate_id || user?.employee_id,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData])

  useEffect(() => {
    if (roomData) {
      socket.emit("req", {
        en: "GET_HISTORY",
        data: {
          room_id: roomData?.id,
        },
      })
    }
  }, [roomData])

  useEffect(() => {
    socket.on("res", (response) => {
      console.log("response one", response?.data)
      switch (response?.data?.en) {
        case "LOGIN":
          console.log("LOGIN", response?.data)
          setLoginData((res: any) => response?.data?.data)
          socket.emit("req", {
            en: "USER_LIST",
            data: {
              user_id: user?.id || user?.candidate_id || user?.employee_id,
            },
          })
          break
        case "USER_LIST":
          console.log("USER_LIST", response)
          setAllConversationList((res: any) => response?.data?.data)
          break
        case "JOIN_ROOM":
          console.log("JOIN_ROOM", response)
          setRoomData((res: any) => response?.data?.data)
          socket.emit("req", {
            en: "USER_LIST",
            data: {
              user_id: user?.id || user?.candidate_id || user?.employee_id,
            },
          })
          socket.emit("req", {
            en: "GET_HISTORY",
            data: {
              room_id: response?.data?.data?.id,
            },
          })
          break
        case "SEND_MESSAGE":
          console.log("SEND_MESSAGE", response, "roomData", roomData)
          if (response?.data?.data?.sender_id != (user?.employee_id || user?.candidate_id || user?.id)) {
            enqueueSnackbar(response?.data?.data?.content, { variant: "success" })
            setResetApi((flag: boolean) => !flag)
          }
          socket.emit("req", {
            en: "GET_HISTORY",
            data: {
              room_id: response?.data?.data?.room_id,
            },
          })
          break
        case "GET_HISTORY":
          console.log("GET_HISTORY", response)
          setAllChat((data: any) => response?.data?.data)
          break
        case "FIND_USER":
          console.log("FIND_USER", response)
          setSearchResults((res: any) => response?.data?.data)
          setAllConversationList((res: any) => response?.data?.data)
          break
        default:
          console.log("No match socket event found", response)
      }
    })

    return () => {
      socket.off("req")
      socket.off("res")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket.on("res", (data) => {
      console.log("response", data)
    })

    socket.on("connect", () => {
      socket.emit("req", {
        en: "LOGIN",
        data: {
          user_id: user?.employee_id || user?.candidate_id || user?.id,
          role_id: user?.role_id,
        },
      })
    })

    return () => {
      socket.off("req")
      socket.off("res")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getConversations())
    dispatch(getContacts())
  }, [dispatch])

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(`${conversationKey}`))
      try {
        await dispatch(getConversation(`${conversationKey}`))
      } catch (error) {
        console.error(error)
        push(PATH_DASHBOARD.chat.new)
      }
    }

    if (conversationKey) {
      getDetails()
    } else if (activeConversationId) {
      dispatch(resetActiveConversation())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey])

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId))
    }
  }, [dispatch, activeConversationId])

  const handleAddRecipients = (selectedRecipients: IChatParticipant[]) => {
    dispatch(addRecipients(selectedRecipients))
  }

  const handleSendMessage = async (value: IChatSendMessage) => {}

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  return (
        <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: { xs: "calc(90vh - 64px)", md: "84vh" },
          gap: { xs: 0, md: 2 },
          padding: { xs: 1, sm: 2 },
          backgroundColor: "#F5F5F5",
          position: "relative",
        }}
      >
        {/* Click outside overlay - only visible when sidebar is open on mobile */}
        {isMobile && navOpen && (
          <Box
            onClick={toggleNav}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1099,
              backdropFilter: "blur(2px)",
            }}
          />
        )}

        {/* Chat Nav - Sidebar */}
        <Box
          sx={{
            width: { xs: 280, md: 320 },
            height: { xs: "100%", md: "100%" },
            position: { xs: "fixed", md: "relative" },
            left: { xs: navOpen ? 0 : -280, md: 0 },
            top: 0,
            zIndex: 1100,
            overflow: "hidden",
            transition: "left 0.3s ease",
            borderRadius: { xs: "0 16px 16px 0", md: "16px 0 0 16px" },
            boxShadow: { 
              xs: navOpen ? "4px 0 10px rgba(0, 0, 0, 0.1)" : "none",
              md: "0px 0px 10px rgba(0, 0, 0, 0.05)"
            },
            backgroundColor: "#FFFFFF",
          }}
        >
          <ChatNav
            conversations={allConversationList}
            activeConversationId={activeConversationId}
            roomData={roomData}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            conversationKey={conversationKey}
            onClose={() => setNavOpen(false)}
          />
        </Box>

        {/* Main Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
            backgroundColor: "#FFFFFF",
            height: "100%",
            width: { xs: "100%", md: "calc(100% - 320px - 16px)" },
            marginLeft: { xs: 0, md: navOpen ? 0 : "-320px" },
            transition: "margin-left 0.3s ease",
          }}
        >
          {detailView ? (
            <ChatHeaderDetail 
              participants={displayParticipants} 
              onMenuClick={isMobile ? toggleNav : undefined}
            />
          ) : (
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
              activeChatId={activeChatId}
              onMenuClick={isMobile ? toggleNav : undefined}
            />
          )}

          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: "hidden",
            }}
          >
            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <ChatMessageList conversation={allChat} />
              <ChatMessageInput
                conversationId={activeConversationId}
                onSend={handleSendMessage}
                disabled={pathname === PATH_DASHBOARD.chat.root || pathname === PATH_DASHBOARD.chat.new}
                roomData={roomData}
                activeChatId={activeChatId}
              />
            </Stack>

            {detailView && !isMobile && (
              <ChatRoom conversation={selectedConversation} participants={displayParticipants} />
            )}
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}