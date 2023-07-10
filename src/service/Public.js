import React from 'react'
import { auth } from '../root'
import { useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'


export function Public({ target, component:Component, children, ...params }) {

    const __auth__ = useRecoilValue(auth)

    return <Route 
        {...params} 
        render={props => {
            if (__auth__) {
                return <Redirect to={{ pathname: target, state: {from:props.location}}} />
            } else {
                return children ? children:<Component />
            }
        }} 
    />

}