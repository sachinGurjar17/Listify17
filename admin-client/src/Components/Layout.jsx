import React, { useState } from "react";
import { Menu } from "./Menu";
import  TodoForm  from "./TodoForm"
import Add from '../assets/addGif1.gif'
import { NavLink } from "react-router-dom";

export const Layout = ({children})=>{
    const [addTask , setAddTask] = useState(true)
    return(
        <div className=" ">
            <div>
                <div className="hidden sm:flex sm:flex-row sm:mx-2  sm:my-5">
                    <div className={`w-fit md:w-1/4 md:inline-block`}>
                        <Menu/>
                    </div>
                    <div className="w-full m-4">
                        {children}
                    </div>
                    {!addTask ? <div className="mb-4 w-1/2 flex flex-col items-center gap-1">
                        <button
                            className="text-md font-thin border rounded-full px-1 w-fit bg-gray-200 "
                            onClick={()=>setAddTask(!addTask)}
                        >✖</button>
                        <TodoForm />
                    </div> : <></> }                        
                </div>  
                <div className=" sm:hidden flex flex-row mx-2 my-5">
                <div className="w-full m-4">
                    {children}
                </div>                       
            </div> 

            </div>
            {addTask ? <button
                onClick={()=>setAddTask(!addTask)} 
                className="flex flex-col fixed right-5 bottom-5 z-50 text-gray-600">
                <img src={Add} alt="Add Button" className="w-10 h-10 sm:w-16 sm:h-16 rounded-full cursor-pointer bg-transparent" />
                
            </button> : <></>} 

            <NavLink
                to={'/todoform'}
                onClick={()=>setAddTask(!addTask)} 
                className="sm:hidden flex flex-col fixed right-5 bottom-5 z-50 text-gray-600">
                <img src={Add} alt="Add NavLink" className="w-10 h-10 sm:w-16 sm:h-16 rounded-full cursor-pointer bg-transparent" />
                
            </NavLink>    
 
        </div>
    )
}