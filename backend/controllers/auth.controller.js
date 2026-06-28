const userModel = require("../models/user.model")
const sendMail = require("../services/mail.service")
const jwt = require("jsonwebtoken")
const registerController = async (req, res) => {
    try {
        let { name, email, password, city, mobileNumber } = req.body
        if (!name || !email || !password || !city || !mobileNumber) return res.status(400).json({
            message: "All fields are required"
        })
        let existedUser = await userModel.findOne({ email })
        if (existedUser) return res.status(401).json({
            message: "user already exists"
        })
        let newUser = await userModel.create({
            name, email, password, city, mobileNumber
        })
        if (!newUser) return res.status(400).json({
            message: "Something went wrong"
        })
        let token = newUser.generateToken()
        // //verify email
        // const mailUrl = `https://authtask-1.onrender.com/api/auth/verify-email/${token}`
        // await sendMail(email, "Verification Email ",
        //     `<h3>click on the below link to login to your account</h3>
        //      ${mailUrl}
        //     `
        // )
        return res.status(201).json({
            success: true,
            message: "user registered successfully",
            newUser,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        })
    }

}

// const verifyEmailController = async (req, res) => {
//     try {
//         let token = req.params.token
//         if (!token) return res.status(401).json({
//             message: "token not found"
//         })
//         let decode = jwt.verify(token, process.env.JWT_TOKEN)
//         if (!decode) return res.status(401).json({
//             message: "invalid token"
//         })
//         //aapko isverified ko true krna hai ab to decode se aap user nikal lo id ka use karke or isverified ko true krdo then open login step
//         let updatedUser = await userModel.findByIdAndUpdate(
//             decode.id,
//             { isVerified: true },
//             { new: true } // Isse updated user return hoga
//         );
//         // console.log("new user is -->", updatedUser)
//         //isse mongo me change ho jayegaa or isverified true ho jayega
//         return res.render("verifyEmail")
//     } catch (error) {
//         console.log("error", error)
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false,
//             error
//         })
//     }
// }

const loginController = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) return res.status(400).json({
            message: "All fields are required"
        })
        //yaha par user exist karta hoga to aa jayega
        let existedUser = await userModel.findOne({ email })
        if (!existedUser) return res.status(401).json({
            message: "user does not exists"
        })
        // bcrypt.compare ek asynchronous function hai jo Promise return karta hai. Agar aap await nahi lagayenge, toh checkPass hamesha
        //  ek "Pending Promise" rahega. JavaScript mein ek Promise object hamesha truthy mana jata hai, isliye aapki if (!checkPass) wali 
        // condition kabhi trigger hi nahi hoti.
        let checkPass = await existedUser.comparePassword(password)
        if (!checkPass) return res.status(404).json({
            message: "invalid email or password"
        })
        let token = existedUser.generateToken()
        res.cookie("token", token, {
            httpOnly: false,
            secure: true,      // MUST be true for SameSite: 'None'
            sameSite: "none",  // Allows cookie to be sent across different domains
            path: "/",         // Ensure cookie is sent on all routes
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            success: true,
            message: "user loggedIn successfully",
            existedUser
        })
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        })
    }
}

const logoutController = async (req, res) => {
    try {
        //yaha par user logggedin hona chahiye tabhi wo logout hoga iske liye middleware laga diya hai jisse login user ka data mil jayega req.id 
        // me or agar userID nhi aayegi to return kr dege aagyi to cookie clear kar dege
        let userID = req.user.id
        if (!userID) return res.status(401).json({
            message: "user id not found"
        })
        res.clearCookie("token")
        return res.status(200).json({
            message: "user logged out",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        })
    }
}
module.exports = { registerController, loginController, logoutController}