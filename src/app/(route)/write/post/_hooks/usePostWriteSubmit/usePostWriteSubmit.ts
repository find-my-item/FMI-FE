import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useWriteStore } from "@/store";
import { PostWriteFormValues } from "../../_types/PostWriteType";
import { PostPostsWriteRequestBody, usePostPosts } from "@/api/fetch/post";

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

  const { mutateAsync: postPosts, isPending: isPosting } = usePostPosts();

  const toPostWriteFormData = (values: PostWriteFormValues): FormData | null => {
    if (!postType || !values.category) return null;
    if (!address || lat == null || lng == null || radius == null) return null;

    const request = {
      postType: postType,
      title: values.title,
      category: values.category,
      content: values.content,
      address: address,
      latitude: lat,
      longitude: lng,
      radius: radius,
      date: new Date().toISOString(),
      temporarySave: values.temporarySave,
    };

    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
    values.images.forEach(({ file }) => formData.append("image", file));

    return formData;
  };

  const onSubmit = methods.handleSubmit((values) => {
    const formData = toPostWriteFormData(values);

    if (!formData) return;

    postPosts(formData as unknown as PostPostsWriteRequestBody);
    clearLocation();
  });

  return { onSubmit, isPosting, canSubmit };
};

export default usePostWriteSubmit;
