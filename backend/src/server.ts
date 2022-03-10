import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import user from './model/user';
import userRouter from './routers/user.routes';
import multer from 'multer';


const app = express();
app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/pia_projekat");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija na bazu!');
});

const router = express.Router();

router.use('/users', userRouter);

// ------------------------------------------- images upload --------------------------------------------
app.use('/images', express.static("./images"))
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.post('/images', upload.array('files'), (req, res, next) => {
    const images = req.files
    if (!images) {
        const error = new Error("Nema slika!")
        return next(error)
    }
    res.send({ sttus: "Sve je u redu!" });
})
// ------------------------------------------- end of images upload --------------------------------------


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));