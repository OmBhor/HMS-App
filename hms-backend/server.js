const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRouter = require ("./router/userRouter");
const docRouter = require ("./router/docRouter");
const specRouter = require ("./router/specRouter");
const appointmentRouter = require("./router/appointmentRouter");
const authRouter = require("./router/authRouter")
const cors = require("cors");

app.use(cors());

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MongoDB_URL)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

app.use("/api/users", userRouter);
app.use("/api/doctor", docRouter);
app.use("/api/specialization", specRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/login", authRouter);


app.get("/", (req, res) => {
    res.json({
        message: "Server is running."
    })
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));