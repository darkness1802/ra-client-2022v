import { useState, useMemo } from "react"

/**
 * @author [TungHwang] @link https://facebook.com/tlt69
 * @description useGlobalState hook base on ReactJS core
 */
const LIMIT = Number.MAX_SAFE_INTEGER // 2^53 – 1
class EventEmitter extends EventTarget {
    emit(key) {
        this.dispatchEvent(new Event(key))
    }
}


export function createStates(initialValue = {}) {
    const instance = new EventEmitter()
    return (key) => {
        const [, $count] = useState(0)
        useMemo(() => {
            instance.addEventListener(key, () => {
                $count(c => (c + 1) % LIMIT)
            })
        }, [key])
        return [
            initialValue[key], 
            callback => {
                initialValue[key] = callback(initialValue[key])
                instance.emit(key)
            }
        ]
    }
}