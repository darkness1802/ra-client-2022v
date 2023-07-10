import React from "react"
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs"
import Modal from "../comps/Modal.tsx"
import Information from "../comps/Manager/Information.tsx"

export default function About() {
    return <div style={{ backgroundImage: "url(https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg)" }} className="bg-lightdark bg-cover w-screen h-screen">

        <Information />

        <div className="about/nav flex items-center w-screen justify-center fixed bottom-0 h-auto">

            <div className="flex gap-6 bg-gray-600 bg-opacity-40 px-4 py-2 rounded-tr-2xl rounded-tl-2xl">

                <div className="flex flex-col items-center justify-center">
                    <img src="/images/android.svg" className="w-[33px] h-[33px]" alt="" />
                </div>
                <div className="hover:scale-110 flex flex-col items-center justify-center">
                    <img src="/images/fuchsia.svg" className="w-[34px] h-[34px]" alt="" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img src="/images/window.svg" className="w-[35px] h-[35px]" alt="" />
                </div>

            </div>

        </div>
    </div>
}