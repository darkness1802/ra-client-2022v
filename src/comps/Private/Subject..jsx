import { useState } from "react"
import { Link } from "react-router-dom"
import { FaUserFriends, FaBook, FaKey } from "react-icons/fa"


/** @type { copm } descript: { subject card } */
export default function Subject({data}) {
    return <div className="card bg-lightdark w-full h-[80px] px-8 py-4 flex items-center justify-between">
        <div>
            <h2 className="text-lg text-white font-bold">{data.title}</h2>
            <small className="text-gray-400 font-bold flex items-center gap-2"><FaKey /> {data.token}</small>
        </div>
        <div className="flex items-center gap-2">
            <FaUserFriends className="text-lightgreen text-2xl" />
            <span className="text-md font-bold text-gray-400">0</span>
            <h3 className="text-md font-bold text-white">Students</h3>
        </div>
        <div className="flex items-center gap-2">
            <FaBook className="text-lightgreen text-2xl" />
            <span className="text-md font-bold text-gray-400">3</span>
            <h3 className="text-md font-bold text-white">Assignments</h3>
        </div>
        <div>
        <button className="px-4 py-2 text-gray-300 hover:text-gray-200 text-md">Manage</button>
            <Link to={`/room=${data.token}`} className="bg-lightgreen mx-2 rounded-xl px-4 py-2 text-white text-md font-bold">Start</Link>
        </div>
    </div>
}