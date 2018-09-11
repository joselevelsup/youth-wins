
import { User, AppliedCase, CMS, Admin, Resource } from "../../models";
import * as _ from 'lodash'

export function currentUser(req, res){
    if(req.user){
        res.status(200).json(getImage([req.user])[0]);
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
      "user": getImage([user])[0]
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}

export function userSuggestedResources(req, res){
	Resource.find({"approved": true}).then(resources => {
		const suggestions = resources.filter(resource => (
				resource.stateServed.includes(req.user.state) && 
				resource.ethnicityServed.includes(req.user.ethnicity) &&
				!!_.intersection(resource.categories, req.user.categoriesOfInterest).length
		));

		res.status(200).json({
			resources: suggestions
		})
	})
}

export function userAppliedResources(req, res){
    AppliedCase.find({ "user": req.user._id}).populate("resource").then(a => {
        let apps = getImage(a);
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

export function appendContent(req, res){
    CMS.findOne().then(data => {
        Admin.find().then(a => {
            let admins = getImage(a);
            let teamMap = admins.filter(a => data.team.filter(t => a._id.toString() === t.toString()));
            let content = Object.assign({team: teamMap}, { home: data.home, aboutUs: data.aboutUs, supportUs: data.supportUs });
            res.status(200).json({
                "success": true,
                "content": content
            });
        }).catch(err => {
            res.status(500).json({
                "success": false,
                "message": "unable to get data"
            });
        });
    }).catch(err => {
        res.status(500).json({
            "success": false,
            "message": "unable to get data"
        });
    });
}


export function toggleResponse(req, res){
    console.log(req.body);
    AppliedCase.findOneAndUpdate({ "_id": req.body.appId }, {
        $set: {
            "status": !req.body.status
        }
    }, { new: true }).then(data => {
        console.log(data);
        res.status(200).json({
            "success": true
        });
    }).catch(err => {
        res.status(500).json({
            "success": false
        });
    });
}
