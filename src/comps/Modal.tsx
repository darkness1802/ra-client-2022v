import React from "react"
import { motion, Variants } from "framer-motion"

const backdrop:Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

interface iProps {
    children: React.ReactNode
    styles?: string
    setShowModal?: (value:boolean) => void
}

export default function Modal({ children, styles, setShowModal }: iProps) {
    return <motion.div variants={backdrop} initial="hidden" animate="visible" exit="hidden" className={`fixed z-[300] top-0 left-0 w-screen h-screen ${styles}`}>
        { children }
    </motion.div >
}