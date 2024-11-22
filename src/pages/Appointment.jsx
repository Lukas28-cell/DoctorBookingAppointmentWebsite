import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoc from '../component/RelatedDoc'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors, currencysymbol} = useContext(AppContext)
  const daysOfWeek = ['sun', 'MON', 'TUE', 'WED', 'THU', 'RFI', 'SAT' ]

const [docInfo, setDdocInfo] = useState(null)
const [doctorslot, setDoctorslot] = useState([]);
const [slotIndex, setSlotIndex] = useState(0);
const [slotTime, setSlotTime] = useState(0)

  const fetchdocinfo = async () =>{
    const docInfo = doctors.find(doc => doc._id === docId)
    setDdocInfo(docInfo)
    // console.log(docInfo);
    
  }

const getavilableSlot = async()=>{
   setDoctorslot([])

  //  geting current date 
  let today = new Date()

  for (let i = 0;  i< 7; i++) {
     let currentDate = new Date(today)
     currentDate.setDate(today.getDate()+i)

    //  setting end time of the date with index 
     let endTime = new Date()
     endTime.setDate(today.getDate()+i)
     endTime.setHours(21,0,0,0)     

    //  setting hours 
    if (today.getDate() === currentDate.getDate()) {
       currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+ 1 : 10)
       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    }else{
      currentDate.setHours(10)
      currentDate.setMinutes(0)    
    }

     let timeSlot = []

    while(currentDate < endTime){
      let formatTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

      // add slot to arry 
      timeSlot.push({
        datetime: new Date(currentDate),
        time: formatTime
      })

      // increment current time by 30 minute 
      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }
    setDoctorslot(prev => ([...prev, timeSlot]))
  }
}


  useEffect(()=>{
    fetchdocinfo()
  },[doctors,docId])

  useEffect(()=>{
 getavilableSlot()
  },[docInfo])

  useEffect(()=>{
    console.log(doctorslot);
    
  }, [doctorslot])
  return docInfo && (
    <div>
      {/* doctors details  */}
      <div className=' flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-gradient-to-r from-green-500 
    to-blue-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
      
       <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        {/* doc info  */}
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-950'>{docInfo.name} 
          <img src={assets.verified_icon} alt="" className='w-5' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree}- {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          {/* doc about  */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3 text-gray-70'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment fee: <span className='text-gray-600'>{currencysymbol}{docInfo.fees}</span>
            </p>
       </div>

      </div>
      {/* BOOKING TIME  */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            doctorslot.length && doctorslot.map((items, i)=>(
              <div onClick={()=>setSlotIndex(i)} className={`text-center py-6 min-w-16 rounded-full 
                cursor-pointer ${slotIndex === i ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' 
                : 'border border-gray-200' }`} key={i}>
                <p>{items[0] && daysOfWeek[items[0].datetime.getDay()]}</p>
                <p>{items[0] && items[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            doctorslot.length && doctorslot[slotIndex].map((items,i)=>(
              <p onClick={()=>setSlotTime(items.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
              ${items.time === slotTime ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 
                'text-gray-400 border border-gray-300'
              } `} key={i}>
                {items.time.toLowerCase()}
              </p>
            ))
          }
        </div>
        <button className='bg-gradient-to-r from-green-400 to-blue-500 text-sm text-white py-2 
        mt-4 rounded-full px-6'>Book an appointment</button>
      </div>

      {/* list of RelatedDocs  */}
      <RelatedDoc docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
