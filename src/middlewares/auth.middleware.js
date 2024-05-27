import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandlers } from "../utils/asynchandlers.js";
import jwt from "jsonwebtoken"



export const verifyJWT = asynchandlers(async(req, _ , next) => 
{
      try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
      {
          if(!token){
              throw new ApiError(401, "Unathorized request")
          }
      }
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    

      const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
      if(!user)
          {
              //NEXT_Video: discuss about frontend
              throw new ApiError(401, "Invalid Acess Token")
          }
  
          req.user = user;
           next()
          
      } catch (error) {

        throw new ApiError(401, error?.message || "Invalid access token")
        
      }


}
)