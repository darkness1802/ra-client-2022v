import React, { useState, useEffect } from "react"
import "../../styles/Information.css"
import { AiOutlineUser, AiFillGithub, AiFillPlusCircle, AiOutlineExperiment, AiFillDownCircle, AiOutlineFundProjectionScreen } from "react-icons/ai"
import { GrStatusGoodSmall } from "react-icons/gr"
import { BiUserCircle } from "react-icons/bi"
import { BsInfoCircle, BsCodeSlash } from "react-icons/bs"
import { FaFacebookF, FaGithub, FaYoutube, FaFacebook } from "react-icons/fa"
import { SiHtml5, SiCss3, SiExpress, SiTailwindcss, SiCplusplus, SiPython, SiJavascript, SiReact, SiNodedotjs, SiGraphql } from "react-icons/si"
import { IoLogoJavascript } from "react-icons/io"
import { FcGoogle } from "react-icons/fc"
import { MdWork, MdSchool } from "react-icons/md"
import Posts from "./Posts"
interface Props { }

function openInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
}

export default function Information({ show }) {

    useEffect(() => {alert("responsive mode is not supported on this site")}, [])

    const [pick, setPick] = useState<string>("")

    return <div className="about/info-manager flex px-0 md:px-10 lg:px-20 rounded-xl items-center justify-center py-0 lg:py-6">
        <Information.Left pick={pick} show={show} setPick={setPick} />
        <Information.Right pick={pick} setPick={setPick} />
    </div>
}

interface LeftProps {
    pick: string,
    show: (value: boolean) => void,
    setPick: (value: string) => void
}

Information.Left = function __Left__({ pick, show, setPick }: LeftProps) {
    return <div className="infomation_left lg:flex flex-col bg-heavydark bg-opacity-60 w-[20%] rounded-tl-xl">
        <div className="top flex items-center justify-start px-4 py-4 gap-1 h-[5vh]">
            <button onClick={() => show(false)} className="text-red-500 text-lg"><AiFillDownCircle /></button>
            <button className="text-lightgreen text-lg"><AiFillPlusCircle /></button>
        </div>

        <div className="h-[80vh] py-4">
            <p className="pl-4 bg-lightdark py-3 bg-opacity-50 text-sm font-semibold text-gray-300">Portfolio </p>

            <div className="flex flex-col pt-4">

                <p className="ml-4 text-base text-gray-300 py-2">Quick Access</p>

                <p onClick={() => openInNewTab("https://facebook.com/tlt69")} className="text-white cursor-pointer text-base after:hidden pl-4 w-full hover:after:block after:absolute after:top-0 after:w-[3%] after:h-[100%] after:left-0 after:bg-sky-500 relative inline-block hover:bg-heavydark hover:bg-opacity-30 flex items-center gap-6 text-white flex items-center py-2 px-4">
                    <span className="rounded-full p-1 border-[0.6px] border-solid border-white">
                        <FaFacebookF className="text-white" />
                    </span>
                    Facebook
                </p>

                <p onClick={() => openInNewTab("https://github.com/Darkness-Scholar")} className="text-white cursor-pointer text-base after:hidden pl-4 w-full hover:after:block after:absolute after:top-0 after:w-[3%] after:h-[100%] after:left-0 after:bg-sky-500 relative inline-block hover:bg-heavydark hover:bg-opacity-30 flex items-center gap-6 text-white flex items-center py-2 px-4">
                    <span className="rounded-full p-1 border-[0.6px] border-solid border-white">
                        <FaGithub className="text-white" />
                    </span>
                    Github
                </p>

                <p onClick={() => openInNewTab("https://www.youtube.com/channel/UCxymz9n9SGu6yN4fRwaNCFA")} className="text-white cursor-pointer text-base after:hidden pl-4 w-full hover:after:block after:absolute after:top-0 after:w-[3%] after:h-[100%] after:left-0 after:bg-sky-500 relative inline-block hover:bg-heavydark hover:bg-opacity-30 flex items-center gap-6 text-white flex items-center py-2 px-4">
                    <span className="rounded-full p-1 border-[0.6px] border-solid border-white">
                        <FaYoutube className="text-white" />
                    </span>
                    Youtube
                </p>

            </div>

            <div className="flex flex-col pt-4">

                <p className="ml-4 text-base text-gray-300 py-2">About</p>

                <Information.MenuItem icon={<AiOutlineUser className="text-white" />}
                    pick={pick} picker={"1"}
                    setPick={setPick} text={"Thông tin"}
                />

                <Information.MenuItem icon={<AiOutlineExperiment className="text-white" />}
                    pick={pick} picker={"2"}
                    setPick={setPick} text={"Kinh nghiệm"}
                />

                <Information.MenuItem icon={<AiOutlineFundProjectionScreen className="text-white" />}
                    pick={pick} picker={"3"}
                    setPick={setPick} text={"Thành tựu"}
                />

            </div>


        </div>

    </div>
}

interface RightProps {
    pick: string,
    setPick: (value: string) => void
}

Information.Right = function __Right__({ pick, setPick }: RightProps) {


    return <div style={{ backgroundImage: "url(/images/bga.jpg)" }} className="bg-cover w-[100%] lg:w-[80%] h-[100vh] lg:h-[85vh] rounded-tr-xl overflow-y-scroll scroll scrollbar-thin">
        <div className="top h-[5vh] py-4 flex items-center justify-between px-4">
            <button className="text-white py-1 text-sm flex bg-lightdark bg-opacity-20 px-2 gap-1 items-center">
                <span><AiOutlineFundProjectionScreen /></span>
            </button>

            <div className="flex gap-2 py-2">
                <button className="text-white py-1 text-sm flex px-2 gap-1 items-center">
                    <span className="flex items-center max-h-[1rem] gap-1"><AiOutlineUser />Tung Hwang</span>
                </button>
                <button className="text-white py-1 text-sm flex bg-lightdark bg-opacity-20 px-2 gap-1 items-center">
                    <span><BsInfoCircle /></span>
                </button>
            </div>
        </div>
        <div className="body h-[95vh] lg:h-[80vh] overflow-y-scroll scrollbar-thin p-8">


            <div style={{ backgroundImage: `url(https://www.qualitydevs.com/wp-content/uploads/2017/12/desarrollador-1288x724.jpg)` }}
                className="relative bg-cover rounded-t-xl bg-lightdark flex flex-col h-[30vh] bg-opacity-30 items-center justify-center">

                <div className="text-center m-auto w-full pb-4">
                    <h1 className="text-7xl drop-shadow-2xl font-bold text-gray-200 uppercase">Tung Hwang</h1>
                    <p className="text-2xl drop-shadow-2xl font-semibold text-gray-200">Full Stack Developer</p>
                </div>
                <div className="absolute bottom-0 flex bg-lightdark bg-opacity-30 justify-evenly items-end w-full py-4">
                    <div className="flex text-white gap-6">
                        <SiHtml5 className="text-2xl text-orange-500 hover:scale-[150%] duration-300" />
                        <SiCss3 className="text-2xl text-blue-500 hover:scale-[150%] duration-300" />
                        <SiJavascript className="text-2xl text-yellow-400 hover:scale-[150%] duration-300" />
                        <SiPython className="text-2xl text-sky-600 hover:scale-[150%] duration-300" />
                        <SiCplusplus className="text-2xl text-purple-500 hover:scale-[150%] duration-300" />
                    </div>
                    <div className="flex text-white gap-6">
                        <SiReact className="text-2xl text-sky-500 hover:scale-[150%] duration-300" />
                        <SiNodedotjs className="text-2xl text-green-500 hover:scale-[150%] duration-300" />
                        <SiExpress className="text-2xl text-yellow-300 hover:scale-[150%] duration-300" />
                        <SiTailwindcss className="text-2xl text-blue-500 hover:scale-[150%] duration-300" />
                        <SiGraphql className="text-2xl text-pink-500 hover:scale-[150%] duration-300" />
                    </div>
                </div>

                <div className="absolute z-10 -bottom-[44px]">
                    <img src="/images/user.png" className="w-[88px] h-[88px]" alt="" />
                </div>
            </div>
            <div className="relative flex h-[44px] bg-gray-400 bg-opacity-́40 items-center justify-center">
                <button className="bg-sky-500 w-full h-full font-semibold text-lg flex items-center justify-center">
                    <FaFacebook className="text-xl mr-2" />
                    Facebook
                </button>
                <button className="bg-gray-200 w-full h-full font-semibold text-lg flex items-center justify-center">
                    Github
                    <FaGithub className="text-xl ml-2" /></button>
            </div>

            <div className="flex my-4 w-full">
                <div className="w-[30%] h-[70vh] bg-lightdark bg-opacity-50 rounded-xl mr-2 text-center">
                    <h2 className="text-white text-xl font-semibold bg-heavydark bg-opacity-30 py-2 rounded-t-xl">Tiểu sử</h2>
                    <p className="mt-4 text-base text-white">Birthday: 18/02/1999</p>
                    <p className="text-base text-white">Email: rsoft.hwang99@gmail.com</p>
                    <p className="text-base text-white mb-4">SDT: 0987654321</p>

                    <div className="m-auto w-[60%] bg-gray-300 h-[3px] my-1"></div>

                    <div className="flex items-center justify-start mt-4 px-6">
                        <MdSchool className="text-gray-200 text-lg" />
                        <h3 className="ml-1 text-center text-lg text-gray-300">Học tập trình tại nhà</h3>
                    </div>
                    <div className="flex items-center justify-start px-6">
                        <MdWork className="text-gray-200 text-lg" />
                        <h3 className="ml-1 text-center text-lg text-gray-300">Hỗ trợ làm đồ án cho sinh viên</h3>
                    </div>
                    <div className="flex items-center justify-start px-6">
                        <MdWork className="text-gray-200 text-lg" />
                        <h3 className="ml-1 text-center text-lg text-gray-300">Sáng lập Royal Academy</h3>
                    </div>
                    <div className="flex items-center justify-start px-6">
                        <MdWork className="text-gray-200 text-lg" />
                        <h3 className="ml-1 text-lg text-gray-300">Freelance Web/App</h3>
                    </div>


                </div>
                <div className="ml-2 w-[70%] h-[70vh] overflow-y-scroll scrollbar-thin bg-opacity-50 rounded-xl pb-4">

                    <div className="w-full bg-lightdark bg-opacity-50 rounded-t-xl py-4 mb-4">

                        <div className="top px-6 flex items-center w-full">
                            <img src="/images/user.png" className="rounded-full border-solid border-lightgreen border-[4px] w-[40px] h-[40px]" alt="" />
                            <div className="ml-4 w-full">
                                <p className="text-gray-200 text-lg">Tung Hwang</p>
                                <div className="flex w-full justify-between items-center">
                                    <p className="w-[40%] text-gray-300 text-base">Lvl: Junior developer</p>
                                    <div className="w-full bg-white h-[12px] rounded-lg">
                                        <div className="bg-softgreen w-[30%] rounded-l-lg h-[12px]"></div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between items-center">
                                    <small className="w-[40%] text-gray-300 text-sm">Exp: 1 / 3 years to Lvl up</small>
                                    <div className="w-full bg-white h-[12px] rounded-lg">
                                        <div className="bg-red-600 w-[33.33%] rounded-l-lg h-[12px]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <Posts />

                </div>
            </div>
        </div>
    </div>
}

interface MenuItemProps {
    icon?: JSX.Element,
    pick: string,
    picker: string,
    text: string,
    setPick: (value: string) => void,
    rest?: any[]
}
Information.MenuItem = function __MenuItem__({ icon, text, pick, picker, setPick, ...rest }: MenuItemProps) {
    return <p onClick={() => setPick(picker)} className={`${pick === picker && "ra-active"} text-white cursor-pointer text-base after:hidden pl-4 w-full hover:after:block after:absolute after:top-0 after:w-[3%] after:h-[100%] after:left-0 after:bg-sky-500 relative inline-block hover:bg-heavydark hover:bg-opacity-30 flex items-center gap-6 text-white flex items-center py-2 px-4`}>
        <span className="rounded-full p-1 border-[0.6px] border-solid border-white">
            {icon ? icon : null}
        </span> {text}
    </p>
}