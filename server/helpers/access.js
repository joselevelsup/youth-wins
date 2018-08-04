export function checkUser(req, res, next){
    if(req.session()){
        next();
    } else {
        res.status(400).json({
            message: "Not logged in"
        });
    }
}

export function checkAdmin(req, res, next){
    if(req.session()){
        if(req.user.isAdmin){
            next();
        } else {
            res.status(400).json({
                message: "Not an admin"
            });
        }
    }
}
