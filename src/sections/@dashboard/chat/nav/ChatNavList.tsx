"use client"

// next
import { useRouter } from "next/router"
// @mui
import { List, type SxProps, useMediaQuery, type Theme } from "@mui/material"
import { useAuthContext } from "src/auth/useAuthContext"
import { socket } from "src/socket"
// hooks
import useResponsive from "../../../../hooks/useResponsive"
// components
//
import ChatNavItem from "./ChatNavItem"

// ----------------------------------------------------------------------

const CURRENT_USER_ID = "8864c717-587d-472a-929a-8e5f298024da-0"

type Props = {
  conversations: any
  openNav: boolean
  onCloseNav: VoidFunction
  selected: (conversationId: string) => boolean
  sx?: SxProps
  roomData: any
  activeChatId: any
  setActiveChatId: any
}

export default function ChatNavList({
  conversations,
  openNav,
  onCloseNav,
  selected,
  sx,
  roomData,
  activeChatId,
  setActiveChatId,
  ...other
}: Props) {
  const { push } = useRouter()
  const { user } = useAuthContext()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  const isDesktop = useResponsive("up", "md")

  const handleSelectConversation = (conversation: any) => {
    console.log("handleSelectConversation", conversation)
    setActiveChatId({
      receiver_id: conversation?.User?.id || conversation?.id,
      receiver_type: conversation?.User?.role_id || conversation?.role_id,
      user_name: conversation?.User?.user_name || conversation?.user_name,
      profile: conversation?.User?.profile_image_path,
    })
    socket.emit("req", {
      en: "JOIN_ROOM",
      data: {
        sender_id: user?.id || user?.employee_id || user?.candidate_id,
        receiver_id: conversation?.User?.id || conversation?.id,
      },
    })
  }

  // Sort conversations by the most recent message timestamp
  const sortedConversations =
    conversations && Array.isArray(conversations)
      ? [...conversations].sort((a, b) => {
          const aTimestamp = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0
          const bTimestamp = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0
          return bTimestamp - aTimestamp // Sort in descending order (newest first)
        })
      : []

  // Always show names on mobile
  const forceOpenNav = isMobile || openNav

  return (
    <List disablePadding sx={sx} {...other}>
      {sortedConversations?.map((conversation: any, index: any) => {
        return (
          <ChatNavItem
            key={conversation?.id || index}
            openNav={forceOpenNav} // Force open on mobile
            conversation={conversation}
            isSelected={selected(conversation?.User?.id)}
            onSelect={() => {
              if (!isDesktop) {
                onCloseNav()
              }
              handleSelectConversation(conversation)
            }}
            roomData={roomData}
          />
        )
      })}
    </List>
  )
}
