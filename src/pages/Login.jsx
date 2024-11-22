import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('sign up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onsubmitHandle = async (event)=>{
    event.preventDefault()
  }
  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className=' flex flex-col gap-3 m-auto p-8
       items-start min-w-[340px] sm:min-w-96 border
        rounded-xl text-zinc-600 text-sm shadow-lg'> 
        <p className='text-2xl font-semibold'>{state === 'sign up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'sign up' ? 'sign up' : 'Log in'} to book appointment</p>
        {
          state === 'sign up' &&    <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 w-full p-2 mt-1' type="text" 
          onChange={(e)=>setName(e.target.value)} value={name} />
        </div>
        }
     
        <div className='w-full'>
          <p>Emaill</p>
          <input className='border border-zinc-300 w-full p-2 mt-1' type="email" 
          onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 w-full p-2 mt-1' type="password" 
          onChange={(e)=>setPassword(e.target.value)} value={password} />
        </div>
        <button className='bg-gradient-to-r from-green-400 to-blue-500 text-white 
        py-2 rounded-md text-base w-full'>{state === 'sign up' ? 'Create Account' : 'Login'}
        </button>
        {
          state === 'sign up'? 
          <p>Already have an account <span onClick={()=>setState('login')} className='text-primary cursor-pointer underline'>Login here</span> </p>: 
          <p>Create a new account? <span onClick={()=>setState('sign up')}  className='text-primary cursor-pointer underline'>click here</span></p>
        
        }
      </div>
    </form>
  )
}

export default Login
