import BreadCrumbs from 'components/template/regions/BreadCrumbs'
import { Outlet } from 'react-router'

type Props = {}

const ContentLayout = (props: Props) => {
    return (
        <div id="content" className="contentContainer">
            <BreadCrumbs />
            <Outlet />
        </div>
    )
}

export default ContentLayout