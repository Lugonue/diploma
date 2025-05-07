

import React from 'react'
import { Card, CardContent } from '../card'

const CardDefault = (props: React.ComponentProps<"div">) => {
    return (
        <Card className='w-fit'>
            <CardContent {...props}>
            </CardContent>
        </Card>
    )
}

export default CardDefault