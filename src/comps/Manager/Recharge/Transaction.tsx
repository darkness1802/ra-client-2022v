import React, { useState } from "react"
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs"

interface Props {
    transaction: string
    time: string
    amount: number
}
export default function Transaction({ transaction, time, amount }:Props) {

    return <div className="border-b-[0.07px] border-b-solid border-b-gray-400 flex items-center justify-between p-4">
        <div className="w-[50%] flex items-center gap-3 text-white">
            {amount > 0 ? <BsArrowRightCircle className="text-xl" />:<BsArrowLeftCircle className="text-xl"/>}
            <p className="text-base">{transaction}</p>
        </div>
        <p className="w-[25%] text-base text-gray-200">20/07/2022</p>
        <p className="w-[25%] text-base text-gray-200">{Math.abs(amount)} RTK</p>
    </div>
}