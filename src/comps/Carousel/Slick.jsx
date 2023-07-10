import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import Card from "../utils/Card.tsx"
import request from "../../request"
function NextArrow(props) {
    const { style, onClick } = props
    return (
        <div
            className="hidden"
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { style, onClick } = props
    return (
        <div
            className="hidden"
            style={{ ...style }}
            onClick={onClick}
        />
    );
}


export default function Slick({ count, api }) {

    const [courses, setCourses] = useState([])
    
    useEffect(() => {
        const getCourses = async () => {
            try {
                let { data } = await request.Get(api)
                setCourses(data)
            } catch (error) {
                console.log(error)
            }
        }; getCourses()
    }, [])

    return <div className="my-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        { courses?.map((_, i) => <Card key={i} data={_}/>) }
    </div>
}