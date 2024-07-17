import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRoutes from "./Routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 2727;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({
    limit:"32kb"
}))
app.use(express.urlencoded({
    extended:true,limit:"32kb"
}))
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use('/api', userRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})