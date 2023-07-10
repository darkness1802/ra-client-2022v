import React, { useState } from "react"
import { GiTripleYin } from "react-icons/gi"
import { useHistory, Link } from "react-router-dom"

/** @type { comp } descript: {  } */
export default function () {

    const history = useHistory()

    return <div className="navbar fixed z-[99] w-full h-[80px] flex items-center justify-between px-6 py-6 lg:px-16">
        
        <div className="logo flex items-center">
            <GiTripleYin className="text-white text-5xl"/>
            <h1 className="text-white text-2xl font-bold ml-4">
                Royal <span className="text-lightgreen text-2xl font-semibold ml-1">Academy</span>
            </h1>
        </div>
        <div className="menu flex items-center gap-6">
            <Link to="/about" className="text-white font-bold uppercase">About</Link>
            <button className="text-white font-bold uppercase">Blog</button>
            <button onClick={() => history.push("/signin")} className="text-white font-bold uppercase">Sign In</button>
            <button onClick={() => history.push("/signup")}className="text-white font-bold uppercase px-4 py-1 bg-lightgreen rounded-2xl" href="https://soundboxx.web.app/">Sign Up</button>
        </div>

    </div>
}