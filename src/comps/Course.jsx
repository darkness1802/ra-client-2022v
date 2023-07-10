import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaUserFriends, FaBook, FaKey } from "react-icons/fa"
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdAssignment } from "react-icons/md"
import { auth } from "../root"
import { useRecoilValue } from "recoil"
import Request, { FIND_ASSIGNMENT } from "../request"


/** @type { Component } descript: { Course card } */
export default function Course({ data, viewOnly }) {
    let [isOpen, setIsOpen] = useState(false)
    return <div className="flex flex-col gap-4">
        <div className="card bg-heavydark w-full h-[80px] px-8 py-4 flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-[28.33%] flex flex-col items-center justify-center">
                <h2 className="text-base text-white font-semibold">{data.title}</h2>
                <small className="text-gray-400 font-bold flex items-center gap-2"><FaKey /> {data.token}</small>
            </div>
            <div className="flex items-center justify-center gap-2 w-[28.33%]">
                <FaUserFriends className="text-lightgreen text-2xl" />
                <span className="text-md font-bold text-gray-400">{data?.students?.length}</span>
                <h3 className="text-sm font-semi text-white">Students</h3>
            </div>
            <div className="flex items-center justify-center gap-2 w-[28.33%]">
                <h3 className="flex gap-2 items-center text-sm font-semi text-white">
                    <MdAssignment className="text-lightgreen text-2xl"/>Assignments
                    {isOpen ? <MdKeyboardArrowDown className="text-xl" /> : <MdKeyboardArrowUp className="text-xl" />}
                </h3>
            </div>

                {viewOnly ? <Link to={`/home`} className="w-[15%] bg-lightgreen py-2 rounded-xl text-center m-auto text-sm font-semibold text-white">View</Link>:<div className="flex items-center w-[15%]">
                    <Link to={`/manage/${data._id}`} className="px-4 py-2 text-gray-300 hover:text-gray-200 text-sm font-semi">Manage</Link>
                    <Link to={`/join/${data._id}`} className="bg-lightgreen mx-2 rounded-xl px-4 py-2 text-white text-sm font-semi">Start</Link>
                </div>}

        </div>

        {isOpen && <Course.Extension data={data} />}

    </div>
}

Course.Extension = function __Extension__({ data }) {
    const __auth__ = useRecoilValue(auth)
    const [assignments, setAssignments] = useState([])
    useEffect(() => {
        const fetch = async () => {
            let res = await Request.Get(`${FIND_ASSIGNMENT}?id=${data._id}`, { access: __auth__.access })
            console.log(res.data)
            setAssignments(res.data)
        }; fetch()
    }, [data._id])

    return <div className="card bg-lightdark w-full px-8 py-2 flex flex-col gap-2">

        {assignments.map((item, index) => <div key={index} className="flex justify-between">
            <h1 className="text-sm text-white"><span className="text-sm font-semibold">[Lession {index+1}]</span> : {item.content}</h1>
            <div className="progress flex items-center justify-between gap-2">
                <div style={{width:item.progress*1.5}} className={`progress-bar h-2 bg-lightgreen`} />
                <small className="w-4 text-gray-300">{item.progress}%</small>
            </div>
        </div>)}

        {assignments?.length === 0 && <div className="flex justify-center px-12 py-2">
            <h2 className="text-white text-sm font-semibold">Empty</h2>
        </div>}

    </div>
}