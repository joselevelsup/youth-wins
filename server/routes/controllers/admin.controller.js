import { Case, Users, Resource } from "../../models";

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

export function approveResource(req, res){
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

export function getUsers(req, res){
    Users.find().then((users) => {
        res.status(200).json({
            "success": true,
            "users": users
        });
    }).catch((err) => {
        res.status(500).json({
            "success": false,
            "message": "failed to get users"
        });
    });
}
