
import { Resource, AppliedCase } from "../../models/";
import { sendUserInfo } from "../../helpers/mailer";
import { getImage, uploadImage } from "../../helpers/aws";

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
	let data = JSON.parse(req.body.data);
	console.log(data)
    new Resource({
        organizationName: data.organizationName,
		email: data.email,
		phone: data.phone,
        contactEmail: data.contactEmail,
        description: data.description,
		website: data.website,
		inMilitary: data.inMilitary === "true" ? true : false,
        ethnicityServed: typeof data.ethnicityServed != "object" ? data.ethnicityServed.split(" ---- ") : data.ethnicityServed,
        stateServed: typeof data.stateServed != "object" ? data.stateServed.split(" ---- ") : data.stateServed,
    }).save().then((d) => {
        if(req.files == null){
            res.status(200).json({
                "success": true,
                "message": "Successfully Created Resource"
            });
        } else {
            uploadImage(req.files.file, data._id, "resource").then(key => {
                d.logo = key;

                return d.save();
            }).then(data => {
                res.status(200).json({
                    "success": true,
                    "message": "Successfully Created Resource"
                });
            });
        }
    }).catch((err) => {
        res.status(500).json({
            "success": false,
            "message": "Unable to create Resource"
        });
    });
}
