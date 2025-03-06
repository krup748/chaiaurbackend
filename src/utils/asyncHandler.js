import { promises } from "dns"

const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}


export {asyncHandler}



// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 400).json{
//             success: false,
//             meassage: err.meassage
//         }
//     }
// }