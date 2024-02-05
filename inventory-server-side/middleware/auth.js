var jwt = require('jsonwebtoken');
function checkAuthentication (req, res, next){
    console.log(req.headers.authorization)
    try{
        loggedIn = false

        let token = req.headers.authorization?.replace("Bearer ","")
if (token){
    try{
        var decoded = jwt.verify(token,'shhhhh');
        console.log(decoded);      
        req.user= decoded
        loggedIn = true
    }
    catch(err){
        console.log(err);
        console.log("jsonwebtoken error");
    }
}
if(!loggedIn){
    return res.status(401).send("unauthenticated")

}
next()
    }
catch(err){
    next(err)
}
}
module.exports ={
    checkAuthentication
}