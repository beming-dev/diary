const session_option = {
  cookieName: "diary-cookie",
  password: process.env.NEXT_PUBLIC_COOKIE_PW,
  maxAge: 60,
};

export { session_option };
