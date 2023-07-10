import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import Navbar from "../comps/Private/Navbar"
import Course from "../comps/Course"
import Request, { GET_COURSE, GET_LATEST_COURSES, GET_POPULAR_COURSES } from "../request"
import { useRecoilValue } from "recoil"
import { GiTripleYin } from "react-icons/gi"
import { auth } from "../root"
import Slick from "../comps/Carousel/Slick.jsx"


/** @type { comp } descript: { dashboard main component } */
export default function Main() {

    let __auth__ = useRecoilValue(auth)
    let [courses, setCourses] = useState([])

    useEffect(() => {
        const getCourses = async () => {
            try {
                let { data } = await Request.Get(GET_COURSE, { access: __auth__.access })
                setCourses(data)
            } catch (error) {
                console.log(error)
            }
        }; getCourses()
    }, [])

    return <div className="dashboard-main bg-black w-full">
        <Navbar />
        <main className="relative">
            <div className="h-[88vh] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-lightdark py-6 px-12">
                <div className="top flex bg-gradient-to-b from-lightgreen to-darkgreen h-[250px]">
                    <div className="text-white justify-between p-6 flex flex-col w-[25%]">
                        <div className="">
                            <small className="text-base text-gray-300 uppercase">Royal Academy</small>
                            <p className="text-lg text-gray-300 text-lg font-semibold">Trang Chủ</p>
                        </div>

                        <div className="">
                            <p className="text-base text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, magni reprehenderit</p>
                            <p className="text-base text-white font-semibold">Xem hướng dẫn</p>
                        </div>
                    </div>
                    <div className="text-white w-[75%]">
                        <img src="/images/202-600x250.jpg" className="w-full h-full" alt="" />
                    </div>
                </div>

                <h2 className="text-white text-xl uppercase font-bold mt-6 mb-2">Khóa học mới</h2>
                <Slick count={6} api={GET_LATEST_COURSES}/>
                <h2 className="text-white text-xl uppercase font-bold mt-6 mb-2">Khóa học nổi bật</h2>
                <Slick count={6} api={GET_POPULAR_COURSES}/>

                <footer className="bg-lightdark text-white text-center text-lg py-4">
                    <p className="text-white">Copyright © 2022 Royal Academy. All rights reserved.</p>
                    <p className="text-gray-400">For more infomation, go to https://github.com/Darkness-Scholar</p>
                </footer>

            </div>
        </main>
    </div>
}
