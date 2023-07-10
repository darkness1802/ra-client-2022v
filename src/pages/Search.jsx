import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Navbar from "../comps/Private/Navbar"
import Request, { ENROLL_COURSE, SEARCH } from "../request"
import { AiFillCaretDown } from "react-icons/ai"
import { useRecoilValue } from "recoil"
import { auth } from "../root"

/** @type { page } descript: {  } */
export default function Search() {

    let { keyword } = useParams()
    let [results, setResults] = useState({ courses: [], users: [] })
    let [showUsers, setShowUsers] = useState(true)
    let [showCourses, setShowCourses] = useState(true)
    useEffect(() => {
        const search = async () => {
            try {
                let { data } = await Request.Post(SEARCH, { keyword })
                console.log(data)
                setResults(data)
            } catch (error) {
                console.log(error)
            }
        }; search()
    }, [keyword])

    return <div className="dashboard-search bg-black w-full">
        <Navbar />
        <main className="relative">
            <div className="h-[88vh] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-lightdark px-12">
                <div className="heading py-8">
                    <h2 className="text-white text-md text-lightgreen uppercase font-bold">Royal Academy</h2>
                    <h1 className="text-white text-2xl text-white uppercase font-bold">SEARCH</h1>
                </div>

                <div className="heading bg-lightdark rounded-xl flex justify-end py-2 px-4">
                    <h1 onClick={() => setShowUsers(!showUsers)} className="flex items-center gap-2 cursor-pointer text-white text-lg font-bold">
                        <AiFillCaretDown />
                        Users</h1>
                </div>
                <div className={`${!showUsers && 'hidden'} container my-4 grid grid-cols-3 gap-4`}>
                    {results.users?.map((item, index) => <Search.User key={index} data={item} />)}
                </div>

                <div className="heading bg-lightdark rounded-xl mt-4 flex justify-end py-2 px-4">
                    <h1 onClick={() => setShowCourses(!showCourses)} className="flex items-center gap-2 cursor-pointer text-white text-lg font-bold">
                        <AiFillCaretDown />
                        Courses</h1>
                </div>

                <div className={`${!showCourses && 'hidden'} rounded-xl bg-lightdark my-4 h-[280px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500`}>
                    {results.courses?.map((item, index) => <Search.Course key={index} data={item} />)}
                </div>

            </div>
        </main>
    </div>
}

Search.User = function __User__({ data }) {
    console.log(data)
    let styles = {
        search: `search/user w-full bg-lightdark rounded-xl flex items-center justify-start gap-8 h-[150px] px-4`,
        username: `text-white text-lg font-bold uppercase border-t-2`
    }
    return <div className={styles.search}>
        <img src="/images/user.png" className="w-28 h-28" alt="" />
        <div className="texts">
            <p className={styles.username}>{data.username}</p>
            <ul>
                <li className="text-white">{"{{ subject }}"}</li>
                <li className="text-white">{"{{ subject }}"}</li>
            </ul>
        </div>
    </div>
}

Search.Course = function __Course__({ data, ...props }) {
    let __auth__ = useRecoilValue(auth)
    let history = useHistory()
    const enroll = async () => {
        console.log("Enroll")
        try {
            let res = await Request.Post(ENROLL_COURSE, { courseId: data._id }, { access: __auth__.access })
            console.log(res)
        } catch ({response}) {
            console.log(response)
        }
    }
    return <div className="px-8 search/course w-full h-[60px] bg-lightdark border-b-2 border-solid items-center border-gray-400 flex justify-between">
        <div className="texts flex items-center">
            <p className="text-white font-bold uppercase">{data.title}</p>
            <small className="text-gray-400 ml-4">{data.token}</small>
        </div>
        <div className="btn-group flex gap-3">
            <button onClick={() => history.push(`/join/${data._id}`)} className="py-1 px-4 rounded-xl bg-lightgreen text-white font-bold">Join</button>
            <button onClick={() => history.push(`/view=${data._id}`)} className="py-1 px-4 rounded-xl bg-gray-500 text-white font-bold">Overview</button>
            <button onClick={enroll} className="py-1 px-4 rounded-xl bg-black text-white font-bold">Enroll</button>
        </div>
    </div>
}