"use client"
import { useState } from "react"

export function DropDownMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)} 
      className={open?"px-2 py-2 rounded bg-white text-black":"px-2 py-2 rounded bg-transparent text-white"}>
        Menu
      </button>

      {open && (
        <div className="absolute flex flex-col text-sm items-end right-0 mt-2 w-30 bg-black border border-gray-600 rounded shadow">
          <button 
            className="w-full text-right block text-white py-2 px-2 hover:bg-gray-100 transition">
            Profile
          </button>
        </div>
      )}

    </div>
  )
}