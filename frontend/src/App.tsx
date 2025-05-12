import Layout from "components/layouts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useTranslation } from "react-i18next";
import LoginLayout from "components/layouts/LoginLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegistrePage";
import ContentLayout from "components/layouts/ContentLayout";
import Catalog from "./pages/Catalog";
import UserProfile from "./pages/UserProfile";
import Error500 from "./pages/Error500";
import AdminLayout from "components/layouts/AdminLayout";
import AdminPage from "./pages/AdminPage";

type Props = {}

const App = (props: Props) => {
    const { t, ready } = useTranslation();

    if (!ready) return <div>Loading...</div>;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="" element={<ContentLayout />} >
                        <Route path="" element={<HomePage />} />
                        <Route path="catalog" element={<Catalog />} />
                        <Route path="profile" element={<UserProfile />} />

                    </Route>
                    <Route path="auth" element={<LoginLayout />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />

                    </Route>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="" element={<AdminPage />} />
                    </Route>
                    <Route path="500" element={<Error500 />} />
                </Route>

            </Routes>
        </Router>
    )
}

export default App