import { CMS } from "../../models";
import { uploadImage, replaceImage } from "../../helpers/aws";

export function getAllContent(req, res){
    CMS.find().then(data => {
        res.status(200).json({
            "success": true,
            "content": data
        });
    }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "unable to get data"
        });
    });
}


export function updateHomeContent(req, res){
    const data = JSON.parse(req.body.data);
    CMS.findOneAndUpdate({}, {
        $set: {
            "home.bannerText": data.bannerText,
            "home.titleText": data.titleText,
            "home.body": data.body
        }
    }, { new: true}).then(({ home }) => {
        if(!req.files){
            res.status(200).json({
                "success": true,
                "message": "Successfully updated home content"
            });
        } else {
            if(home.bannerImage){
                replaceImage(req.files.file, Object.assign({type: "home"}, home), "home").then(d => {
                        return CMS.findOneAndUpdate({}, {
                            $set: {
                                "home.bannerImage": d
                            }
                        });
                }).then(() => {
                    res.status(200).json({
                        "success": true,
                        "message": "Successfully updated home content"
                    });
                }).catch(err => {
                    console.log(err);
                });
            } else {
                uploadImage(req.files.file, "home", "home").then(d => {
                    return CMS.findOneAndUpdate({}, {
                        $set: {
                            "home.bannerImage": d
                        }
                    });
                }).then(() => {
                    res.status(200).json({
                        "success": true,
                        "message": "Successfully updated home content"
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }).catch(err => {
        console.log(err);
    })
}

export function updateSupportContent(req, res){
    const data = JSON.parse(req.body.data);
    CMS.findOneAndUpdate({}, {
        $set: {
            "supportUs.bannerText": data.bannerText,
            "supportUs.section1.titleText": data.section1Title,
            "supportUs.section1.body": data.section1Body,
            "supportUs.section2.titleText": data.section2Title,
            "supportUs.section2.body": data.section2Body
        }
    }, { new: true}).then(({ supportUs }) => {
        if(!req.files){
            res.status(200).json({
                "success": true,
                "message": "Successfully updated support content"
            });
        } else {
            if(supportUs.bannerImage){
                replaceImage(req.files.file, Object.assign({type: "supportus"}, supportUs), "supportus").then(d => {
                        return CMS.findOneAndUpdate({}, {
                            $set: {
                                "supportUs.bannerImage": d
                            }
                        });
                }).then(() => {
                    res.status(200).json({
                        "success": true,
                        "message": "Successfully updated support content"
                    });
                }).catch(err => {
                    console.log(err);
                });
            } else {
                uploadImage(req.files.file, "supportus", "supportus").then(d => {
                    return CMS.findOneAndUpdate({}, {
                        $set: {
                            "supportUs.bannerImage": d
                        }
                    });
                }).then(() => {
                    res.status(200).json({
                        "success": true,
                        "message": "Successfully updated support content"
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }).catch(err => {
        console.log(err);
    })
}

export function updateAboutContent(req, res){
    const data = JSON.parse(req.body.data);
    CMS.findOneAndUpdate({}, {
        $set: {
            "aboutUs.bannerText": data.bannerText,
            "aboutUs.section1.titleText": data.section1Title,
            "aboutUs.section1.body": data.section1Body,
            "aboutUs.section2.titleText": data.section2Title,
            "aboutUs.section2.body": data.section2Body
        }
    }, { new: true}).then(({ aboutUs }) => {
        if(!req.files){
            res.status(200).json({
                "success": true,
                "message": "Successfully updated about content"
            });
        } else {
            if(aboutUs.bannerImage){
                replaceImage(req.files.file, Object.assign({type: "aboutus"}, aboutUs), "aboutus").then(d => {
                        return CMS.findOneAndUpdate({}, {
                            $set: {
                                "aboutUs.bannerImage": d
                            }
                        });
                }).then(() => {
                    res.status(200).json({
                        "success": true,
                        "message": "Successfully updated about content"
                    });
                }).catch(err => {
                    console.log(err);
                });
            } else {
                uploadImage(req.files.file, "aboutus", "aboutus").then(d => {
                    return CMS.findOneAndUpdate({}, {
                        $set: {
                            "aboutUs.bannerImage": d
                        }
                    });
                }).then(() => {
                    res.status(200).json({
                        "success": true,
                        "message": "Successfully updated about content"
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }).catch(err => {
        console.log(err);
    });
}
