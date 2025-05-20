"use client"

import type React from "react"
import { useRef, useState } from "react"
// @mui
import { InputBase, type InputBaseProps, InputAdornment, Button, Box, useMediaQuery, type Theme, Stack } from "@mui/material"
import { socket } from "src/socket"
import { useAuthContext } from "src/auth/useAuthContext"
import type { IChatSendMessage } from "../../../../@types/chat"

// ----------------------------------------------------------------------

const CURRENT_USER_ID = "8864c717-587d-472a-929a-8e5f298024da-0"

interface Props extends InputBaseProps {
  conversationId: string | null
  onSend: (data: IChatSendMessage) => void
  roomData: any
  activeChatId: any
}

export default function ChatMessageInput({
  disabled,
  conversationId,
  onSend,
  roomData,
  sx,
  activeChatId,
  ...other
}: Props) {
  const { user } = useAuthContext()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [message, setMessage] = useState("")

  const handleClickAttach = () => {
    fileInputRef.current?.click()
  }

  const handleSendMessage = () => {
    socket.emit("req", {
      en: "SEND_MESSAGE",
      data: {
        sender_id: user?.employee_id || user?.candidate_id || user?.id,
        sender_type: user?.role_id,
        receiver_id: activeChatId?.receiver_id,
        receiver_type: activeChatId?.receiver_type,
        content: message,
        room_id: roomData?.id,
      },
    })
    setMessage("")
  }

  const handleSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!message?.trim()) return
    if (event.shiftKey && event.key === "Enter") return
    if (event.key === "Enter") {
      handleSendMessage()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text/plain")
    setMessage((prevMessage) => prevMessage + pastedText)
    event.preventDefault()
  }

  return (
    <>
      <Box
        sx={{
          p: { xs: 1.5, sm: 2.5 }, // Increased padding for more height
          backgroundColor: "#D9D9D9",
          borderTop: "1px solid #EEEEEE",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Stack direction="row" spacing={2.5} alignItems="flex-end">
          <InputBase
            multiline
            maxRows={isMobile ? 3 : 6}
            value={message}
            onKeyUp={handleSend}
            onChange={(event) => setMessage(event.target.value)}
            onPaste={handlePaste}
            placeholder="type your message"
            sx={{
              flex: 1,
              pl: { xs: 1.5, sm: 2 },
              pr: 1,
              py: { xs: 1, sm: 1.25 }, // Increased padding for more height
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #EEEEEE",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              "& .MuiInputBase-inputMultiline": {
                overflow: "auto",
                resize: "none",
              },
              ...sx,
            }}
            {...other}
          />
          <Button
            variant="contained"
            sx={{
              height: 'fit-content',
              backgroundColor: "#FFBB00",
              color: "#FFFFFF",
              borderRadius: "20px",
              px: { xs: 2, sm: 3 },
              py: { xs: 1.1, sm: 1.3 }, // Match input field height
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              "&:hover": {
                backgroundColor: "#E5A800",
              },
              "&.Mui-disabled": {
                backgroundColor: "#ffbb00",
                color: "#FFFFFF",
              },
            }}
            disabled={!message?.trim()}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Stack>
      </Box>

      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
    </>
  )
}