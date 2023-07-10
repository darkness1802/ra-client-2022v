import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import Navbar from "../comps/Private/Navbar"
import Request, { FIND_ASSIGNMENT, COURSE_INFO, ENROLL_COURSE } from "../request"
import { auth } from "../root"
import { useRecoilValue } from "recoil"
import { BiGroup, BiInfinite } from "react-icons/bi"
import { FiFlag, FiMessageSquare } from "react-icons/fi"
import { RiVideoFill, RiStackLine, RiBarChartHorizontalFill } from "react-icons/ri"
import { AiOutlineCalendar, AiFillDelete, AiFillEdit, AiOutlineCaretDown } from "react-icons/ai"
import { CircularProgressbar } from 'react-circular-progressbar';
import { TiEdit } from "react-icons/ti"
import 'react-circular-progressbar/dist/styles.css';
import Description from "../comps/Private/Description"
import * as Plugins from "../plugins"
/** @type { comps } descript: {  } */

export default function Overview() {

    console.log(`VIEW PAGE`)

    const { id } = useParams()
    const history = useHistory()
    const __auth__ = useRecoilValue(auth)
    const [course, setCourse] = useState({})
    const [assignments, setAssignments] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [content, setContent] = useState("")
    const [editor, setEditor] = useState(false)

    // useEffect(() => { return ()=>{ document.title = "Royal Academy" } }, [])
    console.log(__auth__)

    useEffect(() => {
        async function getCourseInfo() {
            try {
                let { data } = await Request.Get(`${COURSE_INFO}?id=${id}`, { access: __auth__.access })
                console.log(data)
                setCourse(data)
            } catch (error) {
                console.log(error)
                history.push("/dashboard")
            }
        }; getCourseInfo()

    }, [id])

    useEffect(() => {
        async function findAssignments() {
            try {
                let { data } = await Request.Get(`${FIND_ASSIGNMENT}?id=${id}`, { access: __auth__.access })
                setAssignments(data)
            } catch (error) {
                console.log(error)
            }
        }; findAssignments()

    }, [id])

    const enroll = async () => {
        try {
            let { data } = await Request.Post(ENROLL_COURSE, { courseId:id }, { access: __auth__.access })
            alert(`Tham gia thành công`)
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="bg-black dashboard-main w-full">
        <Navbar />
        <main className="relative">
            <div className="h-[88vh] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-lightdark px-12">
            <div className="heading py-8">
                    <h2 className="text-white text-md text-lightgreen uppercase font-bold">Royal Academy</h2>
                    <h1 className="text-white text-2xl text-white uppercase font-bold">DASHBOARD</h1>
                </div>

                <div className="bg-lightdark w-full py-3 px-4">
                    <img src="https://picsum.photos/1100/300" className="rounded-xl" alt="" />
                </div>

                <div className="flex items-center justify-between bg-lightdark w-full mb-4 py-3 px-4">
                    <div className="txt-group flex items-center gap-2">
                        <h2 className="text-white text-xl font-bold flex gap-2">{course.title}</h2>
                        <p className="text-base text-gray-400 font-semibold">Lượt xem: {course.views}</p>
                    </div>


                    <div className="btn-group flex items-center gap-4">
                        <div className="cursor-pointer flex pl-4 rounded-full bg-heavydark hover:bg-gray-600 items-center justify-between">
                            <p className="text-white text-base mr-3">Báo cáo vi phạm</p>
                            <span className="bg-red-500 p-2 rounded-full border-heavydark border-solid border-2"><FiFlag className="text-xl text-white"/></span>
                        </div>

                        <span className="cursor-pointer bg-lightgreen hover:bg-softgreen p-2 rounded-full">
                            <FiMessageSquare className="text-xl text-white"/>
                        </span>

                        <button onClick={enroll} className="text-white bg-lightgreen hover:bg-softgreen text-base font-normal px-4 py-2 rounded-xl">Tham gia</button>
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-4 w-full">
                        <Overview.Card data={{ title: `${course?.students?.length} Students`, description: 'Enrolled' }} icon={BiGroup} />
                        <Overview.Card data={{ title: `${assignments?.length} Assignments`, description: 'Assigned' }} icon={RiStackLine} />
                        <Overview.Card data={{ title: 'Schedule', description: '13:00 Mon/Wed/Fri' }} icon={AiOutlineCalendar} />
                        <Overview.Card data={{ title: 'In Progress', description: '80%' }} icon={RiBarChartHorizontalFill} />
                    </div>
                </div>

                <Overview.Assignments data={assignments} auth={__auth__}>

                </Overview.Assignments>

                <h1 className="rs-heading items-center gap-2"><span className="cursor-pointer" onClick={() => setEditor(!editor)}><AiFillEdit /></span>Description</h1>

                <Description><Description.View description={course.description} />
                </Description>

                <Overview.Videos>
                    <Plugins.RoyalMedia viewOnly={true} auth={__auth__} course={course}/>        
                </Overview.Videos>

            </div>
        </main>
    </div>

}

Overview.Card = function __Card__({ data, icon: Icon }) {
    return <div className="w-full h-[170px] bg-lightdark flex items-center justify-center gap-2">
        <Icon className="text-6xl text-lightgreen" />
        <div className="flex-col">
            <h1 className="text-xl text-white font-bold">{data.title}</h1>
            <small className="text-md text-gray-400 uppercase">{data.description}</small>
        </div>
    </div>
}

Overview.Assignments = function __Assignments__({ data, auth, ...props }) {

    const [showAssignments, setShowAssignments] = useState(false)

    console.log(data)

    return <div className="w-full my-4 bg-lightdark">
        <div className="heading flex justify-end py-2 px-4">
            <h1 onClick={() => setShowAssignments(!showAssignments)}
                className="flex items-center gap-2 cursor-pointer text-white text-lg font-bold">
                <span><AiOutlineCaretDown /></span>
                Assignments</h1>
        </div>
        {showAssignments && data?.map(
            (a, index) => <View.A key={index} data={a} auth={auth}></View.A>
        )}
    </div>
}

Overview.Videos = function __Videos__({ children, data, auth, ...props }) {
    return <div className="w-full min-h-[100px] my-4 flex flex-col items-center justify-center">
        <div className="flex justify-end w-full py-2 px-4 bg-lightdark border-b-black border-b-4 border-b-solid">
            <h1 className="text-white text-lg flex items-center gap-2 font-bold">
                <RiVideoFill />
                Recorded Lessions
            </h1>
        </div>
        { children }
    </div>
}

Overview.A = function __A__({ data, auth }) {


    return <div className="flex items-center justify-between px-4 my-4 gap-4">
<p className="text-white py-2 px-4 text-md font-bold">{data.content}</p>
        <div className="btn-group flex gap-2">
            
        </div>
    </div>
}