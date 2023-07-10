import React, { useState, useEffect } from "react"
import { GiTripleYin } from "react-icons/gi"
import { useRecoilValue } from "recoil"
import Request, { GET_COURSE } from "../request"
import { auth } from "../root"
import Course from "../comps/Course.jsx"
import Navbar from "../comps/Private/Navbar.jsx"
import CreateCourse from "../comps/Private/Dashboard.create"

export default function Courses(): JSX.Element {

    const __auth__ = useRecoilValue(auth)
    const [courses, setCourses] = useState<any[]>([])
    const [createCourseModal, setCreateCourseModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const getCourses = async () => {
            try {
                let { data } = await Request.Get(GET_COURSE, { access: __auth__.access })
                setCourses(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }; getCourses()
    }, [])

    return <div className="page/courses bg-black w-full">

        { createCourseModal && <div className="create-course-modal fixed w-screen z-[999] h-screen bg-lightdark bg-opacity-40 p-12">
            <CreateCourse setCreateCourseModal={setCreateCourseModal}/>
        </div>}

        <Navbar />
        <div className="h-[88vh] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-lightdark py-6 px-12">
            <div className="w-full p-8">

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-white font-semibold text-lg uppercase">Quản lý khóa học của bạn</h1>
                    <button onClick={()=>setCreateCourseModal(true)} className="text-base text-white font-normal px-4 py-2 rounded-full bg-lightgreen hover:bg-softgreen">Tạo khóa học</button>
                </div>

                <div className="text-gray-300 bg-lightdark top flex p-2 justify-evenly">
                    <p className="text-sm uppercase w-[28.33%] m-auto text-center">Tiêu đề</p>
                    <p className="text-sm uppercase w-[28.33%] m-auto text-center">Học sinh</p>
                    <p className="text-sm uppercase w-[28.33%] m-auto text-center">Tiết học</p>
                    <p className="text-sm uppercase w-[15%] m-auto text-center">Thiếp lập</p>
                </div>
                <div className="bg-heavydark w-full h-[275px] overflow-y-scroll srcoll scrollbar-thin">

                    {courses?.length === 0 && <div className="w-full h-full p-4 flex items-center justify-center">
                        <p className="text-center text-gray-400 font-semibold">Empty Course</p></div>}
                    {courses?.length > 0 && courses?.map((course, index) => <Course key={index} data={course} viewOnly={false}/>)}

                </div>

                <div className="flex flex-col gap-4 mt-4">
                <h1 className="text-white font-semibold text-lg uppercase">Khóa học đã tham gia</h1>

                    {courses?.length === 0 && <div className="w-full h-full p-4 flex items-center justify-center">
                        <p className="text-center text-gray-400 font-semibold">Empty Course</p></div>}
                    {courses?.length > 0 && courses?.map((course, index) => <Course key={index} data={course} viewOnly={true}/>)}
                </div>
            </div>
        </div>

    </div>
}