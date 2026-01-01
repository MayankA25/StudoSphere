export const checkLogin = (req, res, next)=>{
    if(req.session.passport){
        return next()
    }
    else{
        res.status(401).json({ msg: "You are logged out! Login Again" })
    }
}