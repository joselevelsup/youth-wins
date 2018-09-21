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
            type: String,
            required: true,
        },
        bannerImage: {
            type: String
        },
        section1Title: String,
        section1Body: String,
        section2Title: String,
        section2Body: String
    },
    supportUs: {
        bannerText: {
            type: String
        },
        bannerImage: {
            type: String
        },
        section1Title: String,
        section1Body: String,
        section2Title: String,
        section2Body: String
    },
    team: [mongoose.Schema.Types.ObjectId],
    categories: [mongoose.Schema.Types.String]
});


export const CMS = mongoose.model("cms", cmsModel);
