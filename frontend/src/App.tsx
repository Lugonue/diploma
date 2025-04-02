import Layout from "components/layouts";
import LoginLayout from "components/layouts/loginLayout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

type Props = {}

const App = (props: Props) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} >

                </Route>
                <Route path="/login" element={<LoginLayout />}>
                    <Route path="" element={<LoginPage />} />

                </Route>
            </Routes>
        </Router>
    )
}

export default App