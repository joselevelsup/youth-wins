import { User, Admin, Resource, AdminCase} from "../../models";

export function getAllCases(req, res){
    Case.find({}).then(cases => {
        res.status(200).json(cases);
    }).error(err => {
        res.status(500).json({
            message: "failed to get cases"
        });
    });
}

export function createCase(req, res){
    const {
        userId,
        adminId,
        resourceId
    } = req.body;

    new AdminCase({
        user: userId,
        admin: adminId,
        resource: resourceId
    }).save().then((c) => {
        res.status(200).json({
            caseId: c._id,
            message: "case made"
        });
    }).catch((err) => {
        res.status(500).json({
            message: "unable to create case"
        });
    });
}
