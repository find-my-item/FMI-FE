"use client";

import { SelectedImage } from "@/types/SelectedImage";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { MockChatDataType } from "@/app/(route)/chat/_types/MockChatDataType";

interface ComposeInputContextType {
  chats: MockChatDataType[];
  setChats: Dispatch<SetStateAction<MockChatDataType[]>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  selectedImages: SelectedImage[];
  setSelectedImages: Dispatch<SetStateAction<SelectedImage[]>>;
}

interface ComposeInputProviderProps {
  children: ReactNode;
  initialChats?: MockChatDataType[];
  initialImages?: File[];
}

const ComposeInputContext = createContext<ComposeInputContextType | undefined>(undefined);

/**
 * 채팅·댓글 입력 공통 상태(첨부 이미지, 채팅 메시지 목록, 선택 이미지 등)를 제공하는 프로바이더입니다.
 */
export const ComposeInputProvider = ({
  children,
  initialChats = [],
  initialImages = [],
}: ComposeInputProviderProps) => {
  const [chats, setChats] = useState<MockChatDataType[]>(initialChats);
  const [images, setImages] = useState<File[]>(initialImages);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  return (
    <ComposeInputContext.Provider
      value={{ chats, setChats, images, setImages, selectedImages, setSelectedImages }}
    >
      {children}
    </ComposeInputContext.Provider>
  );
};

/**
 * 채팅·댓글 입력 공통 상태를 사용하는 훅입니다. ComposeInputProvider 하위에서만 사용할 수 있습니다.
 */
export const useComposeInput = () => {
  const context = useContext(ComposeInputContext);
  if (!context) {
    throw new Error("useComposeInput must be used within ComposeInputProvider");
  }

  return context;
};
