import auth, { LoginBody, RergisterBody } from "@/api/endpoints/auth";
import { useState } from "react";
import useUserStore from "./useStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default () => {
  const { user } = useUserStore();
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
    } else if (status === 200) {
      localStorage.setItem("authToken", data.token);
      user.hasAuth = true;
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
