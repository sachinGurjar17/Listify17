import { Layout } from "./Layout"
import { useEffect, useState } from "react"
import { authState } from "../store/authState"
import { useRecoilValue } from "recoil"
import { NavLink } from "react-router-dom"
export const Calender = ()=>{

    const [todos , setTodos] = useState([]);
    const [showDays , setShowDays] = useState(true)
    const [showMonth , setShowMonths] = useState(false)
    const [showWeeks , setShowWeeks] = useState(false)

    const authStateValue = useRecoilValue(authState);

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    
    useEffect(()=>{
        const getTodos = async ()=>{
            const response = await fetch(`${backendUrl}/todo/todos`,{
                headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
            })
            const data = await response.json();
            setTodos(data);
        }
        getTodos();
    } , [authStateValue.token])
    return (
        <Layout>
            <div className="flex flex-col gap-8">
              <div className="text-2xl sm:text-3xl pb-1 font-semibold flex  items-center">
                  <NavLink 
                      to={'/menu'}
                      className="block sm:hidden pr-5">
                      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="M286.67-613.33V-680H840v66.67H286.67Zm0 166.66v-66.66H840v66.66H286.67Zm0 166.67v-66.67H840V-280H286.67ZM153.33-613.33q-13.66 0-23.5-9.84Q120-633 120-647q0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.59 9.5 23.75 0 13.67-9.59 23.5-9.58 9.84-23.75 9.84Zm0 166.66q-13.66 0-23.5-9.83-9.83-9.83-9.83-23.83 0-14 9.83-23.5 9.84-9.5 23.84-9.5t23.5 9.58q9.5 9.58 9.5 23.75 0 13.67-9.59 23.5-9.58 9.83-23.75 9.83Zm0 166.67q-13.66 0-23.5-9.83-9.83-9.84-9.83-23.84t9.83-23.5q9.84-9.5 23.84-9.5t23.5 9.59q9.5 9.58 9.5 23.75 0 13.66-9.59 23.5-9.58 9.83-23.75 9.83Z"/></svg> 
                  </NavLink>
                  <h1 className="text-3xl sm:text-5xl"> 📆</h1>
              </div>
              <nav >
                  <div className="border rounded-xl w-fit p-1 text-sm bg-gray-100">
                      <ul className="flex flex-row gap-2">
                          <button
                              onClick={()=>{setShowDays(true) ,setShowMonths(false) , setShowWeeks(false)}}
                              className="border px-2 py-1 rounded-xl bg-white">Day</button>
                          <button 
                              onClick={()=>{setShowDays(false) , setShowMonths(false) ,  setShowWeeks(true)}}
                              className="border px-2 py-1 rounded-xl bg-white ">Week</button>
                          <button 
                              onClick={()=>{setShowDays(false) , setShowMonths(true) ,  setShowWeeks(false)}}
                              className="border px-2 py-1 rounded-xl bg-white">month</button>
                      </ul>
                  </div>
                </nav>
                {showDays ? <DayCalendar todos={todos}/> : <></>}
                {showMonth ? <MonthCalendar todos={todos}/> : <></>}
                {showWeeks? <WeekCalendar todos={todos}/> : <></>}
            </div>
        </Layout>
    )
}

function DayCalendar({ todos }) {
    const timeSlots = [
      "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
      "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
      "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
    ];
  
    return (
      <div>
        <h1 className="text-4xl font-bold mb-6">{new Date().toDateString(0)}</h1>
        <ul>
          {timeSlots.map((timeInst) => {

            const todosForTime = todos.filter((todo) => todo?.time?.substring(0, 2) === timeInst.substring(0, 2) && todo.date === new Date().toISOString().split('T')[0]);
            const priorityClass = {
                high: "bg-red-200",
                medium: "bg-yellow-200",
                low: "bg-green-200"
            }
  
            return (
              <div key={timeInst} className="flex items-start gap-10 mb-4 ">
                <li className="text-gray-600 w-24 border-t ">
                  <span className="ml-14">{timeInst}</span>
                </li>
  
                <div className="ml-6 flex-grow h-20 ">
                  {
                  todosForTime.length > 0 ? (
                    todosForTime.map((todo, index) => (
                      <div key={index} className={`${priorityClass [todo.priority]} text-gray-600 border rounded-lg text-sm p-2 h-full`}>
                        {todo.todo} : {todo.description}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">No tasks</div>
                  )}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

function WeekCalendar({todos}){

    const priorityClass = {
        high: "bg-red-200",
        medium: "bg-yellow-200",
        low: "bg-green-200"
    }

    const today = new Date();
    const dayOfWeek = today.getDay(); 

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
  
    const daysArray = [];
  

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      daysArray.push({
        date: currentDay.getDate(),
        fullDate: currentDay.toISOString().split('T')[0], 
        dayName: currentDay.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }

    const getTodosForDay = (date) => {
        return todos.filter((todo) => todo?.date === date); 
    };

    return(
        <>
            <h1 className="text-4xl font-bold"> Week of {daysArray[0].fullDate} to {daysArray[6].fullDate}</h1>
            <ul>
                {daysArray.map((day, index) => {
                const todosForDay = getTodosForDay(day.fullDate);
                return (
                    <div key={index} className="border-b p-2 h-32">
                    <div className="font-bold text-gray-600">{day.dayName}</div>
                    <div className="text-gray-400">{day.date}</div>
                    <div>
                        {todosForDay.length > 0 ? (
                        todosForDay.map((todo, index) => (
                            <div key={index} className={`${priorityClass[todo.priority]} text-sm mt-1 p-1 rounded`}>
                            {todo.todo} : {todo.description}
                            </div>
                        ))
                        ) : (
                        <div className="text-gray-400 text-xs">No tasks</div>
                        )}
                    </div>
                    </div>
                );
                })}
        </ul>
        </>
    )
}

function MonthCalendar({ todos }) {
    const today = new Date();
    const currentMonth = today.getMonth();  
    const currentYear = today.getFullYear(); 
  
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(""); 
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
  
 
    const getTodosForDay = (day) => {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      return todos.filter((todo) => todo?.date === dateStr);
    };

    const priorityClass = {
        high: "bg-red-200",
        medium: "bg-yellow-200",
        low: "bg-green-200"
    }
  
    return (
      <div>
        <h1 className="text-4xl font-bold mb-6">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h1>
        <div className="grid grid-cols-7 gap-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold">{day}</div>
          ))}
          {daysArray.map((day, index) => {
            const todosForDay = getTodosForDay(day);
            return (
              <div key={index} className="  p-2 h-32">
                <div className="text-gray-600">{day ? day : ""}</div>
                <div>
                  {day && todosForDay.length > 0 ? (
                    todosForDay.map((todo, index) => (
                      <div key={index} className={`${priorityClass[todo.priority]} text-[8px] mt-1 p-1 rounded`}>
                        {todo.todo}
                      </div>
                    ))
                  ) : day ? (
                    <div className="text-gray-400 text-xs">No tasks</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  