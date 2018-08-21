import {
    Case,
    User,
    Resource,
    Admin
} from "../../models";

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

export function getCaseById(req, res){
  Case.findById(req.params.caseId).then((caseDoc) => {
    res.json({
      "success": true,
      "case": caseDoc
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
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

export function getUsers(req, res){
    User.find().then((users) => {
        Admin.find().then((admins) => {
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
    new Admin({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        isStaff: req.body.isStaff
    }).save().then((data) => {
        res.status(200).json({
            "success": true,
            "message": "Successfully created user"
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
                phone: req.body.phone,
                isAdmin: req.body.isAdmin,
                isStaff: req.body.isStaff
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
