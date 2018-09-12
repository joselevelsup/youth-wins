import mongoose from "mongoose";

const cmsModel = new mongoose.Schema({
    home: {
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
