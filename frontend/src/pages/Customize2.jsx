import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Customize2() {
    const {serverUrl, userdata, backendImage, selectedImage, setUserData} = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userdata?.assistantName || "")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleUpdateAssistant=async()=>{
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("assistantName",assistantName)
            if(backendImage){
                formData.append("assistantImage",backendImage)
            }
            else{
                formData.append("imageUrl",selectedImage)
            }


            const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})

            setLoading(false)

            console.log(result.data)
            setUserData(result.data)
            navigate("/")
        }
                
         catch (error) {
            console.error("Error updating assistant:", error)
            setLoading(false)
        }
    }

    return (
        <div className='w-[full] h-[100vh] bg-gradient-to-t from-[black] to-[#06065c] flex flex-col justify-center items-center p-[20px]'>
            <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/customize")} />
            <h1 className='text-white text-[30px] text-center mb-[40px]'>Enter Your <span className='text-blue-400'>Assistant Name</span></h1>

            <input type="text" placeholder='eg:shifra' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setAssistantName(e.target.value)} value={assistantName} />


            {assistantName && <button className='min-w-[300px] h-[70px] mt-[30px] mb-[10px] bg-white rounded-full text-black font-semibold text-[30px] cursor-pointer' disabled={loading} onClick={()=>
                handleUpdateAssistant()
            }>{!loading ?"Create Your Assistant":"loading..."}</button> }

        </div>
    )
}

export default Customize2
