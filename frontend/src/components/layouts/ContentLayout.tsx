import BreadCrumbs from 'components/template/regions/BreadCrumbs'
import { Outlet } from 'react-router'

type Props = {}

const ContentLayout = (props: Props) => {
    return (
        <div id="content" className="flex-1 flex flex-col justify-center items-center container">
            <BreadCrumbs />
            <Outlet />
        </div>
    )
}

export default ContentLayout