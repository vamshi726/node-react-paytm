// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);


app.listen(()=>{
    console.log("Server listening on port : "+ port);
}) 
