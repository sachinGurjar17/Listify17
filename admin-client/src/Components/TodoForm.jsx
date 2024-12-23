import { useState } from "react"
import { useTodo } from "../Contexts";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { todoState } from "@/store/todos";

function TodoForm(){

    function getTodayDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];  
    }

    const [todo , setTodo] = useState("");
    const [description , setDescription] = useState("");
    const [date , setDate] = useState(getTodayDate());
    const [time , setTime] = useState("");
    const [priority , setPriority] = useState("low");
    const [tags , setTags] = useState([]);
    const [inputTagValue , setInputTagValue] = useState("");

    const [todos , setTodos] = useRecoilState(todoState)

    
    const backendUrl = import.meta.env.VITE_BACKEND_URL ;


    const add = async (e) => {
        e.preventDefault();

        const newTodo = {
            id:Date.now(),
            todo:todo,
            description:description,
            date:date,
            time:time,
            priority : priority ,
            tags :tags,
            completed : false 
        }

        const response = await fetch(`${backendUrl}/todo/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({
                id:Date.now(),
                todo:todo,
                description:description,
                date:date,
                time:time,
                priority : priority ,
                tags :tags,
                completed : false 
            })
        });

        if(response.ok){
            console.log("Task Added");
            setTodos((prev)=>[newTodo , ...prev]);
            toast.success('Task Added')
        }else{
            console.log("error in adding the todo");
            toast.error('Try again')
        }
      
        setTodo("");
        setDescription("")
    };

    const handleAddClick = ()=>{
        if(!tags.includes(inputTagValue)){
            setTags([...tags,inputTagValue.trim()])
            setInputTagValue('');
        }
    }


    return(
        <>
            <div>
                <div className="bg-gray-50 m-2 p-4 border rounded-3xl flex flex-col gap-4 font-[500] text-[14px] text-gray-600">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xl font-semibold text-gray-700">Task:</h1>
                        <NavLink 
                            to='/today' 
                            className="sm:hidden block text-xl font-semibold text-gray-500">✖</NavLink>
                    </div>
                    <form onSubmit={add}  className="flex flex-col gap-4 p-2 text-gray-600">
                    <input
                        type="text"
                        required
                        placeholder="Title of work"
                        className="w-full border-2 rounded-lg px-3 outline-none duration-150 bg-white/20 py-2"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    
                    <textarea
                        className="w-full h-24 px-2 py-1.5 bg-gray-100 border-2 rounded-lg "
                        placeholder="Description"
                        value = {description}
                        onChange={(e)=> setDescription(e.target.value)}
                    ></textarea>

                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 justify-between">
                            <h1>Priority</h1>
                            <select 
                                required
                                value={priority}
                                onChange={(e)=>setPriority(e.target.value)}
                                name="priority" id="priority" className="w-fit p-1 bg-gray-100 border rounded-lg">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 justify-between">
                            <h1>Due Date</h1>
                            <input
                                required
                                value={date}
                                onChange={(e)=>setDate(e.target.value)}
                                className="w-fit bg-gray-100 border rouned-lg rounded-lg p-1"
                                type="date" />
                        </div>
                        <div className="grid grid-cols-2 justify-between">
                            <h1>Time</h1>
                            <input
                                value={time}
                                onChange={(e)=>setTime(e.target.value)}
                                className="w-fit bg-gray-100 border rouned-lg rounded-lg p-1"
                                type="time" />
                        </div>
                        <div className="grid grid-cols-2 justify-between">
                            <h1>Tags </h1>
                            <div className="flex flex-col gap-1 ">
                                <ul className="flex flex-row flex-wrap">
                                    {
                                        tags.map((tag)=>(
                                            <li className="w-fit border rounded-lg p-1 m-1 bg-cyan-50">{tag}</li>
                                        ))
                                    }
                                </ul>
                                <div className="grid grid-cols-2 gap-1">
                                    <input 
                                        type="text"
                                        placeholder="enter a tag"
                                        className=" p-1 h-8 rounded-lg bg-gray-100 w-full"
                                        value={inputTagValue} 
                                        onChange={(e)=>setInputTagValue(e.target.value)}   
                                    />
                                        
                                    <button
                                    type="button"
                                    className="w-full bg-gray-200 border rounded-lg"
                                        onClick={handleAddClick}
                                    >Add</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 my-4">Subtasks:</h1>
                            <input
                                type="text"
                                placeholder=" + Add subtask"
                                className="w-full border-b-2 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                            />
                        </div>
                    </div>
                    <Button type="submit">
                        Add  
                    </Button>
                    </form>
                </div>
            </div>         
       
        </>
    )
}


export default TodoForm