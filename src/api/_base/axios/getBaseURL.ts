const getBaseURL = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) return "/api";

  return process.env.NEXT_PUBLIC_API_URL;
};

export default getBaseURL;
