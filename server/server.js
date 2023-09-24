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


app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})

