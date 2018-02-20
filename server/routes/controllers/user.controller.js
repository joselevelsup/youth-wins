import { User } from "../../models/user";

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


export function createUser(req, res){
  new User(req.body).save().then((user) => {
    res.json({
      "success": true
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  })
}

export function updateUser(req, res){
  User.findByIdAndUpdate(req.params.userId, {
    $set: req.body
  }).then((user) => {
    res.json({
      "success": true,
      "user": user
    });
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
}

export function deleteUser(req, res){
  User.findByIdAndRemove(req.params.userId).then((result) => {
    res.json({
      "success": true
    })
  })
}
