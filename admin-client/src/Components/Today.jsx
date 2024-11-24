import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { TodoProvider } from "../Contexts";
import { useState , useEffect, useLayoutEffect} from "react";
import { authState} from "../store/authState";
import { useRecoilValue } from "recoil";
import { useTodo } from "../Contexts";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import { Layout } from "./Layout";

function Today(){ 

    const [todos , setTodos] = useState([]);
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();
    

    const addTodo = (todo)=>{
        setTodos((prev)=>[{id:Date.now() , ...todo} ,...prev]);
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    
    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`${backendUrl}/todo/todos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authStateValue.token ]);

    const todayDate = getTodayDate();

    const todosForToday = todos.filter((todo)=>todo.date === todayDate);
    
     

    return (

        <TodoProvider value={{todos}}>
            <Layout>
                <div className="flex flex-col gap-10">
                    <div className="text-2xl sm:text-5xl font-semibold flex  items-center">
                        <NavLink 
                            to={'/menu'}
                            className="block sm:hidden pr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="M286.67-613.33V-680H840v66.67H286.67Zm0 166.66v-66.66H840v66.66H286.67Zm0 166.67v-66.67H840V-280H286.67ZM153.33-613.33q-13.66 0-23.5-9.84Q120-633 120-647q0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.59 9.5 23.75 0 13.67-9.59 23.5-9.58 9.84-23.75 9.84Zm0 166.66q-13.66 0-23.5-9.83-9.83-9.83-9.83-23.83 0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.58 9.5 23.75 0 13.67-9.59 23.5-9.58 9.83-23.75 9.83Zm0 166.67q-13.66 0-23.5-9.83-9.83-9.84-9.83-23.84t9.83-23.5q9.84-9.5 23.84-9.5t23.5 9.59q9.5 9.58 9.5 23.75 0 13.66-9.59 23.5-9.58 9.83-23.75 9.83Z"/></svg> 
                        </NavLink>
                        <h1 className="" >Today</h1>
                        <h1 className="py-1 px-4 border rounded-lg w-fit font-normal sm:text-4xl ml-12">{todosForToday.length}</h1>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-y-3">       
                            {todosForToday.map((todo) => (
                                <div key={todo.id}
                                className='w-full'
                                >
                                <TodoItem todo={todo} />
                                </div>
                            ))}
                        </div>
                    </div> 
                </div> 
            </Layout>       
        </TodoProvider>
   
    )
}

function getTodayDate(){
    const date = new Date();
    return date.toISOString().split('T')[0];
}

export default Today ;