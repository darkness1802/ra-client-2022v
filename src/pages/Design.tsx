import React, { useState } from "react"
import { BsFacebook } from "react-icons/bs"
import axios from "axios"
import ReactPlayer from "react-player"

/** @type { page } descript: { Test } */
function Design():JSX.Element {

    const [title, $title] = useState<string>("")
    const [size, $size] = useState<string>("")
    const [src, $src] = useState<string>("")
    const [tags, $tags] = useState<string>("")
    const [description, $description] = useState<string>("")
    const [videoId, $videoId] = useState<string>("")
    const [searchResult, $searchResult] = useState<any>(null)

    const search = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8888/video/detail?videoId=${videoId}`)
            $searchResult(data)
        } catch (err) {
            console.log(err)
        }
    }

    const createVideo = async (event:any):Promise<any>=> {
        try {
            event.preventDefault()
            const { data } = await axios.post("http://localhost:8888/video/create", {
                title, size, src, tags, description
            })
            console.log(data)
        } catch(err) {
            console.log(err)
        }
    }

    console.log(searchResult)

    return <div className="relative flex gap-4 flex-col items-center justify-center bg-heavydark w-screen h-screen">
        
        <div className="relative bg-lightdark px-8 py-4 w-[25rem] flex items-center justify-center">
            <input onChange={(e) => $videoId(e.target.value)} type="text" placeholder="Search..." className="w-full bg-heavydark text-white px-4 py-2 rounded-xl" />
            <span onClick={search} className="cursor-pointer absolute right-10 text-sm font-semibold text-white py-1 px-2 bg-lightgreen rounded-xl">Search</span>
        </div>
        { searchResult
            ? <div>

                <ReactPlayer playing url={searchResult.video.src} width={"500px"} height={"300px"} config={ { file: {}} }/>

                <button onClick={()=>$searchResult(null)} className="px-4 py-2 bg-lightgreen text-white w-full">Back</button>
            </div>
            : <form onSubmit={createVideo} className="flex flex-col items-center justify-center gap-4 bg-lightdark p-12">
                <input onChange={(e)=> $title(e.target.value)} type="text" placeholder="Video Title" className="w-full px-4 py-2 bg-heavydark text-white" name="title" />
                <input onChange={(e)=> $size(e.target.value)} type="text" placeholder="Video Size" className="w-full px-4 py-2 bg-heavydark text-white" name="size" />
                <input onChange={(e)=> $src(e.target.value)} type="text" placeholder="Video Src"  className="w-full px-4 py-2 bg-heavydark text-white" name="src" />
                <input onChange={(e)=> $tags(e.target.value)} type="text" placeholder="Video Tags" className="w-full px-4 py-2 bg-heavydark text-white" name="tags" />
                <textarea onChange={(e)=> $description(e.target.value)} name="description" className="w-full px-4 py-2 bg-heavydark text-white" id="" cols={30} rows={5}></textarea>
                <button className="px-4 py-2 bg-lightgreen text-white w-full" type="submit">Create</button>
            </form>}
    </div>
}

export default Design