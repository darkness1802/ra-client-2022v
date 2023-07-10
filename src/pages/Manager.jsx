import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import Navbar from "../comps/Private/Navbar"
import Request, { DELETE_COURSE, COURSE_INFO, ADD_ASSIGNMENT, FIND_ASSIGNMENT, UPDATE_ASSIGNMENT } from "../request"
import { auth, excriseManager, assignmentManager } from "../root"
import { useRecoilValue, useRecoilState } from "recoil"
import { BiGroup, BiInfinite } from "react-icons/bi"
import { RiVideoFill, RiStackLine, RiBarChartHorizontalFill } from "react-icons/ri"
import { AiOutlineCalendar, AiFillDelete, AiFillEdit, AiOutlineCaretDown } from "react-icons/ai"
import { CircularProgressbar } from 'react-circular-progressbar';
import { TiEdit } from "react-icons/ti"
import 'react-circular-progressbar/dist/styles.css';
import Description from "../comps/Private/Description"
import * as Plugins from "../plugins"
import Modal from "../comps/Modal.tsx"
import ExcriseManager from "../comps/Manager/Excrise/Excrise.manager.tsx"
import AssignmentManager from "../comps/Manager/Assignment/Assignment.manager.tsx"
import Button from "../comps/utils/Button"

export default function Manager() {

    const { id } = useParams()
    const history = useHistory()
    const __auth__ = useRecoilValue(auth)
    const [course, setCourse] = useState({})
    const [__excriseManager__, showExcriseManager] = useRecoilState(excriseManager)
    const [__assignmentManager__, showAssignmentManager] = useRecoilState(assignmentManager)
    const [assignments, setAssignments] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [content, setContent] = useState("")
    const [editor, setEditor] = useState(false)

    // useEffect(() => { return ()=>{ document.title = "Royal Academy" } }, [])

    useEffect(() => {
        async function getCourseInfo() {
            try {
                let { data } = await Request.Get(`${COURSE_INFO}?id=${id}`, { access: __auth__.access })
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

    const deleteCourse = async () => {
        try {
            let { data } = await Request.Post(DELETE_COURSE, { id }, { access: __auth__.access })
            history.push("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    /** Assignments type
     * @typedef { Object } Assignment
     * @property { string } course id khóa học
     * @property { string } content nội dung của tiết học, bài giảng,...
     */

    /** @param { Assignment } assignment*/
    const addAssignment = async () => {
        try {
            if (!content) throw new Error("Content is empty")
            let { data } = await Request.Post(ADD_ASSIGNMENT, { courseId: id, content }, { access: __auth__.access })
            setShowForm(false)
        } catch (error) {
            console.error("Error")
            setShowForm(false)
        }
    }

    const updateAssignment = async (id, content) => {
        let res = await Request.Post(UPDATE_ASSIGNMENT, { id, content }, { access: __auth__.access })
    }
    return <div className="bg-black dashboard-main w-full">

        { __excriseManager__ && <Modal styles={"flex bg-black bg-opacity-60 items-center justify-center"} setShowModal={showExcriseManager}>
            <ExcriseManager setShowModal={showExcriseManager} courseId={id}/>
        </Modal> }

        { __assignmentManager__ && <Modal styles={"flex bg-black bg-opacity-60 items-center justify-center"} setShowModal={showAssignmentManager}>
            <AssignmentManager setShowModal={showAssignmentManager} courseId={id}/>
        </Modal> }

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
                        <p className="text-base text-gray-400 font-semibold">{course.token}</p>
                    </div>


                    <div className="btn-group flex items-center gap-2">
                        <Button onClick={() => history.push(`/join/${id}`)} >Start</Button>
                        <Button onClick={() => showAssignmentManager(true)}>Assignment Manager</Button>
                        <Button onClick={() => showExcriseManager(true)}>Excrise Manager</Button>
                        <Button onClick={deleteCourse}>Delete</Button>
                    </div>
                </div>

                <div className="hidden bg-lightdark w-full text-base text-white p-4 mb-4">
                    <h1 className="font-semibold text-xl uppercase border-b-4 border-b-white border-b-solid">Title</h1>
                    <p className="text-base mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Harum recusandae assumenda officia voluptas corporis blanditiis 
                        voluptatibus nulla, expedita delectus perferendis. 
                        Ad repudiandae hic assumenda error odit iste totam tempora dicta.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Harum recusandae assumenda officia voluptas corporis blanditiis 
                        voluptatibus nulla, expedita delectus perferendis. 
                        Ad repudiandae hic assumenda error odit iste totam tempora dicta.</p>
                </div>

                {showForm && <div className=" bg-lightdark w-full mb-4 py-4 px-4">
                    <div className="relative">
                        {/* icon */}
                        <input onChange={({ target }) => setContent(target.value)} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-heavydark rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-heavydark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Assignment Content" required />
                        <button onClick={addAssignment} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Complete</button>
                    </div>
                </div>}

                <div className="flex gap-4 w-full">
                    <div className="grid grid-cols-4 gap-4 w-full">
                        <Manager.Card data={{ title: `${course?.students?.length} Students`, description: 'Enrolled' }} icon={BiGroup} />
                        <Manager.Card data={{ title: `${assignments?.length} Assignments`, description: 'Assigned' }} icon={RiStackLine} />
                        <Manager.Card data={{ title: 'Schedule', description: '13:00 Mon/Wed/Fri' }} icon={AiOutlineCalendar} />
                        <Manager.Card data={{ title: 'In Progress', description: '80%' }} icon={RiBarChartHorizontalFill} />
                    </div>
                </div>


                <h1 className="rs-heading items-center gap-2"><span className="cursor-pointer" onClick={() => setEditor(!editor)}><AiFillEdit /></span>Description</h1>

                <Description>
                    {editor ? <Description.Editor courseId={id} description={course.description} setEditor={setEditor} />
                        : <Description.View description={course.description} />}
                </Description>

                <Manager.Videos>
                    <Plugins.RoyalMedia auth={__auth__} course={course}/>        
                </Manager.Videos>

            </div>
        </main>
    </div>

}

Manager.Card = function __Card__({ data, icon: Icon }) {
    return <div className="w-full h-[170px] bg-lightdark flex items-center justify-center gap-2">
        <Icon className="text-6xl text-lightgreen" />
        <div className="flex-col">
            <h1 className="text-xl text-white font-bold">{data.title}</h1>
            <small className="text-md text-gray-400 uppercase">{data.description}</small>
        </div>
    </div>
}

Manager.Assignments = function __Assignments__({ data, auth, ...props }) {

    const [showAssignments, setShowAssignments] = useState(false)


    return <div className="w-full my-4 bg-lightdark">
        <div className="heading flex justify-end py-2 px-4">
            <h1 onClick={() => setShowAssignments(!showAssignments)}
                className="flex items-center gap-2 cursor-pointer text-white text-lg font-bold">
                <span><AiOutlineCaretDown /></span>
                Assignments</h1>
        </div>
        {showAssignments && data?.map(
            (a, index) => <Settings.A key={index} data={a} auth={auth}></Settings.A>
        )}
    </div>
}

Manager.Videos = function __Videos__({ children, data, auth, ...props }) {
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

Manager.A = function __A__({ data, auth }) {
    let [editor, setEditor] = useState(false)
    let [text, setText] = useState(data.content)

    const updateAssignment = async () => {
        try {
            const res = await Request.Post(UPDATE_ASSIGNMENT, { id: data._id, content: text }, { access: auth.access })
            console.log(`Update thanh cong`)
        } catch (error) {
            console.log(`Update that bai`)
        }
    }

    return <div className="flex items-center justify-between px-4 my-4 gap-4">
        {editor ?
            <form onSubmit={updateAssignment} className="w-full">
                <input onChange={({ target }) => setText(target.value)} className="text-gray-300 font-bold rounded-lg py-2 px-4 w-full outline-none bg-heavydark forcus:border-none" defaultValue={data.content} />
            </form>
            : <p className="text-white py-2 px-4 text-md font-bold">{data.content}</p>}
        <div className="btn-group flex gap-2">
            <button onClick={() => setEditor(!editor)} className="bg-white px-2 text-black"><TiEdit className="text-xl" /></button>
            <button className="bg-white px-2 text-black"><AiFillDelete className="text-xl" /></button>
        </div>
    </div>
}