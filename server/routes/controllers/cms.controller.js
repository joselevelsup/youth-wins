import { Admin, CMS } from "../../models";
import { getCmsImages, uploadImage, replaceImage } from "../../helpers/aws";

export function getAllContent(req, res){
    CMS.findOne().then(data => {
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
            "home.body": data.body,
            "home.facebook": data.facebook,
            "home.twitter": data.twitter,
            "home.linkedin": data.linkedin
        }
    }, { new: true}).then(({ home }) => {
        let homeData = Object.assign({type: "home"}, home);

        if(!req.files){
            res.status(200).json({
                "success": true,
                "message": "Successfully updated home content"
            });
        } else {
            if(req.files.banner){
                replaceImage(req.files.banner, homeData , "homeBanner").then(banner => {
                    return CMS.findOneAndUpdate({}, {
                        $set: {
                            "home.bannerImage": banner
                        }
                    });
                }).then(() => {
                    if(req.files.logo){
                        replaceImage(req.files.logo, homeData, "homeLogo").then(logo => {
                            return CMS.findOneAndUpdate({}, {
                                $set: {
                                    "home.logoImage": logo
                                }
                            });
                        }).then(() => {
                            res.status(200).json({
                                "success": true,
                                "message": "Successfully updated home content"
                            });
                        });
                    } else {
                        res.status(200).json({
                            "success": true,
                            "message": "Successfully updated home content"
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else {
                res.status(200).json({
                    "success": true,
                    "message": "Successfully updated home content"
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


export function addMember(req, res){
    if(!req.body.userId){
        res.status(500).json({
            "success": false,
            "message": "no user id provided"
        });
    } else {
        CMS.findOne().then(cms => {
            if(cms.team.some(t => t == req.body.userId)){
                return CMS.findOneAndUpdate({}, {
                    $pull: {
                        "team": req.body.userId
                    }
                });
            } else {
                return CMS.findOneAndUpdate({}, {
                    $push: {
                        "team": req.body.userId
                    }
                });
            }
        }).then(data => {
            res.status(200).json({
                "success": true
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": "unable to add or remove member"
            });
        });
    }
}


export function createCategory(req, res){
    if(!req.body.category){
        res.status(500).json({
            "success": false,
            "message": "no new category supplied"
        });
    } else {
        CMS.findOneAndUpdate({}, {
            $push: {
                "categories": req.body.category
            }
        }, { new: true }).then(data => {
            res.status(200).json({
                "success": true,
                "categories": data.categories
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": "unable to make a category"
            });
        });
    }
}

export function deleteCategory(req, res){
    if(!req.body.category){
        res.status(500).json({
            "success": false,
            "message": "no category was supplied"
        });
    } else {
        CMS.findOneAndUpdate({}, {
            $pull: {
                "categories": req.body.category
            }
        }, { new: true }).then(data => {
            res.status(200).json({
                "success": true,
                "categories": data.categories
            });
        }).catch(err => {
            res.status(500).json({
                "success": false,
                "message": "unable to delete the category"
            });
        });
    }
}
