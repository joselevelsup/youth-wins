import { User, AppliedCase, CMS, Admin, Resource } from "../../models";
import * as _ from 'lodash';
import bcrypt from "bcrypt";
import { getImage } from "../../helpers/aws";
import { sendForgotEmail } from "../../helpers/mailer";

export function currentUser(req, res){
    if(req.user){
        res.status(200).json(getImage([req.user])[0]);
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
      "user": getImage([user])[0]
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}

export function userSuggestedResources(req, res){
	  Resource.find({"approved": true}).then(resources => {
        let r = getImage(resources);
		    let suggestions = r.filter(resource => (
				    !!_.intersection(resource.categories, req.user.categoriesOfInterest).length
		    ));

		    res.status(200).json({
			      resources: suggestions
		    });
	  }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "unable to get suggested resources"
        });
    });
}

export function userAppliedResources(req, res){
    AppliedCase.find({ "user": req.user._id}).populate([
        {
            path: "resource",
            model: "resources"
        },
        {
            path: "user",
            model: "user"
        }
    ]).then(a => {
        let apps = getImage(a);
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

export function appendContent(req, res){
    CMS.findOne().then(data => {
        Admin.find().then(a => {
            let admins = getImage(a);
            let teamMap = admins.filter(a => data.team.filter(t => a._id.toString() === t.toString()));
            let content = Object.assign({team: teamMap}, { home: data.home, aboutUs: data.aboutUs, supportUs: data.supportUs, categories: data.categories });
            res.status(200).json({
                "success": true,
                "content": content
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": "unable to get data"
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            "success": false,
            "message": "unable to get data"
        });
    });
}


export function toggleResponse(req, res){
    AppliedCase.findOneAndUpdate({ "_id": req.body.appId }, {
        $set: {
            "status": !req.body.status
        }
    }, { new: true }).then(data => {
        console.log(data);
        res.status(200).json({
            "success": true
        });
    }).catch(err => {
        res.status(500).json({
            "success": false
        });
    });
}

export function sendForgotPass(req, res){
    User.findOne({ "email": req.body.email }).then(data => {
        if(data != null){
            sendForgotEmail({id: data._id, email: data.email }).then(d => {
                res.status(200).json({
                    "success": true,
                    "message": "Mail successfully sent"
                });
            }).catch(err => {
                res.status(500).json({
                    "success": false,
                    "message": "mail unable to send"
                });
            });
        } else {
            res.status(500).json({
                "success": false,
                "message": "mail unable to send"
            });
        }
    }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "mail unable to send"
        });
    });
}

export function changePassword(req, res){
    User.findOneAndUpdate({ "_id": req.body.id }, {
        $set: {
            "password": bcrypt.hashSync(req.body.password, 10),
        }
    }).then(data => {
        res.status(200).json({
            "success": true,
            "message": "successfully updated password"
        });
    }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "unable to update password"
        });
    });
}

export function deleteUserApplication(req, res){
    if(!req.body.appId){
        res.status(500).json({
            "success": false,
            "message": "no application id provided"
        });
    } else {
        AppliedCase.deleteOne({"_id": req.body.appId}).then(data => {
            res.status(200).json({
                "success": true,
                "message": "application deleted"
            });
        }).catch(err => {
            res.status(500).json({
                "success": false,
                "message": "failed to delete application"
            });
        });
    }
}
