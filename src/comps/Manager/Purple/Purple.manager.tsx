import React, { useState } from "react"
import { useGlobalState } from "../../../hooks/states"

export default function () {
    const [showManager, setShowManager] = useGlobalState('showManager')
    return <div className="w-full h-full bg-purple-500">
        <div className="flex px-2 justify-between bg-black">
            <div></div>
            <button onClick={() => setShowManager(state => false)} className="text-white font-bold">X</button>
        </div>
    </div>
}