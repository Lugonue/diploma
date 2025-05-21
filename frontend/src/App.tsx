import Layout from "components/layouts";
import AdminLayout from "components/layouts/AdminLayout";
import ContentLayout from "components/layouts/ContentLayout";
import LoginLayout from "components/layouts/LoginLayout";
import useUserStore from "hooks/stores/useUserStore";
import { useTranslation } from "react-i18next";
import { Route, BrowserRouter as Router, Routes, UNSAFE_createBrowserHistory } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Catalog from "./pages/Catalog";
import Error500 from "./pages/Error500";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrePage";
import UserProfile from "./pages/UserProfile";
import AuthGuard from "components/AuthGuard";
import Order from "./pages/Order";


const App = () => {
    const { ready } = useTranslation();


    if (!ready) return <div>Loading...</div>;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="" element={<AuthGuard component={<ContentLayout />} />} >
                        <Route path="" element={<AuthGuard component={<HomePage />} />} />
                        <Route path="catalog" element={<Catalog />} />
                        <Route path="profile" element={<UserProfile />} >
                            <Route path="order" element={<Order />} />
                        </Route>

                    </Route>
                    <Route path="auth" element={<LoginLayout />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                    </Route>
                    <Route path="admin" element={<AuthGuard admin={true} component={<AdminLayout />} />}>
                        <Route path="" element={<AdminPage />} />
                    </Route>
                    <Route path="500" element={<Error500 />} />
                </Route>

            </Routes>
        </Router >
    )
}

export default App