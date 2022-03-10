"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/pia_projekat");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Uspesna konekcija na bazu!');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
// ------------------------------------------- images upload --------------------------------------------
app.use('/images', express_1.default.static("./images"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images');
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.post('/images', upload.array('files'), (req, res, next) => {
    const images = req.files;
    if (!images) {
        const error = new Error("Nema slika!");
        return next(error);
    }
    res.send({ sttus: "Sve je u redu!" });
});
// ------------------------------------------- end of images upload --------------------------------------
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map