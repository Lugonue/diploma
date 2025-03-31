export const getColor = (color: string = '') => {
    switch (color) {
        case 'primary':
            return 'bg-primary text-white'
        case 'secondary':
            return 'bg-secondary text-white'
        default:
            return 'bg-primary text-white'
    }
}

export const getSizes = (size: string = '') => {
    switch (size) {
        case 'sm':
            return 'py-2 px-4 text-sm'
        case 'lg':
            return 'py-3 px-6 text-base'
        default:
            return 'py-2 px-4 text-sm'
    }
}