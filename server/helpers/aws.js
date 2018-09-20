require("dotenv").config();
var aws = require("aws-sdk");
var fs = require("fs");
aws.config.region = "us-east-2";
var bucket = process.env.BUCKET;

var s3 = new aws.S3();

export function uploadImage(file, user, type){
    let ext = file.mimetype == "image/jpeg" ? ".jpg" : ".png";
    var params = {
        Bucket: bucket,
        Key: type + "/" + user + "/" + user + ext,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read"
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, function(err, data){
            if(err){
                reject(err);
            } else {
                resolve(data.Key);
            }
        });
    });
}

export function replaceImage(file, d, type){
    let params = {
        Bucket: bucket,
        Key: d.profile || d.logo || d.bannerImage
    };


    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
            let user = d.id || d._id || d.type;
            if(err){
                reject(err);
            }

            uploadImage(file, user, type).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    });
}

export function getImage(arr){
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if(arr.length >= 1){
        arr.map(a => {
            if(a.profile){
                a.profile = `https://${bucket}.s3.amazonaws.com/${a.profile}`;
            }
            if(a.logo){
                a.logo = `https://${bucket}.s3.amazonaws.com/${a.logo}`;
            }

            if(a.resource){
                if(!regexp.test(a.resource.logo)){
                    a.resource.logo = `https://${bucket}.s3.amazonaws.com/${a.resource.logo}`;
                }
            }

            return a;
        });


        return arr;
    } else {
        if(arr.logo){
            let newLink = `https://${bucket}.s3.amazonaws.com/${arr.logo}`;
            let newObj = Object.assign({ logo: newLink }, arr);
            return newObj;
        }
        if(arr.profile){
            arr.profile = `https://${bucket}.s3.amazonaws.com/${arr.profile}`;
            return arr;
        }
    }
}

export function getCmsImages(cms){
    cms.home.logoImage = `https://${bucket}.s3.amazonaws.com/${cms.home.logoImage}`;
    cms.home.bannerImage = `https://${bucket}.s3.amazonaws.com/${cms.home.bannerImage}`;
    cms.supportUs.bannerImage = `https://${bucket}.s3.amazonaws.com/${cms.supportUs.bannerImage}`;
    cms.aboutUs.bannerImage = `https://${bucket}.s3.amazonaws.com/${cms.supportUs.bannerImage}`;

    return cms;
}
