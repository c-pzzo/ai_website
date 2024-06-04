import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";


/* ------------------------------------------------------------------ */ 
/* CONFIGURATIONS */

/* Grab the file URL, specifically when we use the modules */
const __filename = fileURLToPath(import.meta.url);
/* Grab directory name (works only with type "modules" defined in package.json) */
const __dirname = path.dirname(__filename);
/* To use dotenv files */
dotenv.config();
/* Invoke Express application to then use our Middleware*/
const app = express();

/* Use and invoke the following Middleware Functions: */
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

/* Set the directory of where we keep our assets: */
/* This is to store locally, but in real-life, we want an actual storage file directory, probably Cloud */
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* ------------------------------------------------------------------ */ 
/* FILE STORAGE */
/* This is how to save the files to be uploaded to the website. They will be saved locally in "public/assets" */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){ 
        cb(null, file.originalname)
    }
});

/* Everytime we need to upload a file, we will be using this variable: */
const upload = multer({storage})

/* ROUTES WITH FILES */
/* AUTHENTICATION MIDDLEWARE FUNCTION occuring before the picture upload to public/assets */
app.post("/auth/register", upload.single("picture"), register);

/* ------------------------------------------------------------------ */ 
/* MONGOOSE SETUP */
/* If PORT 3001 doesn't work, it will default to the backup port 6001 */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));

/* Authentication and Authorization */
