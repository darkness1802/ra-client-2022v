import React, { useState } from "react"
import { SiCircleci, SiHomebridge, SiBeatsbydre } from "react-icons/si"
import { useGlobalState } from "../../../hooks/states"

export default function LeftSide(){
    const [showManager, $showManager] = useGlobalState("showManager")
    
    return <div className="leftside backdrop-blur backdrop-blur-md w-[20%] h-full ">
        <nav className="top h-[5vh] bg-heavydark bg-opacity-80 rounded-tl-2xl flex gap-1 px-6 py-2 items-center">
            <div onClick={()=>$showManager(state => false)} className="cursor-pointer hover:scale-105 duration-200 w-[0.88rem] h-[0.88rem] bg-red-500 rounded-full"></div>
            <div onClick={()=>$showManager(state => false)} className="cursor-pointer hover:scale-105 duration-200 w-[0.88rem] h-[0.88rem] bg-green-500 rounded-full"></div>
        </nav>
        <div className="py-8 px-6 bg-heavydark bg-opacity-80 h-[80vh]">
            <h3 className="text-lg text-gray-500 font-medium">Nạp Royal Token</h3>
            <div className="flex my-2 items-center gap-2 p-2 hover:bg-lightdark rounded-lg">
                <SiHomebridge className="text-white text-lg" alt="" />
                <h3 className="text-gray-200 text-base">General</h3>
            </div>
            <div className="flex my-2 items-center gap-2 p-2 hover:bg-lightdark rounded-lg">
                <SiCircleci className="text-white text-lg" alt="" />
                <h3 className="text-gray-200 text-base">Nạp qua Crypto</h3>
            </div>
            <div className="flex my-2 items-center gap-2 p-2 hover:bg-lightdark rounded-lg">
                <SiBeatsbydre className="text-white text-lg" alt="" />
                <h3 className="text-gray-200 text-base">Nạp qua Ngân hàng</h3>
            </div>
        </div>
    </div>
}