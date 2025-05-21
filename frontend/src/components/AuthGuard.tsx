import useUserStore from 'hooks/stores/useUserStore';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

type Props = {
    component: JSX.Element
}

const AuthGuard = (props: Props) => {
    const { user } = useUserStore();
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.hasAuth) {
            navigate('/auth/login', { replace: true });
        }
    }, [])

    return (
        <>{props.component}</>
    )
}

export default AuthGuard