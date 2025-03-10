import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "hello"
    // })

    // steps to user registation algoritham:
    // get user deails from frontend using postman dat is get
    // validation - not empty
    // check if user already account exits:check though username,email
    // check for images,check for avatar
    // upload them to coludinary, succesfully avatar upload  check that
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation for null response or user created
    // user created then return response or not created then erroe response display


   const {fullName,email,username,password} = req.body
   console.log("email:",email);

   if (
    [fullName,email,username,password].some((field) => field?.trim() === "")
   ) {
        throw new ApiError(400,"All fileds are required")
   }

   const exitedUser = User.findOne({
     $or: [{ username },{ email }]
   })
    
   if (exitedUser) {
      throw new ApiError(409,"User with email or  username already exits")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar) {
    throw new ApiError(400,"Avatar file is required")
   }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
     throw new ApiError(500,"Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

} )

export {
    registerUser,
}