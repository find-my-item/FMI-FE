const fetchRefreshToken = (refreshToken: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${refreshToken}`,
    },
  });
};

export default fetchRefreshToken;
