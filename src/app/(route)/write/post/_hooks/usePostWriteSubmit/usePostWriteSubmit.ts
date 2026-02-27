import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useWriteStore } from "@/store";
import { PostWriteFormValues } from "../../_types/PostWriteType";
import { PostWriteRequest, usePostPosts } from "@/api/fetch/post";

interface UsePostWriteSubmitProps {
  methods: UseFormReturn<PostWriteFormValues>;
}

const usePostWriteSubmit = ({ methods }: UsePostWriteSubmitProps) => {
  const { lat, lng, address, radius, postType, clearLocation } = useWriteStore();

  useEffect(() => {
    methods.setValue("postType", postType ?? "", { shouldValidate: true });
    methods.setValue("address", address ?? "", { shouldValidate: true });
    methods.setValue("latitude", lat ?? null, { shouldValidate: true });
    methods.setValue("longitude", lng ?? null, { shouldValidate: true });
    methods.setValue("radius", radius ?? null, { shouldValidate: true });
  }, [postType, address, lat, lng, radius, methods]);

  const canSubmit = (values: PostWriteFormValues) => {
    if (!postType) return false;
    if (!address) return false;
    if (lat == null || lng == null || radius == null) return false;
    if (!values.category) return false;
    if (!values.title || !values.content) return false;

    return true;
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<PostWriteFormValues | null>(null);

  const { mutateAsync: postPosts, isPending: isPosting } = usePostPosts();

  const toPostWriteFormData = (values: PostWriteFormValues): FormData | null => {
    if (!postType || !values.category) return null;
    if (!address || lat == null || lng == null || radius == null) return null;

    const request: PostWriteRequest = {
      postType: postType,
      title: values.title,
      category: values.category,
      content: values.content,
      address: address,
      latitude: lat,
      longitude: lng,
      radius: radius,
      date: new Date().toISOString(),
    };

    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
    values.images.forEach((image) => {
      if (image.file) formData.append("image", image.file);
    });

    return formData;
  };

  const submitFormData = (values: PostWriteFormValues) => {
    const formData = toPostWriteFormData(values);

    if (!formData) return;

    postPosts(formData);
    clearLocation();
  };

  const onSubmit = methods.handleSubmit((values) => {
    const validImages = values.images.filter((image) => image.file);
    if (validImages.length === 0) {
      setPendingValues(values);
      setIsConfirmModalOpen(true);
      return;
    }

    submitFormData(values);
  });

  const onConfirmNoImageSubmit = () => {
    if (pendingValues) {
      submitFormData(pendingValues);
    }
    setIsConfirmModalOpen(false);
    setPendingValues(null);
  };

  const onCancelSubmit = () => {
    setIsConfirmModalOpen(false);
    setPendingValues(null);
  };

  return {
    onSubmit,
    isPosting,
    canSubmit,
    isConfirmModalOpen,
    onConfirmNoImageSubmit,
    onCancelSubmit,
  };
};

export default usePostWriteSubmit;
