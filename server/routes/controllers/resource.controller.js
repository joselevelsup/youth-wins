import { Resource } from "../../models/resource";
import { uploadImage } from "../../helpers/aws";


export function getUserResources(req, res){
    Resource.find({"approved": true}).then((resources) => {
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
    Resource.findOne({"shortUrl": req.params.resourceId}).then((resource) => {
        res.status(200).json({
            "success": true,
            "resource": resource
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
    })
}

export function applyResource(req, res){
    Resource.findOneAndUpdate({ "_id": req.body.resourceId }, {
        $push: {
            applicants: req.user._id
        }
    }).then((data) => {
        res.status(200).json({
            message: "applied"
        });
    }).catch((err) => {
        res.status(500).json({
            message: "failed to apply"
        });
    });
}

export function createResource(req, res){
    let data = JSON.parse(req.body.data);
    new Resource({
        organizationName: data.organizationName,
        email: data.email,
        contactEmail: data.contactEmail,
        description: data.description,
        website: data.website
    }).save().then((d) => {
        if(req.files == null){
            d.stateServed.push(data.stateServed);
            d.ethnicityServed.push(data.ethnicityServed);
            d.categories.push(data.categories);

            d.save().then(() => {
                res.status(200).json({
                    "success": true,
                    "message": "Successfully Created Resource"
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    "success": false,
                    "message": "unable to save"
                });
            })
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


export function updateResource(req, res){
    Resource.findOneAndUpdate({"shortUrl": req.params.resourceId}).then((result) => {
        res.status(200).json({
            "success": true,
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
    })
}

export function deleteResource(req, res){
    Resource.findOneAndRemove({"shortUrl": req.params.resourceId}).then((result) => {
        res.status(200).json({
            "success": true
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}
