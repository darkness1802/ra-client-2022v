import { atom } from 'recoil'

var savedAuth = JSON.parse(localStorage.getItem("auth"))
export var showSidebar = atom({
    key: 'showSidebar',
    default: true
})

export var auth = atom({
    key: 'auth',
    default: savedAuth || null // { username:'', access:'' }
}) 

export var showQueue = atom({
    key: 'showQueue',
    default: false
})

export var excriseManager = atom({
    key: 'excriseManager',
    default: false
})

export var assignmentManager = atom({
    key: 'assignmentManager',
    default: false
})

export var targetData = atom({
    key: 'targetData',
    default: null
})