import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import router from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import roadmapRoutes from "./routes/roadmap.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173']
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/auth", router);
app.use("/api/user", userRouter);
app.use("/api/roadmap", roadmapRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

