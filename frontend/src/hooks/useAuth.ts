import auth, { LoginBody } from "@/api/endpoints/auth";
import { useState } from "react";
import useUserStore from "./useStore";

export default () => {
  const { user } = useUserStore();
  const [authStatus, setAuthStatus] = useState({
    error: "",
  });
  const makeAuth = async (params: LoginBody) => {
    const { status, data } = await auth.login(params);
    if (status === 401) {
      setAuthStatus({
        error: "Неверный логин или пароль",
      });
    } else if (status === 200) {
      localStorage.setItem("authToken", data.token);
      user.hasAuth = true;
    }
  };

  return {
    makeAuth,
    authStatus,
  };
};
