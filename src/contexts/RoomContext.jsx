import { createContext, useContext, useState } from "react";

const RoomContext = createContext(null)
const RoomActionsContext = createContext(null)

export function RoomContextProvider({ children }) {
    const [roomState] = useState({
        name: ''
    })
    return <RoomContext.Provider value={authState}>
        { children }
    </RoomContext.Provider>
}

export function useAuthState() {
    const roomState = useContext(RoomContext)
    if (!roomState) {
        throw new Error("useAuthState must be used within a RoomContextProvider")
    } return roomState
}