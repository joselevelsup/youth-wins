import {
    AppliedCase,
    User,
    Resource,
    Admin
} from "../../models";

import { getImage, uploadImage } from "../../helpers/aws";

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
    Resource.find().then((resources) => {
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
    console.log(req.body);
    new Resource({
        organizationName: req.body.orgName,
        contactEmail: req.body.email,
        logo: req.body.logo,
        description: req.body.description,
        website: req.body.website
    }).save().then((data) => {
        res.status(200).json({
            "success": true,
            "message": "Successfully Created Resource"
        });
    }).catch((err) => {
        res.status(500).json({
            "success": false,
            "message": "Unable to create Resource"
        });
    });
}

export function updateResource(req, res){
    if(!req.body.resourceId){
        res.status(500).json({
            "success": false,
            "message": "No resource id provided"
        });
    } else {
        Resource.findOneAndUpdate({ "_id": req.body.resourceId }, {
            $set: {
                organizationName: req.body.orgName,
                contactEmail: req.body.email,
                description: req.body.description
            }
        }).then((data) => {
            res.status(200).json({
                "success": true,
                "message": "updated the resource"
            });
        }).catch((err) => {
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
        }).then((data) => {
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
        }).then((data) => {
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
    console.log(req.files);

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
