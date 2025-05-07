import auth, { LoginBody, RergisterBody } from "@/api/endpoints/auth";
import { useState } from "react";
import useUserStore from "./stores/useUserStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState({
    error: "",
  });

  const makeAuth = async (params: LoginBody) => {
    const { status, data } = await auth.login(params);
    if (status === 401) {
      setAuthStatus({
        error: "Неверный логин или пароль",
      });
    } else if (status === 201) {
      localStorage.setItem("authToken", data.accessToken);
      toast.success("Авторизация прошла успешно");
      user.hasAuth = true;
      setUser();
      navigate("/");
    }
  };

  const makeRegister = async (body: Partial<RergisterBody>) => {
    const { status, data } = await auth.register(body);
    if (status === 201) {
      toast.success("Регистрация прошла успешно");
      navigate("/auth/login");
    }
  };
  return {
    makeAuth,
    makeRegister,
    authStatus,
  };
};
