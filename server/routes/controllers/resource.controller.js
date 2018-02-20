import { Resource } from "../../models/resource";

export function getResources(req, res){
  Resource.find().then((resources) => {
    res.json({
      "success": true,
      "resources": resources
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  })
}


export function getOneResource(req, res){
  Resource.findOne({"shortUrl": req.params.resourceId}).then((resource) => {
    res.json({
      "success": true,
      "resource": resource
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  })
}

export function createResource(req, res){
  new Resource(req.body).save().then(() => {
    res.json({
      "success": true
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}

export function updateResource(req, res){
  Resource.findOneAndUpdate({"shortUrl": req.params.resourceId}).then((result) => {
    res.json({
      "success": true,
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  })
}

export function deleteResource(req, res){
  Resource.findOneAndRemove({"shortUrl": req.params.resourceId}).then((result) => {
    res.json({
      "success": true
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}
