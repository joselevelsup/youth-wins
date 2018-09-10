import { Resource, AppliedCase } from "../../models/";
import { getImage } from "../../helpers/aws";
import { sendUserInfo } from "../../helpers/mailer";

export function getUserResources(req, res){
    Resource.find({"approved": true}).then((r) => {
        let resources = getImage(r);
        res.status(200).json({
            "success": true,
            "resources": resources
        });
    }).catch((err) => {
        res.status(500).json({
            "success": false
        });
    });
}

export function getOneResource(req, res){
    Resource.findOne({"_id": req.params.resourceId}).then((resource) => {
        res.status(200).json({
            "success": true,
            "resource": resource
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}

export function applyResource(req, res){
    Resource.findOneAndUpdate({ "_id": req.body.resourceId }, {
        $push: {
            applicants: req.user._id
        }
    }, { new: true }).then((data) => {
        new AppliedCase({
            user: req.user._id,
            resource: req.body.resourceId
        }).save().then(d => {
            return sendUserInfo(data.contactEmail, data.organizationName, req.user);
        }).then((info) => {
            res.status(200).json({
                "success": true,
                "message": "applied"
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": "failed to apply"
            });
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "failed to apply"
        });
    });
}

export function createResource(req, res){
    new Resource(req.body).save().then(() => {
        res.status(200).json({
            "success": true
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}
