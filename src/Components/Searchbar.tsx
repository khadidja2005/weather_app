import React from 'react'
import { IoSearch } from "react-icons/io5";
type Props = {
    className?: string;
    value: string;
    onchange: React.ChangeEventHandler<HTMLInputElement>;
    onsubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Searchbar(props: Props) {
    return (
        <form className=' flex relative justify-center items-center h-10 mr-6'
        onSubmit={props.onsubmit}>
            <input type="text" className=' border rounded-l-md border-gray-400  focus:border-blue-500
             px-4 py-2 focus:outline-none h-full  w-[230px]'
                placeholder='Search Location ..' 
                value={props.value}
                onChange={props.onchange}
                />
            <button className=' bg-blue-500 text-white rounded-r-md h-full p-4 hover:bg-blue-600 flex justify-center items-center'>
                <IoSearch className=' text-xl' />
            </button>
        </form>
    )
}