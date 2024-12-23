import todoImg from '../assets/todoimg.jpg'
function Empty(){
    return (
        <>
            <div class="w-full h-fit  mx-auto mt-10 p-6 rounded-xl shadow-lg ">
                <div class="flex flex-col items-center">
                    <div class="w-40 h-40 sm:w-60 sm:h-60 ">
                        <img src={todoImg} alt="" className='rounded-xl border' />
                    </div>
                    
                    <h2 class="mt-2 text-gray-600 text-xl font-semibold">No Tasks for Today!</h2>
                    <p class="text-gray-600 text-center mt-2">
                    Enjoy your day or add a new task to get started. ↘️.
                    </p>
                </div>
            </div>

        
        </>
    )
}

export default Empty