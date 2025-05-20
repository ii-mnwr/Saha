"use client"

import { useEffect, useState, useRef } from "react"
//
import Scrollbar from "../../../../components/scrollbar"
import Lightbox from "../../../../components/lightbox"
//
import ChatMessageItem from "./ChatMessageItem"

// ----------------------------------------------------------------------

type Props = {
  conversation: any
}

export default function ChatMessageList({ conversation }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const [selectedImage, setSelectedImage] = useState<number>(-1)

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }
    scrollMessagesToBottom()
  }, [conversation])

  const imagesLightbox = conversation?.messages
    ?.filter((messages: any) => messages?.contentType === "image")
    ?.map((messages: any) => ({ src: messages.body }))

  const handleOpenLightbox = (imageUrl: string) => {
    const imageIndex = imagesLightbox?.findIndex((image: any) => image?.src === imageUrl)
    setSelectedImage(imageIndex)
  }

  const handleCloseLightbox = () => {
    setSelectedImage(-1)
  }

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{
          ref: scrollRef,
        }}
        sx={{
          p: 2,
          height: 1,
          background: "#FFFFFF",
          "& .simplebar-content": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: 2,
            paddingBottom: 2,
          },
        }}
      >
        {conversation?.map((message: any) => (
          <ChatMessageItem
            key={message?.id}
            message={message}
            conversation={conversation}
            onOpenLightbox={() => handleOpenLightbox(message.body)}
          />
        ))}
      </Scrollbar>

      <Lightbox index={selectedImage} slides={imagesLightbox} open={selectedImage >= 0} close={handleCloseLightbox} />
    </>
  )
}
