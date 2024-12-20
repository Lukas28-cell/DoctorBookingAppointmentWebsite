import React, { useState } from 'react'
import {assets} from '../assets/assets_frontend/assets'
const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Luke Inaede',
    image: assets.profile_pic,
    email: 'lukakoinaded@gmail.com',
    phone: '+2349025840337',
    address:{
      line1:'42 Auchi, sibo',
      line2: 'circle, Ring Road, Nigerian'
    },
    gender:"male",
    dob: '2001-01-20'
  })

  const[isEdit, setIsEdit] = useState(false)
  return (
    <div className='max-w-xl flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="" />

      {
        isEdit? <input className='bg-gray-50 text-3xl 
        font-medium max-w-60 mt-4' type="text" value={userData.name} 
        onChange={(e =>setUserData(prev => ({...prev,nane: e.target.value})))} />
         :<p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px]  boreder-none' />
      <div>
        <p className='text-neutral-600 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500 cursor-pointer'>{userData.email}</p>
          <p className='font-medium'> phone:</p>
          {
        isEdit? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} 
        onChange={(e =>setUserData(prev => ({...prev,phone:e.target.value})))} /> 
        :<p className='text-blue-400'>{userData.phone}</p>
      }
      <p className='font-medium'>address:</p>
      {
        isEdit? <p>
          <input className='bg-gray-50' onChange={(e)=>setUserData(prev => ({...prev, address: 
            {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
        <br />
        <input className='bg-gray-50' onChange={(e)=>setUserData(prev => ({...prev, address: 
        {...prev.address, line2: e.target.value}}))} value={userData.address.line2}  type="text" /></p> 
        : <p className='text-gray-500'>
          {userData.address.line1}
          <br />
          {userData.address.line2}

        </p>
      }
        </div>
      </div>

      <div>
        <p className='text-neutral-600 underline mt-3'>BASIC INFORMATION</p>
        <div  className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
          <p className='font-medium'>Gender</p>
          {
        isEdit? <select className='max-w-20 bg-gray-100' 
        onChange={(e) =>setUserData(prev => ({...prev, gender: e.target.value}))}
         value={userData.gender}>
          <option value="male">male</option>
          <option value="Female">Female</option>
        </select> :<p className='text-gray-400'>{userData.gender}</p>
      }   
      <p className='font-medium'>Birthday:</p>
      {
        isEdit
        ? <input className='max-w-20 bg-gray-100' type='date' 
        onChange={(e) =>setUserData(prev => ({...prev, dod: e.target.value}))} 
        value={userData.dob} />
         : <p className='text-gray-400'>{userData.dob}</p>
      }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
           ? <button className='border border-primary px-8 py-2 rounded-full
            hover:bg-primary hover:text-white transition-all outline-none' 
            onClick={()=>setIsEdit(false)}>Save information</button>
           : <button className='border border-primary px-8 py-2 rounded-full
            hover:bg-primary hover:text-white transition-all outline-none' 
            onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
