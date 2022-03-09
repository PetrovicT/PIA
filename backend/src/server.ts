import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import user from './model/user';
import userRouter from './routers/user.routes';


const app = express();
app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/pia_projekat");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija na bazu!');
});

const router = express.Router();



router.route('/changePassword').post((req, res)=>{
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    // check if user entered good password
    user.findOne({"username":username, "password": oldPassword}, (err, userX)=>{
        if(err) console.log(err);
        else {
            // change password
            user.collection.updateOne({"username":username}, {$set: {"password": newPassword}});
            res.json(userX);
        }
    })
});

router.use('/users', userRouter);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));