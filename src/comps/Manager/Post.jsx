import React, { useState } from "react"
import { AiFillLike, AiOutlineComment } from "react-icons/ai"
import { useRecoilValue } from "recoil"
import { auth } from "../../root"
/** @type {  } descript: {  } */
export default function Posts({title, children}){

    const __auth__ = useRecoilValue(auth)

    return <div className="mb-4 pt-4 bg-heavydark bg-opacity-50">
        <div className="top px-6 flex items-center">
            <img src="/images/user.png" className="rounded-full border-solid border-lightgreen border-[4px] w-[40px] h-[40px]" alt="" />
            <div className="ml-4">
                <p className="text-gray-200 text-lg">Tung Hwang</p>
                {title}
            </div>
        </div>
        { children }

    </div>
}