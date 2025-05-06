import useBCStore from 'hooks/stores/useBCstore'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'components/ui/breadcrumb'
import React from 'react'

type Props = {}

const BreadCrumbs = (props: Props) => {
    const { BCitems, setBC } = useBCStore()
    return (
        <div className="p-2">
            <Breadcrumb>
                <BreadcrumbList>
                    {BCitems?.length > 1 && BCitems.map((item, index) => (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink to={item.link}> {item.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className='last:hidden' />
                        </>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumbs