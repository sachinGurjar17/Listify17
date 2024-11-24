import { useState, useEffect } from "react";
import { authState } from "../store/authState";
import { useRecoilValue } from "recoil";
import TodoItem from "./TodoItem";

export const Days = () => {
    const [todos, setTodos] = useState([]);

    const authStateValue = useRecoilValue(authState);

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch(`${backendUrl}/todo/todos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authStateValue.token]);

    const todayDate = getTodayDate();
    const tomorrowDate = getTomorrowDate();

    const todayTodos = todos.filter(todo => todo.date === todayDate);
    const tomorrowTodos = todos.filter(todo => todo.date === tomorrowDate);
    const upcomingTodos = todos.filter(todo => todo.date > tomorrowDate);  

    return (
        <>
            <div className="flex flex-col gap-2 ">
                <div className="w-full border rounded-lg px-3 py-4 ">
                    <h2>Today</h2>
                    {todayTodos.length != 0 ? todayTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    )) : <div className="text-center">Nothing for today</div>}
                </div>

                <div className="flex flex-row gap-2">
                    <div className="w-full border rounded-lg px-3 py-4 ">
                    <h2>Tomorrow</h2>
                        {tomorrowDate.length != 0 ? tomorrowTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        )) : <div className="text-center text-black">Nothing for tommorrow</div>}
                    </div>

                    <div className="w-full border rounded-lg px-3 py-4 ">
                        <h2>Upcoming</h2>
                        {upcomingTodos.length != 0 ? upcomingTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        )) : <div className="text-center ">Nothing for this week</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];  
}

function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; 
}
