import React from "react"
import { Link } from "react-router-dom"
import { GiTripleYin } from "react-icons/gi"
import { AiOutlineBank, AiOutlineFileExclamation, AiFillCloseCircle, AiOutlineCalendar, AiOutlineSetting, AiOutlineUnorderedList } from "react-icons/ai"
import { auth, showSidebar } from "../../root"
import { useRecoilValue } from "recoil"
import { motion } from "framer-motion"

/** @type { comp } descript: { none } */
export default function Sidebar({ showSidebar }) {
    let __auth__ = useRecoilValue(auth)

    return <div className="relative sidebar w-[20%] h-[100vh] bg-lightdark">
        <div onClick={() => showSidebar(false)}
            className="cursor-pointer absolute top-[50%] right-0 bg-darkgreen
        rounded-l-xl text-white z-[1] px-2 py-4 text-lg font-bold">{"<"}</div>
        <div className="logo flex items-center bg-heavydark p-4 h-[12vh]">
            <GiTripleYin className="text-white text-5xl" />
            <Link to="/home" className=" text-white text-xl font-bold ml-4">
                Royal <span className="text-lightgreen text-lg font-semibold text-xl">Academy</span>
            </Link>
        </div>
        <main className="py-4">

            <div className="profile p-2 flex mx-4 mb-4 rounded-xl items-center gap-4 bg-heavydark">
                <img src="https://picsum.photos/45/45" alt="profile" className="rounded-full" />
                <div>
                    <h3 className="text-lg text-white font-bold uppercase">{__auth__?.username}</h3>
                    <div className="flex w-full items-center gap-2 text-base text-gray-400">
                        <img className="w-[22px] h-[22px]" src="https://img.icons8.com/flat-round/64/000000/crown--v1.png"/>
                        5500
                    </div>
                </div>
            </div>

            <div className="menu-list">

                <Sidebar.MenuItem link={"/home"}>
                    <AiOutlineBank className="text-xl" /> <span className="text-lg">Thư Viện</span>
                </Sidebar.MenuItem>

                <Sidebar.MenuItem link={"/home"}>
                    <AiOutlineSetting className="text-xl" /> <span className="text-lg">Cài Đặt</span>
                </Sidebar.MenuItem>

                <Sidebar.MenuItem link={"/courses"}>
                    <AiOutlineUnorderedList className="text-xl" /> <span className="text-lg">Khóa Học</span>
                 </Sidebar.MenuItem>

            </div>

            <Sidebar.MenuItem link={"/courses"}>
                <AiOutlineCalendar className="text-xl" /> <span className="text-lg">Hoạt Động</span>
            </Sidebar.MenuItem>

            <h2 className="text-lg font-bold text-gray-400 my-2 mx-4">Teacher</h2>

            <Sidebar.MenuItem link={"/home"}>
                <AiOutlineUnorderedList className="text-xl" /> <span className="text-lg">Quản Lý</span>
            </Sidebar.MenuItem>

            <Sidebar.MenuItem link={"/home"}>
                <AiOutlineCalendar className="text-xl" /> <span className="text-lg">Hoạt Động</span>
            </Sidebar.MenuItem>

            <Sidebar.MenuItem link={"/home"}>
                <AiOutlineFileExclamation className="text-xl" /> <span className="text-lg">Hướng Dẫn</span>
            </Sidebar.MenuItem>

        </main>
    </div>
}

Sidebar.MenuItem = function MenuItem({ link, children }) {
    return <Link to={link} className="after:hidden hover:after:block after:absolute after:top-0 after:w-[5%] after:h-[100%] after:-inset-1 after:bg-lightgreen relative inline-block hover:bg-heavydark flex items-center gap-6 text-white flex items-center py-2 px-4 bg-lightdark">{children}</Link>
}