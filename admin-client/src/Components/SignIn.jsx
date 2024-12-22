import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Picture2 from '../assets/picture3.png'
function SignIn(){

    const navigate = useNavigate();

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL ;

    const handleSignIn = async ()=>{
        const response = await fetch(`${backendUrl}/user/signin`,{
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({username , password})
        })

        const data = await response.json();

        if(data.token){
            localStorage.setItem("token" ,data.token);
            navigate('/upcoming');
        }else{
            alert('username does not found');
        }
    }
   return(
    <>
        <div className=''>
            <div className='h-screen w-screen p-2 sm:p-9 flex sm:flex-row justify-evenly flex-col gap-2'>
                <img className="rounded-xl w-full h-2/5 sm:h-full " src={Picture2} alt="img" />
                <div className='border flex flex-col justify-center p-6 sm:p-52 gap-5 border-gray-200 rounded-xl '>
                  <h1 className='text-black text-4xl font-bold font-poppins'>Sign in</h1>
                  <input 
                    placeholder='email@email.com'
                    type='email'
                    className='p-2 border rounded border-gray-300 text-md font-semibold'
                    value={username} onChange={(e)=>setUsername(e.target.value)}/>
                  <input
                    placeholder='*****************'
                    type='password'
                    className='p-2 border rounded border-gray-400 text-md font-semibold'
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
                  <button
                  className='bg-yellow-400 text-black  sm:px-40 px-20  border rounded-lg p-3  font-semibold inline-block whitespace-nowrap'
                  onClick={handleSignIn}
                  >Sign in</button>

                  <div
                    className='border-b-2 border-gray-400 font-bold text-center '
                  >
                    or
                  </div>
                  <button 
                    className='font-semibold text-sm text-gray-800'
                    onClick={()=>{
                      navigate('/signup')
                    }}
                  >Doesn't have any account ? Sign up </button>
                </div>
            </div>
        </div>
    </>
   )
}
export default SignIn ;