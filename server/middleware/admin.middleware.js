export const checkAdminLogin = (req, res, next)=>{
    try{
        const passport = req.session.passport;
        if(passport?.user?.user?._id && passport?.user?.user?.isHead){
            return next();
        }
    }catch(e){
        res.status(401).json({ msg: "Unauthorized Admin" })
    }
}