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
        Key: d.profile || d.logo
    };

    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
            if(err){
                reject(err);
            }

            uploadImage(file, d, type).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    });
}

export function getImage(arr){
    arr.map(a => {
        if(a.profile){
            a.profile = `https://${bucket}.s3.amazonaws.com/${a.profile}`;
        }
        if(a.logo){
            a.logo = `https://${bucket}.s3.amazonaws.com/${a.logo}`;
        }

        return a;
    });

    return arr;
}
