import React from 'react'
import { auth } from '../root'
import { useRecoilValue } from 'recoil'
import { Route, Redirect } from 'react-router-dom'

export function Protect({ component:Component, children, ...params }) {

    const __auth__ = useRecoilValue(auth)

    return <Route {...params} render={props => {
        if (__auth__) {
            return children ? children:<Component />
        } else {
            return <Redirect to={{ pathname: '/signin', state: {from:props.location}}} />
        }
    }
    } />
}