import React, { useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Navbar from "./Navbar"
import { customAlphabet } from "nanoid"
import { useRecoilValue } from "recoil"
import { auth } from "../../root"
import Request, { CREATE_COURSE } from "../../request"

const nanoid = customAlphabet('0123456789abcdef', 9)

/** @type { comp } descript: { None } */
export default function CreateCourse({setCreateCourseModal}) {

    const history = useHistory()
    let __auth__ = useRecoilValue(auth)
    const [token, setToken] = useState('')
    const [title, setTitle] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const createToken = () => [
        setToken(nanoid())
    ]

    const createCourse = async () => {

        if (!title) return null
        if (!token) return null

        let newCource = {
            title: title,
            token: token
        }

        console.log(__auth__.access)

        let { data } = await Request.Post(CREATE_COURSE, newCource, { access: __auth__.access })
        history.push(`/manage/${data._id}`)
    }
    return <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[70%] bg-heavydark rounded-xl pb-12">
        <div className="flex items-center justify-end w-full p-3">
            <span onClick={()=>history.push(`/home`)} className="cursor-pointer bg-lightgreen mr-1 w-4 h-4 rounded-full"></span>
            <span onClick={()=>setCreateCourseModal(false)} className="cursor-pointer bg-red-500 ml-1 w-4 h-4 rounded-full"></span>
        </div>
        <h2 className="text-xl font-semibold text-white">Tạo Khóa Học Mới</h2>

        <input type="text" onChange={({ target }) => setTitle(target.value)}
            className="w-[70%] block my-4 p-4 pl-10 text-sm text-gray-90 bg-gray-50 rounded-xl border border-gray-300 
        focus:ring-lightgreen focus:border-lightgreen dark:bg-gray-700 dark:border-gray-600
        dark:placeholder-gray-400 dark:text-white dark:focus:lightgreen dark:focus:lightgreen"
            placeholder="Nhập tên khóa học" />

        <div className="flex items-center w-[70%]">
            <input type="text" readOnly value={token} className="mr-2 w-full block p-4 pl-10 text-sm text-gray-900
bg-gray-50 rounded-xl border border-gray-300 focus:ring-lightgreen focus:border-lightgreen dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:lightgreen dark:focus:lightgreen"
                placeholder="Click create token to auto generate a token" />
            <button onClick={createToken} className="ml-2 w-full text-white bg-lightgreen hover:bg-lightgreen focus:ring-4 focus:outline-none focus:ring-lightgreen font-medium rounded-lg text-sm py-4 px-4">Create Token</button>
        </div>

        <button onClick={createCourse} type="reset" className="mt-4 w-[70%] w-full px-4 py-2 text-md font-bold text-white bg-lightgreen rounded-xl">Create</button>
    </form>
}