import React, { useState } from "react"
import LeftSide from "./Recharge.leftSide"
import RightSide from "./Recharge.rightSide"
import { motion } from "framer-motion"

export default function Recharge(){
    return <motion.div className="w-full h-full flex" drag>
        <LeftSide />
        <RightSide />
    </motion.div>
}