const session_option = {
  cookieName: "diary-cookie",
  cookieOptions: {
    secure: false,
  },
  password: process.env.COOKIE_PW || "XGEgJ6KQP4bjLeq4IWAbTIGMxxfjyDNoY",
  duration: 80000,
};

export { session_option };
