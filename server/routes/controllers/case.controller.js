import { User, Admin, Resource, Case} from "../../models";

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
    new Case({
        
    })
}
