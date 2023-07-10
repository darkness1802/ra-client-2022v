import React, { useState } from "react"
import { BsFillPlayFill, BsCardText } from "react-icons/bs"
import Navbar from "../comps/Navbar"
import { motion } from "framer-motion"
import { fadeInUp, fadeInDown, staggerContainer } from "../animations/variants"

export default function Landing() {
    return <div className="page home">
        <Navbar />
        <header className="home-header h-[100vh] w-full bg-darkgreen flex items-center justify-between">
            <motion.img src="/images/intro.svg" variants={fadeInUp} initial="initial" animate="animate" className="w-full h-full" alt="" />
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="texts pr-12">
                <motion.h1 variants={fadeInDown} initial="initial" animate="animate" className="text-5xl text-white font-bold">
                    Energy education in the classroom
                </motion.h1>
                <motion.p variants={fadeInDown} initial="initial" animate="animate" className="text-base text-white font-bold py-4">
                    Royal Academy is a completely free, wRTC based, 
                    online learning platform providing an unbiased, 
                    data-driven energy curriculum to teachers and students. 
                    Our curriculum is based on AP Environmental Science 
                    standards but also supports NGSS, and can be used in 
                    science classes at the middle school, high school, 
                    and postsecondary levels.
                </motion.p>
                <h2 className="text-2xl text-white font-semibold pb-4">Register Today!</h2>
                <div className="buttons flex gap-4">
                    <button className="bg-lightgreen text-lg font-semibold text-white rounded-2xl px-4 py-1">Students</button>
                    <button className="bg-lightgreen text-lg font-semibold text-white rounded-2xl px-4 py-1">Teachers</button>
                </div>
            </motion.div>
        </header>
    </div>
}
