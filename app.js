const express = require("express");
const app = express();
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
const config = require("./config");
AWS.config.update(config.aws_remote_config);
app.use(express.static('./file'));
app.set("view engine", "ejs");
app.set("views", "./public");
app.use(express.json());

const routxl=require("./xlhome");
app.use("/home",routxl);



app.listen(3000, () => {
    console.log("Server is running port 3000");
});
