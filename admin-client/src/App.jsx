import SignUp from "./Components/SignUp"
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import Today from "./Components/Today";
import { authState } from "./store/authState";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { Upcoming } from "./Components/Upcoming";
import { Layout } from "./Components/Layout";
import { Calender } from "./Components/Calender";
import { StickyWall } from "./Components/StickyWall";
import { Menu } from "./Components/Menu";
import TodoForm from "./Components/TodoForm";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <RecoilRoot>
        <Toaster/>
      <Router>
        <InitState/>
          <Routes>
              <Route path="/" Component={Home} />
              <Route path="/signin" Component={SignIn} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/upcoming" Component={Upcoming}/>
              <Route path="/today" Component={Today}/>
              <Route path="/calender" Component={Calender}/>
              <Route path="/menu" Component={Menu}/>
              <Route path="/todoform" Component={TodoForm}/>
              <Route path="/stickywall" Component={StickyWall}/>
          </Routes>

      </Router>
       
     </RecoilRoot>
  )
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL ;

  const init = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await fetch(`${backendUrl}/user/me`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.username) {
              setAuth({ token: data.token, username: data.username });
              navigate("/today");
          } else {
              navigate("/");
          }
      } catch (e) {
          navigate("/");
      }
  }
  useEffect(() => {
      init();
  }, [])
  return <></>
}
export default App

