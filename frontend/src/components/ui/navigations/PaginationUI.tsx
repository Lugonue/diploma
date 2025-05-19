import { PaginationType } from 'hooks/stores/useProductStor'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../pagination'

type Props = {
    totalCount: number
    currentPage: number
    onPageChange: (page: number) => void
    siblingCount?: number
}

const PaginationUI = ({ 
    totalCount, 
    currentPage, 
    onPageChange, 
    siblingCount = 1 
}: Props) => {
    const DOTS = '...'
    
    const range = (start: number, end: number) => {
        const length = end - start + 1
        return Array.from({ length }, (_, idx) => idx + start)
    }

    const paginationRange = () => {
        const totalPageNumbers = siblingCount + 5
        
        // Case 1: Если страниц меньше, чем хотим показать, возвращаем диапазон [1..totalCount]
        if (totalPageNumbers >= totalCount) {
            return range(1, totalCount)
        }
        
        // Вычисляем индексы соседних страниц
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount)
        
        // Показываем точки, когда между границами и соседями есть промежуток
        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalCount - 2
        
        const firstPageIndex = 1
        const lastPageIndex = totalCount
        
        // Case 2: Нет точек слева, но есть справа
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)
            return [...leftRange, DOTS, totalCount]
        }
        
        // Case 3: Нет точек справа, но есть слева
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(totalCount - rightItemCount + 1, totalCount)
            return [firstPageIndex, DOTS, ...rightRange]
        }
        
        // Case 4: Есть точки с обеих сторон
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }
        
        return range(1, totalCount)
    }

    const onNext = () => {
        if (currentPage < totalCount) {
            onPageChange(currentPage + 1)
        }
    }

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const pages = paginationRange()

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        onClick={onPrevious}
                        isActive={currentPage > 1}
                    />
                </PaginationItem>
                
                {pages.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <PaginationItem key={`dots-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }
                    
                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink 
                                isActive={currentPage === pageNumber}
                                onClick={() => onPageChange(Number(pageNumber))}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}
                
                <PaginationItem>
                    <PaginationNext 
                        onClick={onNext}
                        isActive={currentPage < totalCount}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationUI