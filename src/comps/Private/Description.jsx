import React, { useState } from "react"
import Request, { UPDATE_DESCRIPTION } from "../../request"
import { auth } from "../../root"
import { useRecoilValue } from "recoil"

/** @type { comp } descript: { none } */
export default function Description({children}) {
    return <div className="description my-4">
        { children }
    </div>
}

Description.View = function __View__({description}) {
    return <div className="flex flex-col gap-2">
        <h1 className="text-xl text-gray-300 font-bold">{description?.title || ""}</h1>
        <p className="text-base text-gray-300">{description?.content || null}</p>
    </div>
}

Description.Editor = function __Editor__({courseId, description, setEditor}) {

    console.log(description)

    const __auth__ = useRecoilValue(auth)

    const [title, setTitle] = useState(description.title)
    const [content, setContent] = useState(description.content)

    const updateDescription = async () => {
        console.log(30, title, content)
        try {
            if (!title || !content) throw new Error("Title or content is empty")
            await Request.Post(UPDATE_DESCRIPTION, { title, content, id:courseId }, { access: __auth__.access })
            setEditor(false)
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="flex flex-col gap-2">
        <input onChange={({target}) => setTitle(target.value)} type="text" defaultValue={description.title || "Enter course title here"} className="px-4 py-2 bg-lightdark text-white font-bold text-lg h-[50px]"/>
        <textarea onChange={({target}) => setContent(target.value)} defaultValue={description.content || "Enter course description here"} cols="30" rows="10" className="px-4 py-2 bg-lightdark text-white"></textarea>
        <div className="flex gap-6">
        <button onClick={updateDescription} className="px-4 py-2 bg-lightgreen hover:bg-rsgreen text-white text-md font-bold w-full">Save</button>
        <button onClick={() => setEditor(false)} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-md font-bold w-full">Cancel</button>
        </div>
    </div>
}