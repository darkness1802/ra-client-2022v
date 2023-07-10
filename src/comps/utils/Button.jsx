import React from "react"


export default function Button({ icon:Icon, children, ...params }) {
    return <button { ...params } className={`inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-red-400 group-hover:from-red-500 group-hover:to-red-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800`}>
    {Icon ? <Icon />:null}
    <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      {children}
    </span>
  </button>
}