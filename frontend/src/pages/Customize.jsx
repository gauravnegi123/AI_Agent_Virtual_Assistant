import React, { use, useContext, useRef, useState } from 'react'
import { RiImageAddLine } from "react-icons/ri";
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const{serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
  const navigate = useNavigate()
  const inputImage=useRef()

  const handleImage=(e)=>{
    const file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  return (
    <div className='w-[full] h-[100vh] bg-gradient-to-t from-[black] to-[#06065c] flex flex-col justify-center items-center p-[20px]'>
      <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/")} />
      <h1 className='text-white text-[30px] text-center mb-[40px]'> Select your <span className='text-blue-400'>Assistant Image</span></h1>
        <div className='w-[full] max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={image1}/>
        <Card image={image2}/>
        <Card image={image3}/>
        <Card image={image4}/>
        <Card image={image5}/>
        <Card image={image6}/>
        <Card image={image7}/>
        <div className={`w-[70px] h-[140px] lg:w-[140px] lg:h-[250px] bg-[#030330] border-2 border-[#04043766] rounded-2xl overflow-hidden hover: shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage === "input" ? 'border-4 border-white shadow-2xl shadow-blue-950' : null}`}onClick={()=>{
          inputImage.current.click()
          setSelectedImage("input")}}>

          {!frontendImage && <RiImageAddLine className='text-white w-[25px] h-[25px]'/> }
          {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}
    </div>
    <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} />
    </div>
    {selectedImage && <button className='min-w-[150px] h-[70px] mt-[30px] mb-[10px] bg-white rounded-full text-black font-semibold text-[30px] cursor-pointer' onClick={()=>navigate("/Customize2")}>Next</button>}
    
    
    </div>
  )
}

export default Customize
