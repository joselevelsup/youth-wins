import mongoose from "mongoose";

const cmsModel = new mongoose.Schema({
    home: {
        logoImage: {
            type: String
        },
        bannerText: {
            type: String
        },
        bannerImage: {
            type: String
        },
        titleText: {
            type: String
        },
        body: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    aboutUs: {
        bannerText: {
            type: String
        },
        bannerImage: {
            type: String
        },
        section1: {
            titleText: {
                type: String
            },
            body: {
                type: String
            }
        },
        section2: {
            titleText: {
                type: String
            },
            body: {
                type: String
            }
        }
    },
    supportUs: {
        bannerText: {
            type: String
        },
        bannerImage: {
            type: String
        },
        section1: {
            titleText: {
                type: String
            },
            body: {
                type: String
            }
        },
        section2: {
            titleText: {
                type: String
            },
            body: {
                type: String
            }
        }
    },
    team: [mongoose.Schema.Types.ObjectId],
    categories: [mongoose.Schema.Types.String]
});


export const CMS = mongoose.model("cms", cmsModel);
