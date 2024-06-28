import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
const registration = asyncHandler( async (req,res)=>{

    // get details from franted
    // validation not emty
    // check if user is already exits : username email
    // check for images, check for avatar 
    // upload cloudinary, avater
    // create user object create enter in db
    // remove passaword and refresh token field from response
    // check for user creation 
    // return res 
    const {fullname,username, email, password} =  req.body
    if([fullname].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"all field is required")
    }
    const exixtedUser =   User.findOne({
        $or :[{username},{email}]
    })
    if(exixtedUser){
        throw new ApiError(409,"user with email or username already exits")
    }
   const avatarLocalPath =  res.files?.avatar[0]?.path
   const coverImageLocalPath =  res.files?.coverImage[0]?.path
   if(!avatarLocalPath){
    throw new ApiError(400,"avatar is requered")
   }
 const avatar =  await uploadOnCloudinary(avatarLocalPath)
 const coverImage =  await uploadOnCloudinary(coverImageLocalPath)
 if(!avatar){
    throw new ApiError(400,"avatar is requered")
 }
 const user = await User.create({
    fullName:fullName, avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
 })
 const createdUser = User.findById(user._id).select(
    "-password -refreshToken"
 )
 if(createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
 }
 return res.status(201).json(
    new ApiResponse(200,createdUser,"user created successfully")
 )
    res.status(300).json({
        message:"ok"
    })
})

export {registration}

