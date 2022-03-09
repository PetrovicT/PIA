import * as express from 'express';
import User from '../model/user';


export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({"username":username, "password": password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    findUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({"username":username, "password": password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let newUser = new User({username: req.body.username, password: req.body.password,
            name: req.body.name, surname: req.body.surname, email: req.body.email, birthday: req.body.birthday,
            height: req.body.height, type: req.body.type })
       
            newUser.save().then(newUser=>{
            res.status(200).json({'message': 'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
   }

   changePassword = (req: express.Request, res: express.Response)=>{
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    console.log(username);
    console.log(oldPassword);
    console.log(newPassword);
    // check if user entered good password
    User.findOne({"username":username, "password": oldPassword}, (err, userX)=>{
        if(!userX){ console.log(err);
        }
        else {
            // change password
            User.collection.updateOne({"username":username}, {$set: {"password": newPassword}});
            res.json(userX);
        }
    })
}
}