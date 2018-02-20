import { Case } from "../../models/case";

export function getAllCases(req, res){
  Case.find().then((cases) => {
    res.json({
      "success": true,
      "cases": cases
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  })
}

export function getCaseById(req, res){
  Case.findById(req.params.caseId).then((caseDoc) => {
    res.json({
      "success": true,
      "case": caseDoc
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}
