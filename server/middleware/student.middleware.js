export const studentLoginCheck  = (req, res, next)=>{
    try{

        const passport = req.session.passport;
        if(passport?.user?.user?._id && !passport?.user?.user?.isHead){
            return next();
        }
    }catch(e){
        console.log(e);
        return res.status(401).json({ msg: "Unauthorized Student" })
    }
}