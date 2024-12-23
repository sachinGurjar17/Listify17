import { light } from "@mui/material/styles/createPalette";
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { ToggleGroup , ToggleGroupItem } from "./ui/toggle-group";
import pfp from '../assets/pfp.jpg'
import { jwtDecode } from "jwt-decode";
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
                <div className="w-fit h-fit ">
                    <UserDetail/>
                </div>
                <div className="flex flex-col gap-2 border-b-2 pb-3">
                    <h3 className="text-[11px] font-bold">TASKS</h3>
                    <ToggleGroup type='multiple' className="pl-3 flex flex-col items-start gap-2">
                        <ToggleGroupItem>
                            <NavLink to={'/upcoming'}>🔜 Upcoming </NavLink>
                        </ToggleGroupItem>
                        <ToggleGroupItem>
                            <NavLink to={'/today'}> 📝 Today </NavLink>
                        </ToggleGroupItem>
                        <ToggleGroupItem>
                            <NavLink to={'/calender'}>🗓️ Calender </NavLink>
                        </ToggleGroupItem>
                        <ToggleGroupItem>
                            <NavLink to={'/stickywall'}>📰 Sticky Wall </NavLink>
                        </ToggleGroupItem> 
                    </ToggleGroup>         
                </div>
                <div className="border-b-2 pb-3">
                    <h1 className="font-bold text-[11px]">LISTS</h1>
                    <ToggleGroup type="multiple" className="pl-3 flex flex-col gap-2 items-start">
                        <ToggleGroupItem>🟥 Personal</ToggleGroupItem>
                        <ToggleGroupItem>🟦 Work</ToggleGroupItem>
                        <ToggleGroupItem>🟨 List</ToggleGroupItem>
                        <ToggleGroupItem 
                            className=""
                        ><span className="text-lg">+</span> Add new List</ToggleGroupItem>
                        <ColorBox/>
                    </ToggleGroup>

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

function UserDetail(){

    const getUserDetails = (token)=>{
        try{
            const decoded = jwtDecode(token);
            
            const {email} = decoded ;

            return email
        }catch(err){
            console.log("failed to decode", err);
        }
    }

    const email = getUserDetails(localStorage.getItem('token'));
    

    return(
        <>  
            <div className="flex flex-row justify-center items-center flex-wrap gap-2">
                <img src={pfp} alt="pfpImg" className="border rounded-full w-12 h-12" />
                <p className="text-sm font-semibold">{email}</p>
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
                    className="p-1 bg-gray-100 border-2 rounded-lg w-full"
                    type="text" />
                <div className="flex flex-row items-center  flex-wrap gap-1 ">{colorsBox.map((color, index) => (
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
    
    const colorsBox = ["Heealth", "family", "Office"];

    return(
        <>
            <ToggleGroup type='single' className="grid grid-cols-3 gap-2 ">
                {colorsBox.map((tag, index) => (
                    <ToggleGroupItem
                        key={index}
                        className="border-2 rounded-lg p-1 "
                    > {tag}</ToggleGroupItem>
                ))}
            </ToggleGroup>
        </>
    )
}

