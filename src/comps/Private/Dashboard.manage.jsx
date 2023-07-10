import React from "react"
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

/** @type { comp } descript: { Dashboard manage } */

export default function Manage({ title, children }) {

    let nav = useHistory()

    return <div className="dashboard/manage bg-black w-full">
        <Navbar />
        <main>
            <div className="heading py-8 px-12">
                <h2 onClick={()=>nav.push("/dashboard")} className="cursor-pointer text-white text-md text-lightgreen uppercase font-bold">Royal Academy</h2>
                <h1 className="text-white text-2xl text-white uppercase font-bold">{ title }</h1>
            </div>

            { children }

        </main>
    </div>

}