import React, { useState } from "react"
import { useHistory, Redirect } from "react-router-dom"
import { useRecoilState } from "recoil"
import { auth } from "../root"
import Request, { SIGN_UP } from "../request"

/** @var { Page } Signin */
function Signin (props) {

    const history = useHistory()
    const [__auth__, $Auth] = useRecoilState(auth)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null)

    const signup = async (event) => {
        event.preventDefault()
        console.log(`lolol`)
        try {
            let { data } = await Request.Post(SIGN_UP, { username, email, password })
            history.push("/signin")
        } catch(error) {
            console.log(error)
            setErr("Wrong username or password")
        }
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return !__auth__ ? <div className="page login w-screen h-screen bg-darkgreen flex justify-center">
    <form onSubmit={signup} className="bg-lightdark flex flex-col gap-4 p-12">
        <label className="text-xl my-2 text-white text-center font-bold">SIGN UP</label>
        <input onChange={({target}) => setEmail(target.value)} className="w-full text-white p-4 px-16 bg-heavydark border-2 border-lightgray rounded-lg" type="text" placeholder="Email"/>
        <input onChange={({target}) => setUsername(target.value)} className="w-full text-white p-4 px-16 bg-heavydark border-2 border-lightgray rounded-lg" type="text" placeholder="Username"/>
        <input onChange={({target}) => setPassword(target.value)} type="password" className="w-full text-white p-4 px-16 bg-heavydark border-2 border-lightgray rounded-lg" placeholder="Password"/>
        <button onClick={signup} className="my-4 w-full bg-darkgreen text-white text-md font-bold py-4 rounded-xl hover:bg-lightgreen">Đăng ký</button>
        <button onClick={() => history.push(`/signin`)} className="cursor-pointer text-center text-sm text-gray-500 hover:text-sky-500">Đã có tài khoản? Đăng nhập</button>
    </form>
</div> : <Redirect to="/home" />
}

export default Signin