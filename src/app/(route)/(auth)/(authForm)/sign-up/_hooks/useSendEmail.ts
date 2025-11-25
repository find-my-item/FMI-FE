import useAppMutation from "@/api/query/useAppMutation";

const { mutate, data, error, isPending } = useAppMutation<
  { email: string },
  { isSuccess: boolean; code: string; message: string; result: string }
>("auth", "auth/email/send-code", "post", {
  onSuccess: (data) => {
    console.log("data>>> ", data);
  },
  onError: (error) => {
    console.log("error>> ", error);
  },
});
