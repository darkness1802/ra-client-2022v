import React, { useState, useEffect } from "react"
import axios from "axios"
import Request, { UPLOAD, SERVER } from "../../request"
import { auth } from "../../root"
import { useRecoilValue } from "recoil"

export default function Upload({ courseId }) {

    const __auth__ = useRecoilValue(auth)
    const [courseData, setCourseData] = useState({})

    let downloadURL = `${SERVER}/file/download?id=${courseId}`

    useEffect(() => {
        axios.get(`${SERVER}/course/info?id=${courseId}`, { access: __auth__.access }).then(res => {
            setCourseData(res.data)
        })
    }, [])

    const [download, setDownload] = useState(null)
    const [selectedFile, setSelectedFile] = useState({
        name: '',
        type: '',
        size: ''
    });
    const [loading, setLoading] = useState(false)
    const [isSelected, setIsSelected] = useState(false)

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = async () => {
        setLoading(true)
        console.log(selectedFile?.name)
        const file = document.querySelector("#input").files[0];
    }

    return <div className="flex flex-col items-center justify-center">

        {loading && <div className="fixed z-[111] top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
            <div className="bg-lightdark p-8 rounded-lg">
                <img src="/images/loading1.svg" />
                <p className="text-white text-lg text-center m-auto font-bold">Waiting for uploading</p>
            </div>
        </div>}

        { !courseData.excriseFile ? <div className="m-auto text-center">
            <input type="file" name="file" className="w-full bg-lightdark text-white text-base" id="input" onChange={changeHandler} />
            {isSelected ? (
                <div>
                    <p className="text-base text-gray-200">Filename: {selectedFile.name}</p>
                    <p className="text-base text-gray-200">Filetype: {selectedFile.type}</p>
                    <p className="text-base text-gray-200">Size in bytes: {selectedFile.size}</p>
                </div>
            ) : (
                <p className="text-gray-300 text-base my-1">Select a file to show details</p>
            )}
            <div className="flex flex-col items-center justify-center">
                <button className="w-[125px] m-auto text-center px-4 py-2 text-base font-bold bg-red-500 text-white" onClick={handleSubmission}>Upload</button>
                {download && <a className="w-[125px] m-auto text-center px-4 py-2 text-base font-bold bg-sky-500 text-white" href={download}>Download</a>}
            </div>
        </div>:<a className="w-[125px] m-auto text-center px-4 py-2 text-base font-bold bg-sky-500 text-white" href={downloadURL}>Download</a> }
    </div>
}