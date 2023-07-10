import { createStates } from "./useGlobalState"

export let useGlobalState = createStates({
    // Ten cua moi state la key cua state
    // Khi su dung useGlobalState can truyen vao key
    user: {
        name: "Tung",
        age: 23
    },
    count: 0, // Example : const [count, setCount] = useGlobalState("count")
    showManager: false,
    isAuth: true
})