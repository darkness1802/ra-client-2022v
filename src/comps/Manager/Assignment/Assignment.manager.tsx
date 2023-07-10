import React, { useState, useEffect } from "react"
import { AiOutlinePlusCircle, AiTwotoneDelete, AiFillTool, AiFillDownCircle, AiFillPlusCircle, AiFillFileWord, AiFillFileExcel, AiFillFileUnknown } from "react-icons/ai"
import { FiTool, FiTrash2 } from "react-icons/fi"
import { auth, targetData } from "../../../root"
import Request, { FIND_ASSIGNMENT, UPDATE_ASSIGNMENT, ADD_ASSIGNMENT } from "../../../request"
import { useRecoilState } from "recoil"
import { motion } from "framer-motion"
import { IoTrashOutline, IoSettingsOutline, IoPrismSharp } from "react-icons/io5"
import { modal } from "../../../animations/modal"
import AssignmentService from "../../../service/Assignment.service"

interface iProps {
	setShowModal: (value: boolean) => void,
	courseId: string
}


export default function AssignmentManager({ setShowModal, courseId }: iProps): JSX.Element {

	const [__auth__, setAuth] = useRecoilState(auth)

	const [actions, setActions] = useState<any>("")

	return <motion.div drag variants={modal} initial="hidden" animate="visible" className="flex w-[85vw] rounded-xl">
		<AssignmentManager.LeftSide courseId={courseId} setActions={setActions} setShowModal={setShowModal} />
		<AssignmentManager.RightSide actions={actions} courseId={courseId} auth={__auth__} />
	</motion.div>
}

interface iAction {
	action: string,
	payload?: any
}

interface iLeftSideProps {
	courseId: string,
	setActions: (value: string) => void,
	setShowModal: (value: boolean) => void,
}

AssignmentManager.LeftSide = function _LeftSide_({ courseId, setActions, setShowModal }: iLeftSideProps): JSX.Element {
	const [__auth__, setAuth] = useRecoilState(auth)
	const [assignments, setAssignments] = useState<any[]>([])
	const [__targetData__, setTargetData] = useRecoilState<any>(targetData)
	const [loading, setLoading] = useState<boolean>(true)
	useEffect(() => {
		async function findAssignments() {
			try {
				let { data } = await Request.Get(`${FIND_ASSIGNMENT}?id=${courseId}`, { access: __auth__.access })

				setLoading(false)
				setAssignments(data)
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		}; findAssignments()
	}, [])

	return <div className="bg-heavydark bg-opacity-90 w-[25%] rounded-tl-xl">
		<div className="top flex items-center justify-start px-4 py-4 gap-1">
			<button onClick={() => setShowModal(false)} className="text-red-500 text-lg"><AiFillDownCircle /></button>
			<button className="text-lightgreen text-lg"><AiFillPlusCircle /></button>
		</div>

		<div className="box h-[80vh] overflow-y-scroll scroll scrollbar-none py-4 text-white">
			<p className="ml-4 text-sm font-semibold text-gray-400 mb-4">Assignment Controller</p>

			<p onClick={() => setActions(`general`)} className="ml-4 cursor-pointer flex items-center gap-1 text-sm text-gray-300 mb-2">
				<AiOutlinePlusCircle className="text-md text-lightgreen" /> General
			</p>

			<p onClick={() => setActions(`create`)} className="ml-4 cursor-pointer flex items-center gap-1 text-sm text-gray-300 mb-2">
				<AiOutlinePlusCircle className="text-md text-lightgreen" /> Create Assignment
			</p>

			<p className="ml-4 text-sm font-semibold text-gray-400 my-4">Assignment List</p>

			{loading && <p className="ml-4 text-sm font-semibold text-gray-400 mb-4">Loading...</p>}
			{assignments?.map((item, index) => {
				return <AssignmentManager.Item key={item?._id} setActions={setActions} data={item}>
					<span className="flex items-center gap-2 text-sm">
						<IoPrismSharp className="text-md text-lightgreen" />
						{item?.content}</span>
				</AssignmentManager.Item>
			})}

		</div>
	</div>
}
interface iRightSideProps {
	actions: string,
	courseId: string,
	auth: any
}
AssignmentManager.RightSide = function _RightSide_({ actions, courseId, auth }: iRightSideProps): JSX.Element {

	const [__targetData__, setTargetData] = useRecoilState<any>(targetData)

	console.log(actions)

	const ping = async () => {
		let res = await AssignmentService.ping()
		console.log(res)
	}

	const ACTIONS = {
		general: <div>
			<h1 className="flex items-center gap-2 mx-4 mb-4 text-xl text-gray-300 font-bold">
			<IoPrismSharp className="text-md text-lightgreen" />
			General
		</h1>
		</div>,
		create:	<AssignmentManager.Create auth={auth} courseId={courseId} />,
		update: <AssignmentManager.Update auth={auth} data={__targetData__} />,
		default: <div>
		<h1 className="flex items-center gap-2 mx-4 mb-4 text-xl text-gray-300 font-bold">
			<IoPrismSharp className="text-md text-lightgreen" />
			General
		</h1>

		<button onClick={ping} className="text-white">PING</button>

	</div>
	}

	return <div className="bg-lightdark bg-opacity-80 w-full rounded-tr-xl">
		<div className="top flex items-center justify-center px-4 py-4">
			<p className="flex items-center gap-2 text-gray-300 font-semibold">Assignment Manager</p>
		</div>
		<div>
			{actions ? ACTIONS[actions] : ACTIONS["default"]}
		</div>
	</div>
}

AssignmentManager.Create = function __Create__({ auth, courseId }: any): JSX.Element {

	const [label, showLabel] = useState<boolean>(false)
	const [content, setContent] = useState<string>("")

	const createAssignment = async (): Promise<void> => {
		try {
			if (!content) throw new Error("Content is empty")
			let { data } = await Request.Post(ADD_ASSIGNMENT, { courseId: courseId, content }, { access: auth.access })
			alert("Assignment created")
			window.location.reload()
		} catch (error) {
			console.error(error)
			window.location.reload()
		}
	}

	return <div>
		<h1 className="flex items-center gap-2 mx-4 mb-4 text-xl text-gray-300 font-bold">
			<IoPrismSharp className="text-md text-lightgreen" />
			Create Assignment
		</h1>

		<form className="flex justify-start flex-col px-4 py-4">
			{label && <small className="text-sm text-sky-500">Tiêu đề</small>}
			<input onChange={({ target }) => setContent(target.value)} onBlur={() => showLabel(false)} placeholder={label ? "" : "Nhập tiêu đề"} onFocus={() => showLabel(true)} type="text" className="text-sm text-gray-300 font-semibold bg-heavydark w-full px-4 py-2" />
			<textarea cols={30} rows={5} placeholder="Nhập ghi chú (nếu có)" className="w-full mt-4 text-sm text-gray-300 bg-heavydark px-4 py-2"></textarea>
			<button onClick={createAssignment} type="button" className="w-full bg-gradient-to-br from-lightgreen to-green-600 mt-4 py-2 font-semibold text-gray-300">Hoàn thành</button>
		</form>
	</div>
}

interface iUpdateProps {
	auth: any,
	data: any
}

AssignmentManager.Update = function __Update__({ auth, data }: iUpdateProps): JSX.Element {

	const [progressbar, setProgressbar] = useState<number>(data?.progress || 0)
	const [content, setContent] = useState<string>(data?.content)
	const [show, setShow] = useState<boolean>(false)

	const updateAssignment = async (e: any): Promise<void> => {
		try {
			let res = await Request.Post(UPDATE_ASSIGNMENT, { id: data?._id, content, progress: progressbar }, { access: auth.access })
			setShow(false)
			window.location.reload()
		} catch (error) {
			setShow(false)
			console.error(error)
		}
	}

	return <div className="px-4">
		<h1 className="flex items-center gap-2 mb-4 text-xl text-gray-300 font-bold">
			<IoPrismSharp className="text-md text-lightgreen" />
			Update Assignment : <small className="text-gray-400">{data?._id}</small>
		</h1>
		<div className="w-full h-full px-6">
			<div className="flex items-center justify-between">
				{show ? 
				<input onChange={(e) => setContent(e.target.value)} defaultValue={data?.content}
				className="text-gray-300 font-semibold px-2 w-[80%] py-2 bg-heavydark"/>
				:<p className="text-gray-300 py-2 font-semibold">{data?.content}</p>}
				<div className="flex items-center gap-2">
					<IoSettingsOutline onClick={()=>setShow(!show)} className="text-xl text-gray-300" />
					<IoTrashOutline className="text-xl text-red-600" />
				</div>
			</div>
			<div className="flex items-center mt-4 justify-between gap-4">
				<span className="text-sm text-gray-400 font-semibold w-[20%]">Tiến trình</span>
				<input onChange={(e) => setProgressbar(Number(e.target.value))} type="range" defaultValue={data?.progress} className="w-[70%]" />
				<small className="w-[10%] text-sm text-gray-400">{progressbar}</small>
			</div>

			<button onClick={ updateAssignment } className="w-full bg-gradient-to-br from-lightgreen to-green-600 mt-4 py-2 font-semibold text-gray-300">Lưu</button>

		</div>
	</div>
}

interface iItem {
	children: JSX.Element,
	setActions: (actions: string) => void,
	data: any
}

AssignmentManager.Item = function __Item__({ children, setActions, data }: iItem): JSX.Element {
	const [buttons, showButtons] = useState<boolean>(false)
	const [__targetData__, setTargetData] = useRecoilState<any>(targetData)

	const handleClick = (): void => {
		setTargetData(data)
		setActions("update")
	}

	return <button onClick={handleClick} onMouseEnter={() => showButtons(true)} onMouseLeave={() => showButtons(false)} className="flex justify-between after:hidden pl-4 w-full hover:after:block after:absolute after:top-0 after:w-[5%] after:h-[100%] after:-inset-1 after:bg-sky-500 relative inline-block hover:bg-heavydark items-center gap-6 text-white flex items-center py-2 px-4">
		{children}
		{
			buttons && <div className="btn-group flex gap-1">
				<FiTool className="text-lg" />
				<FiTrash2 className="text-lg" />
			</div>
		}
	</button>
}