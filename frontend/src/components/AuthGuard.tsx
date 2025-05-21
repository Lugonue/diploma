import useUserStore from 'hooks/stores/useUserStore';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

type Props = {
    component: JSX.Element,
    admin?: boolean
}

const AuthGuard = (props: Props) => {
    const { user } = useUserStore();
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.hasAuth) {
            navigate('/auth/login', { replace: true });
        }
        if (props.admin && user.data?.role !== 'admin') {
            navigate('/', { replace: true });
        }
    }, [])

    return (
        <>{props.component}</>
    )
}

export default AuthGuard