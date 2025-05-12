import BreadCrumbs from 'components/template/regions/BreadCrumbs'
import { Outlet } from 'react-router'

type Props = {}

const ContentLayout = (props: Props) => {
    return (
        <div id="content" className="mx-auto w-full lg:w-[1000px] min-h-[calc(100vh-404px)]">
            <BreadCrumbs />
            <Outlet />
        </div>
    )
}

export default ContentLayout