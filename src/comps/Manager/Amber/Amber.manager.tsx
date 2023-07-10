import React, { useState } from "react"
import socket from "../../../socket"
import { useGlobalState } from "../../../hooks/states"
import { useRecoilState } from "recoil"
import { auth, showQueue } from "../../../root"

export default function TeamLearning() {

    const list = {
        "": [],
        "Ngữ Văn": [1, 2, 3, 4, 5, 6, 7, 8],
        "Toán": [1, 2, 3, 4, 5, 6, 7, 8],
        "Tiếng Anh": [1, 2, 3, 4, 5, 6, 7, 8],
        "Lịch Sử": [1, 2, 3, 4, 5, 6, 7, 8],
        "Địa Lý": [1, 2, 3, 4, 5, 6, 7, 8],
        "Công Nghệ": [1, 2, 3, 4, 5, 6, 7, 8],
        "Hóa Học": [1, 2, 3, 4, 5, 6, 7, 8],
        "Sinh Học": [1, 2, 3, 4, 5, 6, 7, 8],
        "Vật Lý": [1, 2, 3, 4, 5, 6, 7, 8],
        "GD Công Dân": [1, 2, 3, 4, 5, 6, 7, 8]

    }

    const [__auth__, setAuth] = useRecoilState(auth)
    const [__showQueue__, setShowQueue] = useRecoilState(showQueue)
    const [showManager, setShowManager] = useGlobalState('showManager')

    socket.on(`error:find-team`, (data) => {
        console.log(data)
    }) 
    socket.on(`pre:find-team`, (data) => {
        console.log(data)
    })

    const findTeam = () => {

        console.log(part, selected, tage)
        socket.emit("find-team", {
            part, 
            subject: selected, 
            tage,
            username: __auth__.username
        })
        setShowQueue(true)
        setShowManager(state => false)
    }
    const [part, setPart] = useState<string>("")
    const [selected, setSelected] = useState<string>("")
    const [tage, setTage] = useState<string>('')
    return <div className="w-[75%] h-full mt-6">
        <div className="w-full h-[5vh] bg-heavydark flex items-center px-4 justify-between">
            <p className="text-white">Học nhóm</p>

            <button onClick={() => setShowManager(state => false)} className="w-4 h-4 rounded-full bg-red-500"></button>
        </div>
        <div className="w-full h-[65vh] bg-lightdark p-8">

            <div>
                <select onChange={(e:any)=>setTage(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Chọn lớp</option>
                    <option value="6"> Lớp: 6</option>
                    <option value="7"> Lớp: 7</option>
                    <option value="8"> Lớp: 8</option>
                    <option value="9"> Lớp: 9</option>
                    <option value="10"> Lớp: 10</option>
                    <option value="11"> Lớp: 11</option>
                    <option value="12"> Lớp: 12</option>
                </select>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-6">
                <div onClick={() => setSelected(`Ngữ Văn`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Ngữ Văn</div>
                <div onClick={() => setSelected(`Toán`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Toán</div>
                <div onClick={() => setSelected(`Tiếng Anh`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Tiếng Anh</div>
                <div onClick={() => setSelected(`Lịch Sử`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Lịch Sử</div>
                <div onClick={() => setSelected(`Địa Lý`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Địa Lý</div>

                <div onClick={() => setSelected(`Hóa Học`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Hóa Học</div>
                <div onClick={() => setSelected(`Vật Lý`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Vật Lý</div>
                <div onClick={() => setSelected(`Sinh Học`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Sinh Học</div>
                <div onClick={() => setSelected(`Công Nghệ`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">Công Nghệ</div>
                <div onClick={() => setSelected(`GD Công Dân`)} className="text-white h-[40px] w-full bg-gray-600 flex items-center rounded-lg justify-center cursor-pointer">GD Công Dân</div>
            </div>

            <div className="flex flex-col items-center justify-center">   
                <h4 className="mt-4 text-white">Môn học: {selected}</h4>
                <h4 className="mb-4 text-white">Chương</h4>
                <div className="grid grid-cols-4 gap-4">
                { list[selected]?.map((item: any, index: number) => <div onClick={()=>setPart(item)} key={index} className="cursor-pointer rounded-lg bg-sky-600 hover:bg-sky-500 px-4 text-white">{item}</div>)}
                </div>

                <button onClick={findTeam} className="bg-lightgreen hover:bg-softgreen px-4 py-2 text-white font-normal w-full mt-6">Bắt đầu</button>
            </div>

        </div>
    </div>
}