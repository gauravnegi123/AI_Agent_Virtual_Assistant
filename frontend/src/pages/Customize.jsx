import React from 'react'
import { RiImageAddLine } from "react-icons/ri";
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"

function Customize() {
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#06065c] flex flex-wrap flex-col justify-center items-center'>
      <h1 className='text-white text-[30px] text-center'> Select your <span>Assistant Image</span></h1>
        <div className='w-[full] max-w-[60%] flex justify-center items-center flex-wrap gap-[15px] '>
        <Card image={image1}/>
        <Card image={image2}/>
        <Card image={image3}/>
        <Card image={image4}/>
        <Card image={image5}/>
        <Card image={image6}/>
        <Card image={image7}/>
        <div className='w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030330] border-2 border-[#04043766] rounded-2xl overflow-hidden hover: shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center '>
          <RiImageAddLine className='text-white w-[25px] h-[25px]'/>  
    </div>
    </div>
    </div>
  )
}

export default Customize
