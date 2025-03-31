import Footer from "components/template/Footer";
import Header from "components/template/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import useUserStore from "hooks/useStore";
import LoginPage from "./pages/LoginPage";

type Props = {}

const App = (props: Props) => {
    const user = useUserStore((state) => state.user);
    return (
        <Router>
            <main className="min-h-screen flex flex-col">
                <Header id="header" user={user} />
                <Routes>
                    <Route path="/" element={<HomePage />} >
                        <Route path="/login" element={<LoginPage />} />
                        {/* <Route path="/contact" element={<ContactPage />} /> */}
                        {/* <Route path="*" element={<NotFoundPage />} /> */}
                    </Route>
                </Routes>
                <Footer />
            </main>
        </Router>
    )
}

export default App