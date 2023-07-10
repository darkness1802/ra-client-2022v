import React, { useState } from "react"
import "./styles.css"
import { SiCircleci, SiHomebridge, SiBeatsbydre } from "react-icons/si"
import Transaction from "./Transaction.tsx"

export default function RightSide(){
    return <div className="rightside backdrop-blur w-[80%] h-full">
        <nav className="top flex items-center justify-between px-3 py-2 h-[5vh] bg-lightdark bg-opacity-80">
            <h1 className="flex gap-2 text-gray-200 font-medium uppercase"><SiHomebridge className="text-white text-lg"/>General</h1>
        </nav>
        <div className=" bg-lightdark bg-opacity-60 h-[80vh] overflow-y-scroll scrollbar-thin p-8">
            <div className="flex px-8 py-8 items-center gap-12 rounded-l-xl bg-gradient-to-r from-indigo-500">
                <img src="/images/user.png" className="w-[99px] h-[99px] border-solid border-[4px] rounded-full border-red-500" alt="" />
                <div className="txt-group">
                    <h1 className="text-white text-lg">Người dùng: {`{ @user.username }`}</h1>
                    <h4 className="text-gray-300 text-lg font-normal">Địa chỉ ví: {`{ @user.walletaddress }`}</h4>
                    <div className="flex items-center gap-2">
                        <img src="https://img.icons8.com/flat-round/64/000000/crown--v1.png" className="w-7 h-7" alt="" />
                        <h4 className="text-gray-300 text-lg font-normal">{`{ @user.royaltoken }`}</h4>
                    </div>
                </div>
            </div>

            <h2 className="mt-4 mb-2 text-xl font-normal text-gray-400">Lịch sử giao dịch</h2>
            <div className="transaction bg-gray-500 bg-opacity-40 rounded-t-xl">
                <Transaction transaction="Nạp tiền" amount={200}/>
                <Transaction transaction="Chuyển tiền" amount={-200}/>
                <Transaction transaction="Nhận tiền" amount={200}/>
                <Transaction transaction="Đăng ký học" amount={-200}/>
                <Transaction transaction="Đăng ký học" amount={-200}/>
                <Transaction transaction="Đăng ký học" amount={-200}/>
            </div>
    </div>
    </div>
}

