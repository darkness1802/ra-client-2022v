import React from 'react'
import styles from './Slider.module.css'
import {FaAddressCard} from 'react-icons/fa'

interface SliderProps {
    
}

function Slider({}:SliderProps) {
    return <div className={styles.main}>
        <div className={styles.card}>
            <FaAddressCard className={styles.icon}/>
            <h1>Title</h1>
            <p>Texts Content</p>
        </div>
    </div>
}

export default Slider