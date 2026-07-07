import { User } from "../models/User.js";

export const callback = (req, res) => {
  console.log(req.session.passport);
  return res.redirect(process.env.NODE_ENV == "production" ? "https://studosphere-2.onrender.com/":"http://localhost:5173/")
};

export const getUser = (req, res) => {
    if(req.session.passport){
        return res.status(200).json({ user: {user: req.session.passport.user.user} });
    }else{
        return res.status(200).json({ user: null })
    }
};

export const logout = (req, res)=>{
    if(req.session){
        req.session.destroy();
        return res.status(200).json({ msg: "Logged Out Successfully" })
    }
}


export const getAllUsers = async (req, res)=>{
    try{
        const users = await User.find({email: {$ne: req.session.passport.user.user.email}});
        return res.status(200).json({ users });

    }catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Error While Getting All The Users" })
    }
}

export const updateProfile = async(req, res)=>{
    const { user } = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(req.session.passport.user.user._id, user, { new: true });
        console.log("Updated User: ", updatedUser);
        req.session.passport.user.user = updatedUser
        return res.status(200).json({ updatedUser })
    }catch(e){
        console.log(e);
        return res.status(400).json({ msg: "Error While Updating" })
    }
}