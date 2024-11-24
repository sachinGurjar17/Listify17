import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Messi_Image from '../assets/picture1.png'

function SignUp(){
    const navigate = useNavigate();

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const handleSignup = async()=>{
        const response = await fetch('http://localhost:3000/user/signup',{
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body : JSON.stringify({username , password})
        });

        const data = await response.json();
        if(data.token) {
          localStorage.setItem("token",data.token);
          navigate('/today');
        }else{
          alert("error while signing up");
        }
    };

    return(
        <>
          <div className=''>
            <div className='h-screen w-screen p-2 sm:p-9 flex sm:flex-row flex-col gap-2'>
                <img className="h-2/5  rounded-xl w-full sm:h-full " src={Messi_Image} alt="img" />
                <div className=' border flex flex-col justify-center p-6 sm:p-52 gap-5 border-gray-200 rounded-xl '>
                  <h1 className='text-black text-4xl font-bold font-poppins'>Sign up</h1>
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
                  onClick={handleSignup}
                  >Sign up</button>

                  <div
                    className='border-b-2 border-gray-400 font-bold text-center '
                  >
                    or
                  </div>
                  <button 
                    className='font-semibold text-sm text-gray-800'
                    onClick={()=>{
                      navigate('/signin')
                    }}
                  >Already have an account ? Sign in </button>
                </div>
                
            </div>
          </div>
        </>
    )
}

export default SignUp ;