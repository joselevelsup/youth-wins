import {
    AppliedCase,
    User,
    Resource,
    Admin
} from "../../models";

import { getImage, uploadImage, replaceImage } from "../../helpers/aws";
import { sendAcceptedEmail, sendDeniedEmail } from "../../helpers/mailer";
import bcrypt from "bcrypt";

export function getAllCases(req, res){
  Case.find().then((cases) => {
    res.json({
      "success": true,
      "cases": cases
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  })
}

export function getResources(req, res){
    Resource.find().then((r) => {
        let resources = getImage(r);
        res.status(200).json({
            "success": true,
            "resources": resources
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}

export function deleteResource(req, res){
    if(!req.body.resourceId){
        res.status(500).json({
            "success": false,
            "message": "No resource id provided"
        });
    } else {
        Resource.findOneAndRemove({"_id": req.body.resourceId }).then((data) => {
            return AppliedCase.find({"resource": req.body.resourceId }).remove();
        }).then(d => {
            res.status(200).json({
                "success": true,
                "message": "Successfully deleted Resource"
            });
        }).catch((err) => {
            res.status(500).json({
                "success": false,
                "message": "Unable to delete Resource"
            });
        });
    }
}

export function createResource(req, res){
    let data = JSON.parse(req.body.data);
    new Resource({
        organizationName: data.organizationName,
        email: data.email,
        contactEmail: data.contactEmail,
        description: data.description,
        website: data.website
    }).save().then((data) => {
        uploadImage(req.files.file, data._id, "resource").then(key => {
            data.logo = key;

            return data.save();
        }).then(data => {
            res.status(200).json({
                "success": true,
                "message": "Successfully Created Resource"
            });
        });
    }).catch((err) => {
        res.status(500).json({
            "success": false,
            "message": "Unable to create Resource"
        });
    });
}

export function updateResource(req, res){
    let data = JSON.parse(req.body.data);
    if(!data.id){
        res.status(500).json({
            "success": false,
            "message": "No resource id provided"
        });
    } else {
        Resource.findOneAndUpdate({ "_id": data.id }, {
            $set: {
                organizationName: data.organizationName,
                email: data.email,
                contactEmail: data.contactEmail,
                description: data.description,
                website: data.website
            }
        }).then((data) => {
            if(req.files == null){
                res.status(200).json({
                    "success": true,
                    "message": "updated the resource"
                });
            } else {
                replaceImage(req.files.file, data._id, "resource").then(d => {
                    res.status(200).json({
                        "success": true,
                        "message": "updated the resource"
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": "failed to update resource"
            });
        });
    }
}

export function approveResource(req, res){
    if(!req.body.resourceId){
        res.status(500).json({
            "success": false,
            "message": "No resource id provided"
        });
    } else {
        Resource.findOneAndUpdate({ "_id": req.body.resourceId }, {
            $set: {
                pending: false,
                approved: true
            }
        }, { new: true }).then((data) => {
            return sendAcceptedEmail(data.contactEmail);
        }).then(data => {
            res.status(200).json({
                "success": true,
                "message": "approved"
            });
        }).catch((err) => {
            res.status(500).json({
                "success": true,
                "message": "something went wrong"
            });
        });
    }
}

export function denyResource(req, res){
    if(!req.body.resourceId){
        res.status(500).json({
            "success": false,
            "message": "No resource id provided"
        });
    } else {
        Resource.findOneAndUpdate({ "_id": req.body.resourceId }, {
            $set: {
                pending: false,
                approved: false
            }
        }, { new: true }).then((data) => {
            return sendDeniedEmail(data.contactEmail);
        }).then(data => {
            res.status(200).json({
                "success": true,
                "message": "denied"
            });
        }).catch((err) => {
            res.status(500).json({
                "success": true,
                "message": "something went wrong"
            });
        });
    }
    
}

export function getUsers(req, res){
    User.find().then((u) => {
        Admin.find().then((a) => {
            let users = getImage(u);
            let admins = getImage(a);
            res.status(200).json({
                "success": true,
                "users": users,
                "admins": admins
            });
        }).catch((err) => {
            res.status(500).json({
                "success": false,
                "message": "failed to get users"
            });
        });
    }).catch((err) => {
        res.status(500).json({
            "success": false,
            "message": "failed to get users"
        });
    });
}

export function createStaff(req, res){
    const user = JSON.parse(req.body.data);
    new Admin({
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        isAdmin: user.isAdmin ? user.isAdmin : false,
    }).save().then((data) => {
        console.log(data);
        uploadImage(req.files.file, data._id, "admin").then(key => {
            data.profile = key;

            return data.save();
        }).then(data => {
            res.status(200).json({
                "success": true,
                "message": "Successfully created user"
            });
        });
    }).catch((err) => {
        res.status(500).json({
            "success": false,
            "message": "unable to create user"
        });
    });
}

export function updateStaff(req, res){
    if(!req.body.staffId){
        res.status(500).json({
            "success": false,
            "message": "No staff id provided"
        });
    } else {
        Admin.findOneAndUpdate({ "_id": req.body.staffId }, {
            $set: {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                bio: req.body.bio,
                isAdmin: req.body.isAdmin,
            }
        }).then((data) => {
            res.status(200).json({
                "success": true,
                "message": "Updated staff"
            });
        }).catch((err) => {
            res.status(500).json({
                "success": false,
                "message": "unable to update staff"
            });
        });
    }
}
export function updateUser(req, res){
    
}

export function deleteStaff(req, res){
    if(!req.body.staffId){
        res.status(500).json({
            "success": false,
            "message": "No staff id provided"
        });
    } else {
        Admin.findOneAndRemove({ "_id": req.body.staffId }).then((data) => {
            res.status(200).json({
                "success": true,
                "message": "Deleted staff"
            });
        }).catch((err) => {
            res.status(500).json({
                "success": false,
                "message": "unable to delete staff"
            });
        });
    }
}

export function deleteUser(req, res){
    if(!req.body.userId){
        res.status(500).json({
            "success": false,
            "message": "No user id provided"
        });
    } else {
        User.findOneAndRemove({ "_id": req.body.userId }).then((data) => {
            res.status(200).json({
                "success": true,
                "message": "Deleted user"
            });
        }).catch((err) => {
            res.status(500).json({
                "success": false,
                "message": "unable to delete user"
            });
        });
    }
}


export function getAllApplications(req, res){
    AppliedCase.find().populate("resource").then(apps => {
        res.status(200).json({
            "success": true,
            "applications": apps
        });
    }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "failed to get apps"
        });
    });
}

export function deleteApplication(req, res){
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
