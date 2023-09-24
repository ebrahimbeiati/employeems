import express from 'express';
import mysql from 'mysql'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
})
//connect to the server and create a connection with mySQL
db.connect((err) => {
    if (err) {
        console.log("Database connected");
    }else{
            console.log("Database is not connected");

    }

})

app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username,password);
    db.query("SELECT * FROM users WHERE username = ?",username,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length>0){
                bcrypt.compare(password,result[0].password,(err,isMatch)=>{
                    if(err){
                        console.log(err);
                    }else{
                        if(isMatch){
                            const token = jwt.sign({id:result[0].id},'secret',{expiresIn:86400});
                            res.json({success:true,token:token});
                        }else{
                            res.json({success:false,message:"Password is incorrect"});
                        }
                    }
                })
            }else{
                res.json({success:false,message:"User not found"});
            }
        }
    })
})




app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

