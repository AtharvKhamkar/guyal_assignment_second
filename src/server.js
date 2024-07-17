import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import userRoutes from "./Routes/user.routes.js";

dotenv.config({
    path: './env'
})

const app = express();
console.log(process.env.PORT);
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

const swaggerJsDocs = YAML.load("src/api.yaml")

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDocs)
)



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})