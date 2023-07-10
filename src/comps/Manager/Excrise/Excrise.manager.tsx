import React, { useState, useEffect } from "react"
import { AiFillDownCircle, AiFillPlusCircle, AiFillFileWord, AiFillFileUnknown } from "react-icons/ai"
import { FiClipboard, FiFileText, FiTool, FiTrash2 } from "react-icons/fi"
import Request from "../../../request"
import Upload from "./Upload"
import { useRecoilValue } from "recoil"
import { auth } from "../../../root"
import { motion } from "framer-motion"
import { modal } from "../../../animations/modal"

interface iProps {
	setShowModal: (value: boolean) => void,
	courseId: string
}

const ACTION = {
	CREATE_EXCRISE: "CREATE_EXCRISE",
	CREATE_TEST: "CREATE_TEST",
	CREATE_QUESTION: "CREATE_QUESTION",
}

export default function ExcriseManager({ setShowModal, courseId }: iProps): JSX.Element {

	const [title, $title] = useState<string>("")
	const [content, $content] = useState<string>("")
	const [action, $action] = useState<string>("")

	return <motion.div drag variants={modal} initial="hidden" animate="visible" className="flex w-[85vw] rounded-xl">
		<ExcriseManager.LeftSide courseId={courseId} action={action} setAction={$action} setShowModal={setShowModal} />
		<ExcriseManager.RightSide courseId={courseId} action={action}/>
	</motion.div>
}

interface iLeftSideProps {
	courseId: string
	action: string
	setAction: (value: string) => void
	setShowModal: (value: boolean) => void
}

ExcriseManager.LeftSide = function _LeftSide_({ courseId, action, setAction, setShowModal }: iLeftSideProps): JSX.Element {
	const [excrisesData, setExcrisesData] = useState<any[]>([])
	useEffect(() => {
		// GET EXCRISES
		const getExcrises = async () => {
			const {data} = await Request.Get(`/excrise/?courseId=${courseId}`)
			setExcrisesData(data)
		}; getExcrises()
	}, [])
	
	return <div className="bg-heavydark bg-opacity-90 w-[25%] rounded-tl-xl">
		<div className="top flex items-center justify-start px-4 py-4 gap-1">
			<button onClick={() => setShowModal(false)} className="text-red-500 text-lg"><AiFillDownCircle /></button>
			<button className="text-lightgreen text-lg"><AiFillPlusCircle /></button>
		</div>

		<div className="box h-[80vh] overflow-y-scroll scroll scrollbar-none py-4 text-white">
			<p className="ml-4 text-sm font-semibold text-gray-400 mb-4">Excrise Controller</p>
			<p onClick={()=>setAction(ACTION.CREATE_EXCRISE)} className={`${action === ACTION.CREATE_EXCRISE && "bg-black bg-opacity-60"} cursor-pointer pl-4 py-1 flex items-center gap-1 text-sm text-gray-300 mb-2`}>
				<AiFillFileWord className="text-md text-lightgreen" /> Tạo bài tập
			</p>

			<p onClick={()=>setAction(ACTION.CREATE_QUESTION)} className={`${action === ACTION.CREATE_QUESTION && "bg-black bg-opacity-60"} cursor-pointer pl-4 py-1 flex items-center gap-1 text-sm text-gray-300 mb-2`}>
				<AiFillFileUnknown className="text-md text-orange-400" /> Tạo câu hỏi
			</p>

			<p className="ml-4 text-sm font-semibold text-gray-400 my-4">Your Excrises</p>

			{excrisesData?.map((item, index) => <ExcriseManager.Item key={item._id}>
				<span className="flex items-center gap-2 text-sm">
					{item.genre==="Q"?<FiFileText className="text-md text-orange-400" />
					:<FiClipboard className="text-md text-lightgreen" />}
					{item.title}</span>
			</ExcriseManager.Item>)}

		</div>
	</div>
}

interface RightSideProps {
	courseId: string
	action: string
}

ExcriseManager.RightSide = function _RightSide_({action, courseId}:RightSideProps): JSX.Element {

	const [excriseStatus, setExcriseStatus] = useState<string>("")
	const [excriseTitle, setExcriseTitle] = useState<string>("")
	const [excriseDescription, setExcriseDescription] = useState<string>("")
	const [excriseLimit, setExcriseLimit] = useState<string>("")
	const __auth__ = useRecoilValue(auth)
	const createExcrise = async () => {
		let {data} = await Request.Post(`/excrise/create`, {
			status: excriseStatus,
			genre: action===ACTION.CREATE_EXCRISE? "E" : "Q", 
			title: excriseTitle, 
			description: excriseDescription, 
			courseId, 
			limit: excriseLimit
		}, { access: __auth__.access })
		window.location.reload()
	}
	
	return <div className="overflow-y-scroll h-[90vh] pb-8 scrollbar-thin flex flex-col gap-8 bg-lightdark bg-opacity-80 w-full rounded-tr-xl px-6">
		<div className="top flex bg-gradient-to-b bg-opacity-40 from-lightdark to-purple-500 h-[250px]">
			<div className="text-white p-6 flex flex-col gap-20 w-[25%]">
				<div className="">
					<small className="text-gray-300 uppercase">Quản Lý Bài Tập</small>
					<p className="text-gray-300 text-base font-semibold">
						{action===ACTION.CREATE_EXCRISE? "Tạo Bài Tập" : "Tạo Câu Hỏi"}
					</p>
				</div>

				<div className="">
					<p className="text-xs text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, magni reprehenderit</p>
					<p className="text-xs text-white font-semibold">Xem hướng dẫn</p>
				</div>
			</div>
			<div className="text-white w-[75%]">
				<img src="/images/dark-bg-image.jpg" className="w-full h-full" alt="" />
			</div>
		</div>

		<div className="body flex justify-between gap-8">
			<div onClick={() => setExcriseStatus(`online`)} className="cursor-pointer p-6 bg-heavydark flex gap-4">
				<div className="txt-group">
					<p className="text-xs text-white uppercase">{action===ACTION.CREATE_EXCRISE?"Bài tập":"Câu hỏi"} trên lớp</p>
					<p className="text-lg font-[500] text-white">Giao Bài Tập Ngay Trong Tiết Học</p>
					<p className="my-1 text-xs text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum magnam dolorem dolore voluptatem maiores quod facilis sed</p>
				</div>
				<img src="https://picsum.photos/150/150" alt="" className="rounded-full" />
			</div>

			<div onClick={() => setExcriseStatus(`offline`)} className="cursor-pointer p-6 bg-heavydark flex gap-4">
				<div className="txt-group">
					<p className="text-xs text-white uppercase">{action===ACTION.CREATE_EXCRISE?"Bài tập":"Câu hỏi"} về nhà</p>
					<p className="text-lg font-[500] text-white">Giao Bài Tập Về Nhà</p>
					<p className="my-1 text-xs text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum magnam dolorem dolore voluptatem maiores quod facilis sed</p>
				</div>
				<img src="https://picsum.photos/150/150" alt="" className="rounded-full" />
			</div>
		</div>

		{excriseStatus && <div className="body flex flex-col justify-between gap-2">
			<div>
				<h1 className="text-gray-200 font-bold mb-1 text-center ">{excriseStatus==="online"?"BÀI TẬP TRÊN LỚP":"BÀI TẬP VỀ NHÀ"}</h1>
				<small className="hidden text-sky-500">Đề bài</small>
				<div className="flex gap-2 mt-2">
					<input onChange={(e) => setExcriseTitle(e.target.value)} placeholder="Nhập đề bài" type="text" className="text-gray-300 text-sm bg-heavydark py-2 px-4 w-[80%]" />
					<input onChange={(e) => setExcriseLimit(e.target.value)} type="date" placeholder="Thời gian nộp bài" className="text-gray-200 text-sm bg-red-500 py-2 px-4 w-[20%]" />
				</div>
				<textarea onChange={(e) => setExcriseDescription(e.target.value)} rows={5} placeholder="Mô tả về bài tập này hoặc hướng dẫn cách làm" className="mt-2 text-gray-300 text-sm bg-heavydark py-2 px-4 w-full" />
			</div>

			<button onClick={createExcrise} className="w-full text-white bg-lightgreen text-sm font-[500] py-4">Hoàn tất</button>
		</div>}
	</div>
}


interface iItem {
	children: JSX.Element
}

ExcriseManager.Item = function _Item_({ children }: iItem): JSX.Element {
	const [buttons, showButtons] = useState<boolean>(false)
	return <button onMouseEnter={() => showButtons(true)} onMouseLeave={() => showButtons(false)} className="flex justify-between after:hidden pl-4 w-full hover:after:block after:absolute after:top-0 after:w-[5%] after:h-[100%] after:-inset-1 after:bg-sky-500 relative inline-block hover:bg-heavydark flex items-center gap-6 text-white flex items-center py-2 px-4">
		{children}
		{
			buttons && <div className="btn-group flex gap-1">
				<FiTool className="text-lg" />
				<FiTrash2 className="text-lg" />
			</div>
		}
	</button>
}