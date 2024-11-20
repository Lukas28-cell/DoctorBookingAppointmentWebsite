import React from 'react'
import Header from '../component/Header'
import Specialitymenu from '../component/Specialitymenu'
import TopDoctors from '../component/TopDoctors'
import Banner from '../component/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <Specialitymenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
