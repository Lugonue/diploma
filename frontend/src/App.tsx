import Layout from "components/layouts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useTranslation } from "react-i18next";
import LoginLayout from "components/layouts/LoginLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegistrePage";

type Props = {}

const App = (props: Props) => {
    const { t, ready } = useTranslation();

    if (!ready) return <div>Loading...</div>;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="" element={<HomePage />} />
                    <Route path="/auth" element={<LoginLayout />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />

                    </Route>

                </Route>

            </Routes>
        </Router>
    )
}

export default App