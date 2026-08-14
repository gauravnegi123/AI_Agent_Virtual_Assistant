import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment";



export const getCurrentUser= async (req, res)=>{
    try {
        const userId =req.userId
        const user= await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
       return res.status(200).json(user)
    }
    catch (error) {
      return res.status(400).json({message: error.message})
    }
}


export const updateAssistant = async (req,res)=>{
try{
const {assistantName, imageUrl}= req.body
let assistantImage;
if(req.file){
assistantImage = await uploadOnCloudinary(req.file.path)
}
else{
assistantImage=imageUrl
}

const user = await User.findByIdAndUpdate(req.userId,{
    assistantName,
    assistantImage
},{new:true}).select("-password")

return res.status(200).json(user)}
catch(updateAssistantError){
return res.status(400).json({message: updateAssistantError.message})
}
}

export const askToAssistant = async (req,res)=>{
    try{
        const {command}= req.body
        const user = await User.findById(req.userId)
        user.history.push(command)
        user.save()
        const userName = user.name
        const assistantName = user.assistantName

        const result = await geminiResponse(command,assistantName,userName)
        
        const jsonMatch= result.match(/{[\s\S]*}/)

        if(!jsonMatch){
            return res.status(400).json({response: "sorry, I couldn't understand your request. Please try again."})
        }
        const gemResult = JSON.parse(jsonMatch[0])
        console.log(gemResult)
        const type=gemResult.type

        switch(type){
            case "get-date":
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response: `current date is ${moment().format("DD-MM-YYYY")}`
                });
            case "get-time":
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response: `current time is ${moment().format("HH:mm a")}`
                });
            case "get-day":
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response: `today is ${moment().format("dddd")}`
                });
            case "get-month":
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response: `current month is ${moment().format("MMMM")}`
                });
                case "general":
                case "google-search":
                    case "youtube-search":
                    case "youtube-play":
                    case "calculator-open":
                    case "instagram-open":
                    case "facebook-open":
                    case "whatsapp-open":
                    case "wikipedia-search":
                    case "weather-show":
                    case "stock-price":
                    case "alarm-set":
                    case "news-show":
                    case "translate":
                    case "gmail-open":

                    return res.json({
                        type,
                        userInput:gemResult.userInput,
                        response: gemResult.response
                    });

                    default:
                        return res.status(400).json({response: "sorry, I couldn't understand your request. Please try again."})    
    }

}

        catch(error){
            return res.status(500).json(error.message)
        }
    }