import { light } from "@mui/material/styles/createPalette";
import { useState } from "react"
import { NavLink } from "react-router-dom"

export function Menu(){
    return (
        <>
            <div className="bg-gray-50 shadow-lg p-5 border rounded-3xl m-2  flex flex-col gap-8 font-semibold text-md text-gray-600">
                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-bold text-gray-700 ">Menu</h1>
                    <div className=" hidden sm:block text-2xl font-semibold text-gray-500">☰</div>
                    <NavLink 
                        to='/today' 
                        className="sm:hidden block text-xl font-semibold text-gray-500">✖</NavLink>
                </div>
                <div>
                    <input
                        className="p-2 bg-slate-100 border rounded-lg shadow-sm border-gray-300 text-sm w-full "
                        placeholder="🔎 Search"
                        type="text"
                    />
                </div>
                <div className="flex flex-col gap-2 border-b-2 pb-3">
                    <h3 className="text-[11px] font-bold">TASKS</h3>
                    <div className="pl-3 flex flex-col gap-2">
                        <div>
                            <NavLink to={'/upcoming'}>🔜 Upcoming </NavLink>
                        </div>
                        <div>
                            <NavLink to={'/today'}> 📝 Today </NavLink>
                            <div></div>
                        </div>
                        <div>
                            <NavLink to={'/calender'}>🗓️ Calender </NavLink>
                        </div>
                        <div>
                            <NavLink to={'/stickywall'}>📰 Sticky Wall </NavLink>
                        </div> 
                    </div>

                    
                </div>
                <div className="border-b-2 pb-3">
                    <h1 className="font-bold text-[11px]">LISTS</h1>
                    <div  className="pl-3 flex flex-col gap-2">
                        <div>🟥 Personal</div>
                        <div>🟦 Work</div>
                        <div>🟨 List</div>
                        <div 
                            className=""
                        ><span className="text-lg">+</span> Add new List</div>

                        <ColorBox/>
                    </div>

                </div>

                <div className="border-b-2 pb-3">
                    <h1 className="font-bold text-[11px]">TAGS  </h1>
                    <TagBox/>

                </div>
                <div className="flex flex-col align-bottom gap-2 ">
                    <NavLink>⚙️ Settings</NavLink>
                    <NavLink
                        onClick={
                            ()=>{
                                localStorage.removeItem("token");
                                navigate('/signin')
                            }
                        } 
                        className="align-bottom my-auto text-gray-600 pb-4 rounded  text flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>Log out</NavLink>
                </div>
            </div>
        </>
    )
} 

function ColorBox (){
    
    const colorsBox = ["red", "orange", "lime", "pink" , "cyan","blue", "brown"];

    return(
        <>
            <div className="flex flex-col gap-2 border-2  rounded-lg  p-3 ">
                <input
                    className="p-1 bg-gray-100 border-2 rounded-lg"
                    type="text" />
                <div className="grid grid-cols-7 gap-1">{colorsBox.map((color, index) => (
                    <div
                        key={index}
                        style={{backgroundColor:color , opacity : 0.7}}
                        className="w-4 h-4 rounded font-light"
                    >   </div>
                   ))}
                </div>
            </div>
        </>
    )
}
function TagBox (){

    //const [tags, setTags] = useState("");
    
    const colorsBox = ["red", "orange", "lime", "pink" , "cyan","blue", "brown"];

    return(
        <>
            <div className="grid grid-cols-3 gap-2 ">
                {colorsBox.map((color, index) => (
                    <div
                        key={index}
                        className="border-2 rounded-lg p-1 "
                    > Tag {index+1}</div>
                ))}
            </div>
        </>
    )
}

