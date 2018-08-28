import { Resource } from "../../models/resource";



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
    console.log(req.body);
    console.log(req.user);
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
    new Resource(req.body).save().then(() => {
        res.status(200).json({
            "success": true
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
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
