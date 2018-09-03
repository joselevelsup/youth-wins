import { User, AppliedCase } from "../../models";

export function currentUser(req, res){
    if(req.user){
        res.status(200).json(req.user);
    } else {
        res.status(400).json({
            "success": false,
            "message": "not logged in"
        });
    }
}

export function getOneUser(req, res){
  User.findById(req.params.userId).then((user) => {
    res.json({
      "success": true,
      "user": user
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}

export function userSuggestedResources(req, res){
    
}

export function userAppliedResources(req, res){
    AppliedCase.find({ "user": req.user._id}).populate("resource", "organizationName").then(apps => {
        res.status(200).json({
            "success": true,
            "applications": apps
        });
    }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "Failed to get resources user applied to"
        });
    });
}

