import express from 'express';
import mysql from 'mysql'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const app = express();