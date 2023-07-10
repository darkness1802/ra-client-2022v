import React from 'react'
import { useGlobalState } from './states'

function Test({ children }) {

    const [user, setUser] = useGlobalState("user")
    const [count, setCount] = useGlobalState("count")

  return (
    <div>
      <div>Hello {user.name}</div>
      <p>{count}</p>
      <button onClick={
        () => setUser(state => {
          return {
            ...state,
            name: "John"
          }
        })
      }>Change To Hwang</button>

      <button className="bg-red-500 px-3" onClick={() => setCount(state => state + 1)}>Increase</button>
    </div>

  )
}

export default Test