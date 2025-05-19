import { PaginationType } from 'hooks/stores/useProductStor'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../pagination'

type Props = {
    totalCount: number
    currentPage: string
    onPageChange: (page: PaginationType) => void
}

const PaginationUI = (props: Props) => {
    return (
        <Pagination>
            <PaginationContent >
                <PaginationItem>
                    <PaginationPrevious href={props.currentPage === "1" ? "1" : `${Number(props.currentPage) - 1}`} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">{props.currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={props.currentPage === `${props.totalCount}` ? `${props.totalCount}` : `${Number(props.currentPage) + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}

export default PaginationUI