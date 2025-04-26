import Footer from "components/template/Footer"
import Header from "components/template/Header"
import Aside from "components/template/regions/Aside"
import BreadCrumbs from "components/template/regions/BreadCrumbs"
import { Toaster } from "components/ui/sonner"
import { Outlet } from "react-router"

type Props = {}

const Layout = (props: Props) => {
    return (
        <>
            <main className="min-h-screen flex flex-col bg-emerald-100 w-screen">
                <Header id="header" />
                <Outlet />
                <Footer />
                <Toaster position="top-right" />
            </main>
        </>
    )
}

export default Layout