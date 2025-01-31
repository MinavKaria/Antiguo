import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/api.js';
import router2 from './routes/upload.js';
import router3 from './routes/email.js';

const app = express();
dotenv.config();
const port=process.env.PORT || 3000;


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  
    optionsSuccessStatus: 204,
  };
  
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));  
app.use(cors(corsOptions)); 
app.use('/api', router);
app.use('/media', router2);
app.use('/mail', router3);

const mongo_url=process.env.MONGO_URL;

try
{
    mongoose.connect(mongo_url)
    console.log("MongoDB Connected")
}
catch(err)
{
    console.log(err)
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});