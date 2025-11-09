"use client";

import { SelectedImage } from "@/types/SelectedImage";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { MockChatDataType } from "@/app/(route)/chat/[roomId]/_types/MockChatDataType";

interface ChatRoomContextType {
  chats: MockChatDataType[];
  setChats: Dispatch<SetStateAction<MockChatDataType[]>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  selectedImages: SelectedImage[];
  setSelectedImages: Dispatch<SetStateAction<SelectedImage[]>>;
}

interface ChatRoomProviderProps {
  children: ReactNode;
  initialChats?: MockChatDataType[];
  initialImages?: File[];
}

const ChatRoomContext = createContext<ChatRoomContextType | undefined>(undefined);

export const ChatRoomProvider = ({
  children,
  initialChats = [],
  initialImages = [],
}: ChatRoomProviderProps) => {
  // const [chats, setChats] = useState(() => [...MOCK_CHAT_DATA].reverse());
  const [chats, setChats] = useState<MockChatDataType[]>(initialChats);
  const [images, setImages] = useState<File[]>(initialImages);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  return (
    <ChatRoomContext.Provider
      value={{ chats, setChats, images, setImages, selectedImages, setSelectedImages }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};

export const useChatRoom = () => {
  const context = useContext(ChatRoomContext);
  if (!context) {
    throw new Error("useChatRoom must be used within ChatRoomProvider");
  }

  return context;
};
