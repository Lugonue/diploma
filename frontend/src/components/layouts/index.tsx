import Footer from "components/template/Footer"
import Header from "components/template/Header"
import { Outlet } from "react-router"

type Props = {}

const Layout = (props: Props) => {
    return (
        <>
            <main className="min-h-screen flex flex-col">
                <Header id="header" />
                <div className="flex-1">
                    <Outlet />

                </div>
                <Footer />

            </main>
        </>
    )
}

export default Layout