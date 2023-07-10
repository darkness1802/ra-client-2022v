import React, { useState, useEffect } from "react"
import { AiFillPlayCircle } from "react-icons/ai"
import ReactPlayer from 'react-player'
import Request from "../request"
import axios from "axios"
export default function RoyalMedia({ viewOnly, auth, course }) {

    const [videos, setVideos] = useState(course.videos)
    const [addVideoForm, showAddVideoForm] = useState(false)
    const [videoId, setVideoId] = useState("")
    const [playing, setPlaying] = useState(null)

    const addVideo = async (e) => {
        e.preventDefault()
        try {
            if (videoId.length < 10) throw new Error("Invalid video id")
            let res = await Request.Post("/course/add-video", {
                courseId: course._id,
                videoId: videoId
            }, { access: auth.access })
            alert("Video added successfully, reload to see it")
            showAddVideoForm(false)
        } catch (err) {
            alert("Invalid video id")
            showAddVideoForm(false)
        }
    }

    return <div className="bg-lightdark w-full flex">
        <div style={{ backgroundImage: `url(https://picsum.photos/500/300)` }} className="bg-cover video-box w-[60%] h-[300px] bg-gray-700 flex justify-center items-center">
            <AiFillPlayCircle className={`${playing && "hidden"} text-5xl text-white cursor-pointer`} />
            {playing && <div className="w-full h-[300px]">

                <ReactPlayer
                    className='react-player'
                    url={`https://www.youtube.com/watch?v=${playing}`}
                    width='100%'
                    height='100%'
                    controls={true}
                />

            </div>}
        </div>

        <div className="queue w-[40%] h-[300px] overflow-y-scroll bg-heavydark scrollbar scrollbar-thin scrollbar-thumb-lightdark">

            <div className="bg-lightdark text-center pb-1">
                <h1 className="bg-lightdark text-sm pt-2 text-white font-bold">Royal Media Plugin</h1>
                <a href="https://soundboxx.web.app" className="w-full text-xs text-center text-sky-500">Youtube Data Converter (Alpha Test)</a>
            </div>
            {!viewOnly && <button onClick={() => showAddVideoForm(!addVideoForm)} className="w-full bg-amber-600 text-sm text-white font-bold py-1">+ Add video</button>}
            {addVideoForm && <form onSubmit={addVideo}>
                <input onChange={({ target }) => setVideoId(target.value)} type="text" className="text-white text-sm font-bold bg-lightdark text-center ring-none w-full" placeholder="Enter Youtube Video ID" />
            </form>}
            {
                course.videos?.map((item, index) => <RoyalMedia.Item key={index} data={item} setPlaying={setPlaying} />)
            }
        </div>
    </div>
}

RoyalMedia.Item = function __Item__({ data, setPlaying }) {

    const [videoInfo, setVideoInfo] = useState({})

    const getVideoInfo = async () => {
        try {
            let res = await axios.get(`https://rsoftmedia.vercel.app/audio/info?id=${data}&type=single`)
            setVideoInfo(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getVideoInfo()
    }, [])

    const play = async () => {
        try {
            setPlaying(data)
        } catch (error) {
            console.log(error)
        }
    }

    return <div onClick={play} className="cursor-pointer flex hover:bg-lightdark px-4 py-2 items-center gap-6">
        <img src={videoInfo.image || 'https://picsum.photos/80/50'} alt="" className="w-[70px] h-full" />
        <div className="texts text-white">
            <h1 className="text-sm font-bold">{videoInfo?.title || "Video not found"}</h1>
            <small className="text-xs text-gray-400">{videoInfo?.author?.name || "Video not found"}</small>
        </div>
    </div>
}