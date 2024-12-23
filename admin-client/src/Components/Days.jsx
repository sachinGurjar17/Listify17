import { useState, useEffect } from "react";
import { authState } from "../store/authState";
import { useRecoilValue } from "recoil";
import TodoItem from "./TodoItem";
import Empty from "./Empty";
import { todoState } from "@/store/todos";

export const Days = () => {

    const authStateValue = useRecoilValue(authState);
    const todos = useRecoilValue(todoState);

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
                    )) : <Empty/>}
                </div>

                <div className="sm:flex sm:flex-row flex-col gap-3">
                    <div className="w-full border rounded-lg px-3 py-4 ">
                        <h2>Tomorrow</h2>
                        {tomorrowTodos.length != 0 ? tomorrowTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        )) : <div className="text-center text-gray-400 text-sm">Nothing for tommorrow</div>}
                    </div>

                    <div className="w-full border rounded-lg px-3 py-4 mt-3">
                        <h2>Upcoming</h2>
                        {upcomingTodos.length != 0 ? upcomingTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        )) : <div className="text-center text-gray-400 text-sm ">Nothing for this week</div>}
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
