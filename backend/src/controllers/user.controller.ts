import * as express from 'express';
import user from '../model/user';


export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        user.findOne({"username":username, "password": password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

/*
    register = (req: express.Request, res: express.Response)=>{
        let user = new User({firstname: req.body.firstname, lastname: req.body.lastname,
                username: req.body.username, password: req.body.password, type: req.body.type })

        //let user = new User(req.body)

        user.save().then(user=>{
            res.status(200).json({'message': 'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })

       
   }
    */
}