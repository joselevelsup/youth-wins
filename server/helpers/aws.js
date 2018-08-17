var aws = require("aws-sdk");
var fs = require("fs");
aws.config.region = "us-east-2";
var bucket = process.env.AWS_BUCKET;

var s3 = new aws.S3();

export function uploadImage(imageData){
    var params = {
        Bucket: bucket,
        Key: imageData.user + "/" + imageData.user+".jpg",
        Body: fs.createReadStream(imageData.file.path),
        ContentEncoding: 'base64',
        ContentType: imageData.file.type,
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

export function getImage(key, callback){
    var params = {
        Bucket: bucket,
        Key: key
    };

    var url = s3.getSignedUrl("getObject", params);
    callback(url);
}
