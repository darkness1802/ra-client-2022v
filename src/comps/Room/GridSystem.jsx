import React, { useState, useRef, useLayoutEffect, useMemo } from "react"

const DIVISION_MAP = {
    1:1, 2:2, 3:3, 4:2, 5:3, 6:3, 7:4, 8:4, 9:3, 10:4, 11:4, 12:4,
}
/** @type { comp } descript: { none } */
export default function GridSystem(){

    const [itemWidth, setItemWidth] = useState(0)
    const count = 4
    const iRef = useRef()

    const division = useMemo(() => {
        return Math.ceil(Math.sqrt(count))
    }, [count])

    useLayoutEffect(() => {
        const gridWidth = iRef.current.clientWidth
        
        setItemWidth(gridWidth / division)
    }, [division])

    return <div ref={iRef} className="flex flex-wrap w-full h-full">
        <GridSystem.Item style={{ width: itemWidth }} />
        <GridSystem.Item style={{ width: itemWidth }} />
        <GridSystem.Item style={{ width: itemWidth }} />
        <GridSystem.Item style={{ width: itemWidth }} />
    </div>
}

GridSystem.Item = function Item({ ...props }){
    return <div {...props} className="bg-lightgreen border-solid border-black border-4">
        
    </div>
}