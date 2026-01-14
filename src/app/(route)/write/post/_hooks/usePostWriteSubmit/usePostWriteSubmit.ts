import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useWriteStore } from "@/store";
import { PostWriteFormValues } from "../../_types/PostWriteType";
import { PostPostsWriteRequestBody, usePostPosts } from "@/api/fetch/post";

interface UsePostWriteSubmitProps {
  methods: UseFormReturn<PostWriteFormValues>;
}

const usePostWriteSubmit = ({ methods }: UsePostWriteSubmitProps) => {
  const { lat, lng, location, radius, type, clearLocation } = useWriteStore();

  useEffect(() => {
    methods.setValue("postType", type ?? "", { shouldValidate: true });
    methods.setValue("address", location ?? "", { shouldValidate: true });
    methods.setValue("latitude", lat ?? null, { shouldValidate: true });
    methods.setValue("longitude", lng ?? null, { shouldValidate: true });
    methods.setValue("radius", radius ?? null, { shouldValidate: true });
  }, [type, location, lat, lng, radius, methods]);

  const { mutateAsync: postPosts } = usePostPosts();

  const toPostWriteFormData = (values: PostWriteFormValues): FormData | null => {
    if (!type || !values.category) return null;
    if (!location || lat == null || lng == null || radius == null) return null;

    // TODO(지권): 정적 값 수정
    const request = {
      postType: type,
      title: values.title,
      category: "BAG",
      content: values.content,
      address: location,
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

  return { onSubmit };
};

export default usePostWriteSubmit;
