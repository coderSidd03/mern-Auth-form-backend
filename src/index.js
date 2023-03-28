import * as dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import routes from './routes/route.js';

const app = express();

dotenv.config();

app.use(cors(
  {
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true
  }
));
app.use(express.json());
app.use(cookieParser());

mongoose.set('strictQuery', true);
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true }
).then(() => {
  app.listen(process.env.PORT, () => { console.log(`>> app running on ${process.env.PORT}..\ndatabase connected..`); })
}).catch((e) => { console.log(e) });  

app.use('/api', routes);