"use client";

import { useState } from "react";
import { usePostPostsComments } from "@/api/fetch/comment";
import { UseFormReturn } from "react-hook-form";

interface UsePostCommentSubmitProps {
  postId: number;
  methods: UseFormReturn<{ content: string }>;
  isLoggedIn: boolean;
  openGuestModal: () => void;
}

export const usePostCommentSubmit = ({
  postId,
  methods,
  isLoggedIn,
  openGuestModal,
}: UsePostCommentSubmitProps) => {
  const [images, setImages] = useState<File[]>([]);
  const { mutate, isPending } = usePostPostsComments(postId);

  const handleCommentSubmit = (data: { content: string }) => {
    if (!isLoggedIn) {
      openGuestModal();
      return;
    }

    if (isPending) return;

    const formData = new FormData();
    const request = { content: data.content };

    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
    images.forEach((image) => formData.append("images", image));

    mutate(formData, {
      onSuccess: () => {
        methods.reset({ content: "" });
        setImages([]);
      },
    });
  };

  return {
    handleCommentSubmit,
    isPending,
    images,
    setImages,
  };
};
