import Footer from "components/template/Footer"
import Header from "components/template/Header"
import { Toaster } from "components/ui/sonner"
import { Outlet } from "react-router"

type Props = {}

const Layout = (props: Props) => {
    return (
        <>
            <main className="min-h-screen flex flex-col bg-emerald-100 overflow-hidden">
                <Header id="header" />
                <Outlet />
                <Toaster position="top-center" />
            </main>
        </>
    )
}

export default Layout