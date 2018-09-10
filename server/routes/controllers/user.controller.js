import { User, AppliedCase, Resource } from "../../models";
import * as _ from 'lodash'

export function currentUser(req, res){
    if(req.user){
        res.status(200).json(req.user);
    } else {
        res.status(400).json({
            "success": false,
            "message": "not logged in"
        });
    }
}

export function getOneUser(req, res){
  User.findById(req.params.userId).then((user) => {
    res.json({
      "success": true,
      "user": user
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}

export function userSuggestedResources(req, res){
	Resource.find({"approved": true}).then(resources => {

		const suggestions = resources.filter(resource => (
				resource.stateServed == req.user.state && 
				resource.ethnicityServed == req.user.ethnicity &&
				!!_.intersection(resource.categories, req.user.categoriesOfInterest).length
		));

      console.log(suggestions);

		res.status(200).json({
			resources: suggestions
		})
	})
}

export function userAppliedResources(req, res){
    AppliedCase.find({ "user": req.user._id}).populate("resource").then(apps => {
        res.status(200).json({
            "success": true,
            "applications": apps
        });
    }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "Failed to get resources user applied to"
        });
    });
}

