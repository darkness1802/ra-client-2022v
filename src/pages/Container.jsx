import React, { useState, useEffect } from "react"
import { notification } from "antd"
import socket from "../socket"
import { useGlobalState } from "../hooks/states"
import { useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"
import { auth, showSidebar, showQueue } from "../root"
import Sidebar from "../comps/Private/Sidebar"
import { FcQuestions, FcSurvey, FcRating, FcPuzzle, FcSettings, FcAutomatic } from "react-icons/fc"
import Modal from "../comps/Modal.tsx"
import Recharge from "../comps/Manager/Recharge/Recharge.manager.tsx"
import Survey from "../comps/Manager/Survey/Survey.manager.tsx"
import Amber from "../comps/Manager/Amber/Amber.manager.tsx"
import Sky from "../comps/Manager/Sky/Sky.manager.tsx"
import Purple from "../comps/Manager/Purple/Purple.manager.tsx"
/** @type { page } descript: { None } */
export default function Container({ children }) {
    var plugins = {
        'recharge': <Recharge />,
        'survey': <Survey />,
        'sky': <Sky />,
        'amber': <Amber />,
        'purple': <Purple />
    }
    let [__auth__, $auth] = useRecoilState(auth)
    let [showPlugin, setShowPlugin] = useState(false)
    const [__showQueue__, setShowQueue] = useRecoilState(showQueue)
    let [pluglin, setPugin] = useState('')
    let [__showSidebar__, $showSidebar] = useRecoilState(showSidebar)
    let [__showModal__, $showModal] = useGlobalState('showManager')
    let history = useHistory()

    const show = (plugin) => {
        $showModal(state => true)
        setPugin(plugin)
    }

    useEffect(() => {

        socket.on(`success:find-team`, (data) => {
            console.log(data)
            let isOkay = window.confirm(`Đã tìm thấy, có muốn vào không ?`)
            if (isOkay) history.push(`/join/${data}`)
        })
    }, [])

    return <div className={`relative dashboard flex`}>

        {__showQueue__ && <Queue auth={__auth__} setShowQueue={setShowQueue} />}

        {__showSidebar__ ?
            <Sidebar showSidebar={$showSidebar} />
            : <div className="px-2 py-4 cursor-pointer text-lg font-bold 
                absolute top-[50%] text-white z-[1] bg-darkgreen rounded-r-xl 
                flex items-center" onClick={() => $showSidebar(true)}>
                {`>`}
            </div>
        }

        {__showModal__ && <Modal styles="bg-lightdark flex items-cener justify-center px-20 pt-10 bg-opacity-50" setShowModal={setShowPlugin}>
            {plugins[pluglin]}
        </Modal>}
        {children}
        <div className="fixed z-[400] bottom-0 w-full flex items-center justify-center">

            <div className="taskbar rounded-t-xl bg-lightdark bg-opacity-60 p-2 flex gap-4 items-center">
                <FcPuzzle onClick={() => show('recharge')} className="hover:scale-150 duration-300 text-4xl" />
                <FcSettings onClick={() => show('survey')} className="hover:scale-150 duration-300 text-4xl" />
                <FcRating onClick={() => show('amber')} className="hover:scale-150 duration-300 text-4xl" />
                <FcSurvey onClick={() => show('sky')} className="hover:scale-150 duration-300 text-4xl" />
                <FcQuestions onClick={() => show('purple')} className="hover:scale-150 duration-300 text-4xl" />
            </div>
        </div>
    </div>
}

function Queue({ auth, setShowQueue }) {

    const [timer, setTimer] = useState(0)
    const [command, setCommand] = useState('')

    const leftQueue = () => {

        notification['success']({
            message: 'Got out of the queue',
            description:
              'You have exited the queue',
            className:"bg-lightgreen text-white",
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });

        socket.emit('left-queue', { command, username: auth.username })
        setShowQueue(false)
    }

    useEffect(() => {

        socket.on(`pre:find-team`, (data) => {
            setCommand(data.payload)
        })

        let t = setInterval(() => {
            setTimer(prev => prev += 1)
        }, 1000)
        return () => clearInterval(t)
    }, [])

    return <div className="fixed z-[999] bottom-4 right-4 border-2 border-solid border-lightgreen px-8 py-3 bg-black">
        <div className="flex items-center justify-between">
            <img src="/images/loading.svg" className="w-[40px]" alt="" />
            <div className="ml-6 w-full">
                <h2 className="text-white text-base">Đang tìm bạn học nhóm</h2>
                <p className="text-white text-sm">Thời gian : {timer} / 200s</p>
                <small onClick={leftQueue} className="cursor-pointer w-full px-4 py-1 bg-red-600 font-normal text-white">Stop</small>
            </div>
        </div>
    </div>
}