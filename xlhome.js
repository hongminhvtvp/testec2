const express = require("express");
const app = express();
const AWS = require("aws-sdk");

const config = require("./config");
AWS.config.update(config.aws_remote_config);
const rout=express.Router();


app.set("view engine", "ejs");
app.set("views", "./public");

rout.get("/", (req, res) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.aws_table_name
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: "Error: Server error"
            });
            console.log(err.message);
        } else {
            console.log(data);
            //const { Items } = data;
            res.render("index", {
                baibao: data.Items
                
            });
           
            // res.send({
            //     success: true,
            //     message: 'Loaded Bai Bao',
            //     data: Items
            // });
        }
    });
});
rout.get("/form",function(req,res){
    res.render("vda");
});

//"/them/isbn/:isbn/ten/:ten/tennhom/:tennhom/sotrang/:sotrang/namxuatban/:namxuatban"
rout.get("/them", function (req, res) {
    // const { ISBN, TenBaiBao, TenNhomTacGia, SoTrang, NamXuatBan } = req.body;
    const ISBN=req.query.isbn;
    console.log(ISBN);
    const TenBaiBao=req.query.ten;
    const TenNhomTacGia=req.query.tennhom;
    const SoTrang=req.query.sotrang;
    const NamXuatBan=req.query.namxuatban;
 
     const docClient = new AWS.DynamoDB.DocumentClient();
     const params = {
         TableName: config.aws_table_name,
         Item: {
             ISBN: ISBN,
             TenBaiBao: TenBaiBao,
             TenNhomTacGia: TenNhomTacGia,
             SoTrang: SoTrang,
             NamXuatBan: NamXuatBan
         }
     };
     docClient.put(params, (err, data) => {
        if (err) {
            res.send({
                success: "fail",
                messages: "Thêm mới bài báo không thành công",
                detail: err.message
            });
        } else {
            res.send({
                success: "true",
                message: "thêm mới thành công",
                data: req.body
            });
        }
    });
});

// rout.get("/test",function(req,res){

//     res.render("vda",{
//         success: "true",
//         message: "thêm mới thành công"
//     });
// });

rout.get("/xoa/:id", function (req, res) {

const  ISBN  = req.params.id;

console.log(ISBN);
const docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: config.aws_table_name,
    Key: {
        ISBN: ISBN
    }

};

docClient.delete(params, function (err, data) {
    if (err) {
        res.send({
            success: "fail",
            message: "Xoá không thành công",
            detail: err.message
        });
    } else {
    
        
        res.redirect("../");

    }
});
});

module.exports=rout;

