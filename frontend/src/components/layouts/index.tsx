import Header from "components/template/Header";
import { Toaster } from "components/ui/sonner";
import useUserStore from "hooks/stores/useUserStore";
import { Outlet, useNavigate } from "react-router";

type Props = {};

const Layout = (props: Props) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //     if (!user.hasAuth) {
  //         navigate('/auth/login')
  //     }
  // }, [])

  return (
    <>
      <main className="min-h-screen flex flex-col bg-emerald-100 overflow-hidden pt-[5rem]">
        <Header id="header" />
        <Outlet />
        <Toaster position="top-center" />
      </main>
    </>
  );
};

export default Layout;
