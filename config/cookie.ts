const session_option = {
  cookieName: "diary-cookie",
  password: process.env.NEXT_PUBLIC_COOKIE_PW || "fsdklhgskadjlhfkjlsdhfgk23k4",
  duration: 80000,
};

export { session_option };
