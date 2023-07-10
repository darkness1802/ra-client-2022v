import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"
import { auth } from "../../root"
import { FaSignOutAlt } from "react-icons/fa"

/** @type { copms } descript: { Navbar } */
export default function Navbar() {

    let [__auth__, $Auth] = useRecoilState(auth)
    const [keyword, setKeyword] = useState("")
    let history = useHistory()

    const signOut = () => {
        localStorage.removeItem("auth")
        $Auth(null)
        history.push("/")
    }

    const search = (e) => {
        e.preventDefault()
        keyword && history.push(`/search=${keyword}`)
    }

    return <nav className="flex items-center justify-between h-[12vh] bg-lightdark py-4 px-12 w-full">
        <Link to="/" className="bg-lightgreen py-2 text-base text-gray-200 font-semibold px-4 rounded-xl">Getting Started</Link>
        <form onSubmit={search} className="w-[40%]">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input type="search" onChange={({target}) => setKeyword(target.value)} className="block p-4 pl-10 w-full text-sm text-gray-900
                    bg-heavydark text-base text-gray-200 font-semibold rounded-full border border-gray-300 focus:ring-lightgreen focus:border-lightgreen dark:heavydark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:lightgreen dark:focus:lightgreen" placeholder="Search some thing ..." />
                <button type="submit" className="text-white text-base absolute right-2.5 bottom-2.5 bg-lightgreen hover:bg-lightgreen focus:ring-4 focus:outline-none focus:ring-lightgreen font-medium rounded-full text-sm px-4 py-2">Search</button>
            </div>
        </form>
        <div className="flex items-center gap-4">
            <button className="bg-lightdark text-base text-gray-200 font-semibold py-2 px-4 text-white rounded-xl">Help / Feedback</button>
            <div className="flex items-center gap-4">
                <p onClick={signOut} className="cursor-pointer text-lg text-red-400"><FaSignOutAlt /></p>
                <p className="text-lg text-white">{__auth__.username}</p>
                <img src="https://picsum.photos/40/40" className="rounded-full" alt="" />
            </div>
        </div>
    </nav>
}