import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser"
import jsonwebtoken from "jsonwebtoken";
// import cookieParser from"cookie-parser";
import fs from "fs"

import cors from "cors";
import 'dotenv/config'

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";


import swaggerUi from "swagger-ui-express"
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json'));

// import supertest from 'supertest'



// import * as swaggerDocument from './swagger.json'




const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use((req, res, next) => {
    if (req.cookies.access_token) {
        // const stoken = req.headers.authorization.split(' ')[1]
        jsonwebtoken.verify(req.cookies.access_token, 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            // console.log(req.cookies.access_token)
            // res.setHeader('Authorization', req.headers.authorization.split(' ')[1])
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});



app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;