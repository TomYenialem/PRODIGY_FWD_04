const User = require("../models/userModel")

const lastSeens=async(req,res)=>{
    try {
        const {id}=req.params
        const user= await User.findById(id)
          if (!user) return res.status(404).json({ message: "User not found" });
          
          const isOnline = user.isOnline;
          res.json({ lastSeen: isOnline ? "Online" : user.lastseen });

    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

module.exports=lastSeens